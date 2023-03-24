import express from 'express'
import {errorHandling} from './module/errorHandling.js'
import morgan from 'morgan'
import cors from 'cors'


const persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]



const app = express()

const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use(morgan('tiny'))

app.get('/api/persons', (req, res, next) => {
  try {

    res.json(persons)

  } catch (error) {
        next(error)
  } 
})

app.use(express.static('dist'))

// app.get('/', (req, res, next) => {

//   res.send('Hello This is the phone book API!')


//   })


app.post('/api/persons', (req, res, next) => {

  if (req.body.name === "" && req.body.number === "") {

    throw new Error("Name or number is missing")
  }

  const { name, number } = req.body
  

    try {

        if (persons.map(person => person.name).includes(name)) {

            console.log(persons.includes(name))

            throw new Error("Name must be unique")
        }

        const newPerson = {
            id: Math.floor(Math.random() * 1000),
            name,
            number
        }

        persons.push(newPerson)

        res.status(201).json(newPerson)
  
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

