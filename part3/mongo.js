const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide password as an argument. Eg. node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const dbName = 'phonebook'
const url = `mongodb+srv://fullstack:${password}@fullstackopencluster.uwucw.mongodb.net/${dbName}?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})
const Person = mongoose.model('Person', personSchema)

const addToPhonebook = (name, number) => {
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

  const newPerson = new Person({
    name: name,
    number: number
  })

  newPerson.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook.`)
    mongoose.connection.close()
  })
}

const displayPhonebook = () => {
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

  Person.find({}).then(result => {
    result.forEach(r => console.log(r))
    mongoose.connection.close()
  })
}

if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]
  addToPhonebook(name, number)
} else if (process.argv.length === 3) {
  displayPhonebook()
}