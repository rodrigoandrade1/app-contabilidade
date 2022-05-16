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

transactionRouter = require('./routes/TransactionRouter')
app.use('/transaction', transactionRouter)

categoryRouter = require('./routes/CategoryRouter')
app.use('/category', categoryRouter)

const dbName = process.env.DB_NAME
const dbPort = process.env.DB_PORT

mongoose.connect(`mongodb://localhost/${dbName}`,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    app.listen(dbPort)
}).catch((err) =>
    console.log(err))