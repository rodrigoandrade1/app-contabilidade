const router = require('express').Router()
const verifyToken = require('../helpers/verifyToken')
const getUserByToken = require('../helpers/getUserByToken')

router.get('/', verifyToken, async (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    const user = await getUserByToken(token)

    res.status(200).json({ error: null, msg: user})
})


module.exports = router