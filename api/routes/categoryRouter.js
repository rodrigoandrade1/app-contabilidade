const router = require('express').Router()
const verifyToken = require('../helpers/verifyToken')
const getUserByToken = require('../helpers/getUserByToken')
const Category = require('../models/Category')

router.get('/', verifyToken, async (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    const user = await getUserByToken(token)

    res.status(200).json({msg: user})
})

router.post('/create', verifyToken, async (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    const user = await getUserByToken(token)

    const userId = user.id
    const title = req.body.name

    const category = new Category({
        userId: userId,
        title: title
    })

    if (title == null) {
        return res.status(400).json({ error: "Informe um título!" })
    }

    try {
        const newCategory = await category.save()
        res.status(200).json({ error: null, msg: "Categoria cadastrada!", data: newCategory})
    } catch (err) {
        return res.status(400).json({ error: err })
    }
})

module.exports = router