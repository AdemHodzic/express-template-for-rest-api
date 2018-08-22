const express =  require('express');
const router = express.Router();

router.get('/', (req,res,next) => {
    res.status(200).json({
        message: 'You hit the data route...'
    })
})

module.exports = router;
