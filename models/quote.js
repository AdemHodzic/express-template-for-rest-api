const mongoose = require('mongoose');

const QuoteSchema = mongoose.Schema({
    content: String,
    author: String,
    id: Number,
    genre_type: String
})

module.exports = mongoose.model('Quote', QuoteSchema);

