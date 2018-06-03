const express = require('express');
const path = require('path');

const app = express();
const defaultRoute = require('./routes/default');

app.use(express.static(path.join(__dirname, 'static')));
app.use('/', defaultRoute);

module.exports = app;