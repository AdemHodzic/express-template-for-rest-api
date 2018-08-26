const express = require('express');
const router = express.Router();
const Quote = require('../models/quote');
router.get('/', (req,res,next) => {
    Quote.find()
      .then(data => {
        res.send({quotes:data})          
      }).catch((err) => {
          res.status(500).send({message:err.message || "We had some problems with our serers!"})
      });
})

module.exports = router;
