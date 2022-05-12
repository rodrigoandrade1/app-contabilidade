const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    userId: mongoose.ObjectId,
    categories: Array
})

const Category = mongoose.model('category', categorySchema)

module.exports = Category