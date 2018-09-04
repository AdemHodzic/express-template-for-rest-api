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

router.get('/:genre', (req,res,next) => {
  Quote
  .find({'genre_type': req.params.genre})
  .exec()
  .then((data) => {
    if (data.length === 0) {
      res.status(404).send({message: 'No genres found'})
      return
    }
    res.status(200).send({quotes:data})
  })
  .catch(err => {
    res.status(500).send({error: err})
  })
  
});

router.post('/', (req,res,next) => {


    const quote = {
      content: req.body.content,
      author: req.body.author,
      genre_type: req.body.genre,
      id: (Math.random()) * 50
    };


    if (securityTest(quote)) {
      res.status(400).send({message: 'Bad input'});
      return
    }


    Quote.create(quote, (err, data) => {
      if (err) {
        res.status(500).send({'Error': err});
      }

      res.status(200).send(data);
    });
});

function securityTest(obj) {
  const regex = /<script>|<\/script>/g;
  for (const key of Object.keys(obj)) {
    const value = obj[key]
    if (regex.test(value)) {
      return true
    }
  }
  return false
}


module.exports = router;
