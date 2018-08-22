const express = require('express');
const router = express.Router();
const data = require('../assets/quotes.json');

router.get('/', (req,res,next) => {
    res.status(200).send(data)
})

module.exports = router;
