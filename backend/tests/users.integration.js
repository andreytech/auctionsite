const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../app');

beforeAll(async () => {
    return await request(app)
        .post('/users/register')
        .send({
            email: 'test@test.com',
            password: '12345678',
            name: 'test name',
        })
});

afterAll(done => {
    mongoose.connection.close()
    done()
})

describe('Post Endpoints', () => {

    it('should receive error user already exist', async () => {
        const res = await request(app)
            .post('/users/register')
            .send({
                email: 'test@test.com',
                password: 'dsfsdfsdfsd',
                name: 'test name',
            })
        expect(res.statusCode).toEqual(422)
        expect(res.body).toHaveProperty(['errors', 0, 'msg'], 'User with provided email already exists')
    })

    it('should receive error password too short', async () => {
        const res = await request(app)
            .post('/users/register')
            .send({
                email: 'test@test.com',
                password: '12',
                name: 'test name',
            })
        expect(res.statusCode).toEqual(422)
        expect(res.body).toHaveProperty(['errors', 0, 'msg'], 'Password must be at least 8 symbols long')
    })

    it('should receive error user with email does not exist', async () => {
        const res = await request(app)
            .post('/users/login')
            .send({
                email: 'test34@test.com',
                password: '12345678',
            })
        expect(res.statusCode).toEqual(422)
        expect(res.body).toHaveProperty(['errors', 0, 'msg'], 'User with provided email does not exists')
    })

    it('should receive error password wrong', async () => {
        const res = await request(app)
            .post('/users/login')
            .send({
                email: 'test@test.com',
                password: '1234999999',
            })
        expect(res.statusCode).toEqual(422)
        expect(res.body).toHaveProperty(['errors', 0, 'msg'], 'Password incorrect!')
    })

    it('should login successfully', async () => {
        const res = await request(app)
            .post('/users/login')
            .send({
                email: 'test@test.com',
                password: '12345678',
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('token')
    })
})