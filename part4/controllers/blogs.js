const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/users')
const jwt = require('jsonwebtoken')
const logger = require('../utils/logger')
const blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const body = request.body

    if (body.title === undefined || body.url === undefined) {
        return response.status(400).send('Bad Request')
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: request.body.likes || 0,
        user: user._id
    })
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(blog)
})

blogRouter.delete('/:id', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    const blogToDelete = await Blog.findById(request.params.id)

    if (blogToDelete.user.toString() === user.id.toString()){
        response.status(204).end()
    } else {
        response.status(404).end()
    }
})

blogRouter.put('/:id', async (request, response) => {
    const filter = { _id: request.params.id }
    const update = { likes: request.body.likes }
    const result = await Blog.findOneAndUpdate(filter, update, { new: true })
    if (result) {
        response.json(result.toJSON())
    } else {
        response.sendStatus(404)
    }

})

module.exports = blogRouter