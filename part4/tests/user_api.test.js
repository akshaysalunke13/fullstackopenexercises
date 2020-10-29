const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('4.16 invalid users are not created', () => {
    
    test('should not create user if username/password not provided', async () => {
        // username missing
        let tempUser = { name: 'temp Akki', password: 'tempPass' }
        let response = await api
                            .post('/api/users')
                            .send(tempUser)
                            .expect(400)
        expect(response.body.error).toMatch('username or password missing')

        //password missing
        tempUser = {name: 'temp Akki', username: 'temp-akki'}
        response = await api
                            .post('/api/users')
                            .send(tempUser)
                            .expect(400)
        expect(response.body.error).toMatch('username or password missing')
    })

    test('user not created if username/password is less than 3 characters', async () => {
        //username less than 3 chars long
        let tempUser = { name: "Akshay", username: "ak", password: "1234"}
        let response = await api
                            .post('/api/users')
                            .send(tempUser)
                            .expect(400)
        expect(response.body.error).toMatch('Both username and password must be at least 3 characters long.')

        //password less than 3 chars long
        tempUser = { name: "Akshay", username: "akki-test", password: "12"}
        response = await api
                            .post('/api/users')
                            .send(tempUser)
                            .expect(400);
        expect(response.body.error).toMatch('Both username and password must be at least 3 characters long.')
    })

    test('user not created if username is not unique', async () => {
        //username is NOT unique
        let tempUser = { name: "Akshay", username: "akki", password: "1234"}
        let response = await api
                            .post('/api/users')
                            .send(tempUser)
                            .expect(400)
        expect(response.body.error).toMatch('unique')
    })
})

afterAll( async () => {
    await mongoose.connection.close()
})