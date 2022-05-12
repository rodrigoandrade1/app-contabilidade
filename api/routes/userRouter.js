const router = require('express').Router()

router.get('/', (req, res) => {
    res.status(400).json({msg: "olá"})
})


module.exports = router