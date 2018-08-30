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

router.post('/', (req,res,next) => {


    const quote = {
      content: req.body.content,
      author: req.body.author,
      genre_type: req.body.genre,
      id: (Math.random()) * 50
    };

    console.log(quote)


    Quote.create(quote, (err, data) => {
      if (err) {
        res.status(500).send({'Error': err});
      }

      res.status(200).send(data);
    });
});


module.exports = router;
