import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import {User, Message} from './model'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/books"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

if (process.env.RESET_DATABASE) {
  console.log('Resetting database!')

  const seedDatabase = async () => {
    await User.deleteMany()
    await Message.deleteMany()

    const example = new User({ name: 'example user' })
    await example.save()

    const sara = new User({ name: 'sara' })
    await sara.save()

    await new Message({ message: "Hello World", user: sara }).save()

    await new Message({ message: "World says Hello", user: example }).save()
    
  }
  seedDatabase()
}

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})
app.get('/users', async (req, res) => {
  const users = await User.find()
  res.json(users)
})
app.get('/messages', async (req, res) => {
  const messages = await Message.find().populate('user')
  res.json(messages)
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
