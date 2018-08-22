const express = require('express');
const router = express.Router();
const data = require('./quotes.json');

router.get('/', (req,res,next) => {
    res.status(200).json(data)
})

module.exports = router;
