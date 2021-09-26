'use strict';

require('dotenv').config;
const {db}=require('./src/auth/models/index')
const {start}=require('./src/server');
const port=process.env.PORT
db.sync().then(()=>{
    start( port || 8000 );
});