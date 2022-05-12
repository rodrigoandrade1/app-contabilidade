const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    if (!token) {
        return res.status(401).json({ error: 'Acesso negado!' })
    }

    try {
        jwt.verify(token, process.env.SECRET)
        next()
    } catch(err){
        res.status(400).json({ error: "Token inválido!" })
    }
}

module.exports = verifyToken