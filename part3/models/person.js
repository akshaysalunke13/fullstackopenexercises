const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

const uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

console.log('connecting to MongoDB on url:', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log('Connected to MongoDB'))
  .catch(e => console.log('Error conncting to MongoDB:', e.message))

const personSchema = new mongoose.Schema({
  name: { type: String, unique: true, minlength: 3, required: true },
  number: {
    type: Number,
    validate: {
      validator: (n) => n.toString().length > 7,
      message: 'Number should be atleast 8 digits.'
    },
    required: true
  }
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})

module.exports = mongoose.model('Person', personSchema)