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

})

afterAll( async () => {
    await mongoose.connection.close()
})