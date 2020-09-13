require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(express.json())
app.use(express.static('build'))
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())

app.get('/', (req, res) => {
  res.send('<h1>Hello World.</h1>')
})

app.get('/info', (req, res) => {
  Person.count()
    .then(result => {
      const html = `<p>Phonebook has info for ${result} people.<p>\n${Date()}`
      res.send(html)
    })
})

//GET all persons
app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(result => res.send(result))
    .catch(e => next(e))
})

//GET person with :id
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(err => next(err))
})

//DELETE Person with :id
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch(err => next(err))
})

//ADD new person
app.post('/api/persons', (req, res, next) => {
  const newPerson = Person({
    name: req.body.name,
    number: req.body.number
  })

  newPerson.save()
    .then(savedPerson => res.json(savedPerson))
    .catch(e => next(e))

})

//UPDATE a person
app.put('/api/persons/:id', (req, res, next) => {
  const person = {
    name: req.body.name,
    number: req.body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => res.json(updatedPerson))
    .catch(e => next(e))
})

const errorHandler = (error, request, response, next) => {
  console.log(error.name)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformed ID.' })
  } else if(error.name === 'MongoError') {
    return response.status(409).send({ error: error.message })
  } else if(error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port:${PORT}`))