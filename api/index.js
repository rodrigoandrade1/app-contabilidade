require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

authRouter = require('./routes/authRouter')
app.use('/auth', authRouter)

userRouter = require('./routes/userRouter')
app.use('/user', userRouter)

transactionRouter = require('./routes/transactionRouter')
app.use('/transaction', transactionRouter)

categoryRouter = require('./routes/categoryRouter')
app.use('/category', categoryRouter)

mongoose.connect(`mongodb+srv://rdr1go:${process.env.DB_PASSWORD}@cluster0.pvdok.mongodb.net/?retryWrites=true&w=majority`,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    app.listen(process.env.PORT || 3000)
}).catch((err) =>
    console.log(err))