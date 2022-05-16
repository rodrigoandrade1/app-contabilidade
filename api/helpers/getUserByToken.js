const jwt = require('jsonwebtoken')

const User = require('../models/User')

const getUserByToken = async (token) => {
    if (!token){
        return res.status(401).json({ error: "Acesso negado!" })
    }

    const decoded = jwt.verify(token, process.env.SECRET)
    const userId = decoded.id
    const user = await User.findOne({ _id: userId}, {password: 0})

    return user
}

module.exports = getUserByToken