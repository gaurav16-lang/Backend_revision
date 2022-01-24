const express = require('express')
const User = require('./Users.json')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  return res.send({ User })
})

app.post('/', (req, res) => {
  const newUser = [...User, req.body]

  res.send(newUser)
})

app.patch('/:email', (req, res) => {
  const newUSer = User.map((user) => {
    if (req.params.email === user.email) {
      // optional chainning

      if (req?.body?.first_name) user.first_name = req.body.first_name
      if (req?.body?.last_name) user.last_name = req.body.last_name
      if (req?.body?.email) user.email = req.body.email
      if (req?.body?.gender) user.gender = req.body.gender
      //   return req.body
    }
    return user
  })

  res.send(newUSer)
})

app.delete('/:email', (req, res) => {
  const newUser = User.filter((user) => user.email !== req.params.email)
  res.send(newUser)
})

app.get('/', (req, res) => {
  const newUser = User.filter((user) => user.email === req.params.email)

  res.send(newUser)
})
app.listen(2345, (req, res) => {
  console.log('server is running on the port of 2345')
})
