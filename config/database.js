const mongoose = require('mongoose');
require('dotenv').config();

const devEnv = process.env.Dev_DB_Env;
const prodEnv = process.env.Prod_DB_Env;

if(process.env.Node_Env === 'development') {
    mongoose.connect(devEnv, {useCreateIndex: true, useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true})
    mongoose.connection.on('connection', () => {
        console.log('Dev_DB_Conn is on...');
    })
} else {
    mongoose.connect(prodEnv, {useCreateIndex: true, useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true})
    mongoose.connection.on('connection', () => {
        console.log('Prod_DB_Conn is on...');
    })
}