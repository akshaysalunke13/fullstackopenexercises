const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('../utils/list_helper')
const token = process.env.JWT_TOKEN

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(b => b.save())
    await Promise.all(promiseArray)
})

test('4.8 should return blogs as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('4.9 each blog has unique identifier is named id and does not contain _id & __v', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body

    for (blog in blogs) {
        const currBlog = blogs[blog]
        expect(currBlog).toHaveProperty('id')
        expect(currBlog).not.toHaveProperty('_id')
        expect(currBlog).not.toHaveProperty('__v')
    }

})

test('4.10 a valid blog can be added to the system', async () => {
    let response = await api.get('/api/blogs')
    const originalBlogs = response.body
    const newBlog = { title: 'Test blogpost', author: "Akki", likes: 1, url: 'test-url' }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    response = await api.get('/api/blogs')
    const newBlogs = response.body

    expect(newBlogs).toHaveLength(originalBlogs.length + 1)
    expect(newBlogs).toEqual(
        expect.arrayContaining([
            expect.objectContaining({ title: 'Test blogpost' })
        ])
    )
})

test('4.11 if likes property is missing, defaults to 0', async () => {
    const newBlog = { title: "likes is missing for this blog", author: "Akki", url: "testurl" }
    let response = await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${token}`)
        .expect(201)

    expect(response.body).toHaveProperty('likes')
})

test('4.12 if title or url is missing, 400 bad request', async () => {
    let newBlog = { author: "akki", likes: 13, title: "test post without url" }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${token}`)
        .expect(400)

    newBlog = { author: 'test-akki', url: 'test-url' }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${token}`)
        .expect(400)
})

afterAll(async () => {
    await mongoose.connection.close()
})