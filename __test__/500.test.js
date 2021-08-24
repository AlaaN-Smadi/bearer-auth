'use strict';

const supertest = require('supertest');
const {app} = require('../src/server')
const request = supertest(app)





describe('Testing Error 500 Handeler ',  () => {
    test('It should check Internal server errors :', async () => {

        let response = await request.get('/badLink')
        expect(response.status).toBe(500);

    });
});

describe('Testing Error 404 Handeler ',  () => {
    test('It should check client error :', async () => {

        let response = await request.get('/unkownLink')
        expect(response.status).toBe(404);

    });
});