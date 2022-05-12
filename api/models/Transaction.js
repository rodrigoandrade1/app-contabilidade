const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    userId: mongoose.ObjectId,
    category: mongoose.ObjectId,
    value: Number,
    description: String,
    type: String
})

const Transaction = mongoose.model('transaction', transactionSchema)

module.exports = Transaction