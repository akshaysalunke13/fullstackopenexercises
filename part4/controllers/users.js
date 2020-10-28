const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/users')

usersRouter.post('/', async (request, response, next) => {
    const body = request.body

    //If username or password is missing
    if (!body.username || !body.password) {
        return response.status(400).json({ error: 'username or password missing' })
    }

    //Both username and password must be at least 3 characters long.
    if (body.username.length < 3 || body.password.length < 3) {
        return response.status(400).json({ error: 'Both username and password must be at least 3 characters long.' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })

    const savedUser = await user.save()
    response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

module.exports = usersRouter