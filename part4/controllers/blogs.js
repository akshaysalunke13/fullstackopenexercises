const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    blog.likes = request.body.likes || 0

    if (request.body.title === undefined || request.body.url === undefined) {
        response.status(400).send('Bad Request')
    }

    await blog.save()
    response.status(201).json(blog)
})

blogRouter.delete('/:id', async (request, response) => {
    const result = await Blog.findByIdAndRemove(request.params.id)
    if (result) {
        response.sendStatus(204)
    } else {
        response.sendStatus(404)
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