const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require ('jsonwebtoken')

const User = require('../models/User')

router.post('/register', async (req, res) => {
    const business = req.body.business
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password
    const confirmpassword = req.body.confirmpassword

    if (business == null || email == null || username == null || password == null || confirmpassword == null ){
        return res.status(400).json({ error: "Todos os campos precisam ser preenchidos!" })
    }

    if (password != confirmpassword){
        return res.status(400).json({ error: "As senhas não conferem!" })
    }

    const emailExists = await User.findOne({ email: email })
    if (emailExists){
        return res.status(400).json({ error: "Email já cadastrado!" })
    }

    // gerar senha criptografada
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User({
        business: business,
        email: email,
        username: username,
        password: passwordHash
    })

    try {
        const newUser = await user.save()
        // gerar token armazenando id do usuário
        const token = jwt.sign({
            id: newUser._id
        }, process.env.SECRET)
        
        res.status(200).json({ error: null, msg: "Cadastro realizado!", token: token, userId: newUser._id })
    } catch(err) {
        res.status(400).json({ error: err })
    }
})

router.post('/login', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    if (username == null || password == null){
        return res.status(400).json({ error: "Preencha todos os campos!" })
    }

    const user = await User.findOne({ username: username })
    if (!user){
        return res.status(400).json({ error: "Usuário não cadastrado!" })
    }

    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword){
        return res.status(400).json({ error: "Senha incorreta!" })
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.SECRET)

    res.status(200).json({ error: null, msg: "Autenticado!", token: token, userId: user._id })
})

module.exports = router