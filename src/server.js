'use strict';

const express = require('express');
const app = express();

app.use(express.json());

const router = require('./auth/router')
app.use(router)


const error500 = require('./middleWare/500')
const error404 = require('./middleWare/404')
app.use(error500)
app.use(error404)







function start(port) {
    app.listen(port, () => console.log(`Server started on port ${port}`));
}

module.exports = {
    start,
    app
}