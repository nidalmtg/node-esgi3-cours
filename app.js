const express = require('express');
const path = require('path');
const { connect } = require('./model/connection');
require('dotenv').config();

connect();

const userRoute = require('./route/user.route')
const authRoute = require('./route/auth.route')
const productRoute = require('./route/product.route')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Content');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS, PUT');
    next();
});

// use router
app.use('/user', userRoute);
app.use('/auth', authRoute);
app.use('/product', productRoute);
app.use('/images', express.static(path.join(__dirname, "images")))

/*
app.use((req, res, next) => {
    console.log('Middleware Working!');
    res.status(200).json({
        message: 'Réponse du serveur'
    });
});
*/

module.exports = app;