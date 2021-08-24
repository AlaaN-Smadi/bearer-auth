// 1 - create actual testing database and then drop datatabase after all tests are done
// 2 - to create in memory database - sqlite3 database file in memory

'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Sequelize, DataTypes } = require('sequelize');
const UsersSchema = require('../src/middleWare/model-finder');

const sequelize = new Sequelize('postgres://postgres@localhost:5432/test');

const Users = UsersSchema(sequelize, DataTypes);

beforeAll(async () => {
    await sequelize.sync();
});

afterAll(async () => {
    await sequelize.drop();
});

describe('Bearer Auth', () => {
    let userInfo = {
        username: 'Test User',
        password: '123'
    }

    it('should create a user with a hashed password', async () => {
        // arrange

        // act
        let user = await Users.create(userInfo);
        
        let isValid = await bcrypt.compare(userInfo.password, user.password);

        // assert
        expect(user.id).toBeTruthy();
        //check user name and password
        expect(isValid).toBeTruthy();
    });

    it('should attach a teken on find', async () => {
        //arrange 

        //act
        let user = await Users.findOne({ username: userInfo.username});
        let decodedJwt = jwt.decode(user.token);

        // assert
        expect(user.username).toEqual(userInfo.username);
        expect(user.token).toBeTruthy();
        expect(decodedJwt.username).toEqual(userInfo.username);
    });
});