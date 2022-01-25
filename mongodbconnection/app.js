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

app.listen(2345, async () => {
  await connect()
  console.log('listening to the port number 2345')
})
