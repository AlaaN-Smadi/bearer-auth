'use strict';

const server = require('./src/server')
require('dotenv').config();



server.start(process.env.PORT)


const { db } = require('./src/middleWare/oauth');
//the port should be from the .evn file
db.sync()
    .then(() => {
        server.start(3000);
    })
    .catch(console.error);