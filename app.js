//importing dependencies
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Defining our express app
const app = express();

//Setting up connectionn with mLab
const url = `mongodb://${process.env.dbuser}:${process.env.dbpass}@ds161740.mlab.com:61740/jenny`

mongoose.Promise = global.Promise;

mongoose.connect(url, { useNewUrlParser: true })
    .then(() => console.log('Succesufully connected to database!'))
    .catch(err => console.log(err));


//Configuring app
app.use(express.static(path.join(__dirname, 'static')));
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Handling CORS
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method == 'PUT') {
        res.header('Access-Control-Allow-Methods', '*'); //<-- Instead of '*' you can put only the methods you want to learn
        return res.status(200).json({});
    }
    next();
})

//Defining routes
const defaultRoute = require('./routes/default');
const dataRoute = require('./routes/data');

//Setting up routes
app.use('/data', defaultRoute);
app.use('/datas', dataRoute);


//Handling errors
app.use((req,res,next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((err,req,res,next) => {
    res.status(err.status || 500).json({
        error: err.message
    });
})

// Exporting app so it'a available in other files
module.exports = app;
