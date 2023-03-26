import express from 'express'
import {errorHandling} from './module/errorHandling.js'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';
import { Person } from './models/person.model.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'



dotenv.config()

try {
    mongoose.connect(process.env.MONGO_URI)
    console.log('successfully connected to MongoDB')
} catch (error) {
    console.err(error)
}


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


const app = express()

const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use(morgan('tiny'))


// get persons
app.get('/api/persons', async (req, res, next) => {
  try {
    const persons = await Person.find({})
    console.log('reached')
    res.json(persons)

  } catch (error) {
        next(error)
  } 
})

app.use(express.static(path.join(__dirname, './frontend/dist')))

app.get("*", (req, res) => {
  res.sendFile(
      path.join(__dirname, "./frontend/dist/index.html"),
      function (err) {
          res.status(500).send(err)
      }
  )
})

// post a new person in the phonebook
app.post('/api/persons', (req, res, next) => {

  if (req.body.name === "" && req.body.number === "") {

    throw new Error("Name or number is missing")
  }

  const { name, number } = req.body
  

    try {
        

        const newPerson = new Person({
          name,
          number
        })

        newPerson.save().then((result) => {
          res.status(201).json(result)
        })
  
    } catch (error) {
          next(error)
    } 
  })


app.get('/api/persons/:id', (req, res, next) => {
    try {
  
        const id = +req.params.id
        const person = persons.find(person => person.id === id)

        res.status(200).res.json(person)
  
    } catch (error) {
          res.status(400).send("<h1>404 Not Found</h1>")
    } 
  })

app.delete('/api/persons/:id', (req, res, next) => {
    try {
        console.log("reached")
        const id = +req.params.id
        const deletedPerson = persons.filter(person => person.id !== id)

        res.status(200).json(deletedPerson)
  
    } catch (error) {
          res.status(400).send("<h1>404 Not Found</h1>")
    } 
  })

app.get('/api/info', (req, res, next) => {
    try {
  
      res.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
      `)
  
    } catch (error) {
          next(error)
    } 
  })

  // middleware for general error handling
 app.use(errorHandling)


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

