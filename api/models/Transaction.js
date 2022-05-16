const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    userId: mongoose.ObjectId,
    value: Number,
    description: String,
    category: String,
    type: String,
    date: { type: Date, default: Date.now }
})

const Transaction = mongoose.model('transaction', transactionSchema)

module.exports = Transaction