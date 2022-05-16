const router = require('express').Router()
const Transaction = require('../models/Transaction')
const verifyToken = require('../helpers/verifyToken')
const getUserByToken = require('../helpers/getUserByToken')

router.get('/', verifyToken, async (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    const user = await getUserByToken(token)

    const transactions = await Transaction.find({ userId: user.id })

    if(!transactions) {
        return res.status(404).json({ error: "Nenhuma transação encontrada!" })
    }

    return res.json({ error: null, transactions})
})

router.get('/receitas', verifyToken, async (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    const user = await getUserByToken(token)

    const transactions = await Transaction.find({ userId: user.id, type: 'Receita' })

    if(!transactions) {
        return res.status(404).json({ error: "Nenhuma transação encontrada!" })
    }

    return res.json({ error: null, transactions})
})

router.get('/despesas', verifyToken, async (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    const user = await getUserByToken(token)

    const transactions = await Transaction.find({ userId: user.id, type: 'Despesa' })

    if(!transactions) {
        return res.status(404).json({ error: "Nenhuma transação encontrada!" })
    }

    return res.json({ error: null, transactions})
})

router.post('/create', verifyToken, async (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    const user = await getUserByToken(token)

    const userId = user.id
    const value = req.body.value
    const description = req.body.description
    const category = req.body.category
    const type = req.body.type

    if (value == null || description == null || type == null || category == null){
        return res.status(400).json({ error: "Preencha todos os campos!" })
    }

    const transaction = new Transaction({
        userId: userId,
        value: value,
        description: description,
        category: category,
        type: type
    })

    try {
        const newTransaction = await transaction.save()
        res.status(200).json({ error: null, msg: "Transação cadastrada!", data: newTransaction})
    } catch (err) {
        return res.status(400).json({ error: err })
    }
})

module.exports = router