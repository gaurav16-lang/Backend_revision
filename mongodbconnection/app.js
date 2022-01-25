const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())

const connect = () => {
  return mongoose.connect('mongodb://127.0.0.1:27017/connect')
}

// 1-connect with the mongoose with mogodb
// 2- create schema
// 3-create model

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    last_name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

const User = mongoose.model('user', userSchema)

// Create the postSchema
const tagSchema = new mongoose.Schema({
  name: { type: String, required: true },
})

const Tag = mongoose.model('tag', tagSchema)

const postSchema = new mongoose.Schema(
  {
    tiltle: { type: String, required: true },
    body: { type: String, required: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    tags_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tag',
        required: true,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

const Post = mongoose.model('post', postSchema)
// tags schema

const commentSchema = new mongoose.Schema(
  {
    body: { type: String, required: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'post',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

const Comment = mongoose.model('comment', commentSchema)

app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body)

    res.status(201).send(user)
  } catch (e) {
    res.status(500).send({ status: e.message })
  }
})
app.get('/users', async (req, res) => {
  const users = await User.find().lean().exec()
  res.send(users)
})

app.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id).lean().exec()
  res.send({ user })
})

app.patch('/user/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })

    return res.status(201).send(user)
  } catch (e) {
    return res.status(500).json({ message: e.message, status: 'Failed' })
  }
})

app.delete('/users/:id', async (req, res) => {
  try {
    const user = User.findByIdAndDelete(req.params.id).lean().exec()
    return res.status(201).send(user)
  } catch (e) {
    return res.status(500).json({ message: e.message, status: 'Failed' })
  }
})

// ...........................tags Crud ...............................................

app.post('/tags', async (req, res) => {
  try {
    const tags = await Tag.create(req.body)
    return res.status(200).send(tags)
  } catch (e) {
    res.status(500).json({ message: e.message, status: 'Failed' })
  }
})

app.get('/tags', async (req, res) => {
  try {
    const tags = await Tag.find().lean().exec()
    return res.send(tags)
  } catch (e) {
    return res.status(500).json({ message: e.message, status: 'Failed' })
  }
})

app.get('/tags/:id', async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id)
    return res.status(201).send(tag)
  } catch (e) {
    return res.status(500).json({ message: e, message, status: 'Failed' })
  }
})
app.patch('/tags/:id', async (req, res) => {
  try {
    const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    return res.status(201).send(tag)
  } catch (e) {
    return res.status(500).json({ message: e.message, status: 'Failed' })
  }
})

app.delete('/tags/:id', async (req, res) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id).lean().exec()
    return res.status(200).send(tag)
  } catch (e) {
    return res.status(500).json({ message: e.message, status: 'Failed' })
  }
})
app.listen(2345, async () => {
  await connect()
  console.log('listening to the port number 2345')
})
