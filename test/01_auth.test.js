import supertest from 'supertest';
import app from '../app.js';
import { models } from '../src/models/index.js';
import {testAuthRegister, testAuthLogin} from './helpers/dataHelper.js'

/**
 * Execute from tests
 */
beforeAll( async () => {
    await models.usersModel.deleteMany();
})

describe("[AUTH] This is the Authentication test for route /api/auth", () => {

    // Test For Login
    test("This may return an 404", async () => {

        const response = await supertest(app)
        .post('/api/auth/login')
        .send(testAuthLogin)

        expect(response.statusCode).toEqual(404)
    });
    
    // Test For Register
    test("This may return an 201", async () => {
        
        const response = await supertest(app)
        .post('/api/auth/register')
        .send(testAuthRegister)
        
        expect(response.statusCode).toEqual(201);
        expect(response.body).toHaveProperty("data");
        expect(response.body).toHaveProperty("data.token");
        expect(response.body).toHaveProperty("data.user");
    });

    // Test For Login
    test("This may return an 403 - Invalid Password", async () => {
        const newTestAuthLogin = {...testAuthLogin, password: "InvalidPassword"}
        const response = await supertest(app)
        .post('/api/auth/login')
        .send(newTestAuthLogin)
        let statusCode = response.statusCode;
        expect(statusCode).toEqual(403)
    });
    
    // Test For Login
    test("This may return an 200 - Successfull Login", async () => {
        const response = await supertest(app)
        .post('/api/auth/login')
        .send(testAuthLogin)
        let statusCode = response.statusCode;
        expect(statusCode).toEqual(200)
    });

});
