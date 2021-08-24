'use strict';

const basicAuth = require('./middleWare/bassic');
const bearerAuth = require('./middleWare/bearer');

const express = require('express');
const router = express.Router();

const Users = require('../middleWare/oauth').users

// app level middleware


// {"username":"test", "password":"test"}
router.post('/signup', (req, res) => {
    // check if user name exists
    // console.log(req.body);
    Users.create(req.body)
        .then(user => res.status(201).send(user))
        .catch(err => res.status(400).send(err))
});

router.post('/signin', basicAuth(Users), (req, res) => {
    // the user will have the user info and the token
    res.status(200).send(req.user);
});

router.get('/user', bearerAuth(Users), (req, res) => {
    res.status(200).send(req.user);
});


let test = (req,res,next)=>{
    next('Internal Error!!')
}

router.get('/badLink', test)


module.exports = router