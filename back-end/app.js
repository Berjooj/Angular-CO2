const express = require('express');
const app = express();

const cors = require('cors')

const morgan = require('morgan');
const bodyParser = require('body-parser')

const userRouter = require('./routes/user.route');

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(cors())

app.use('/user', userRouter)
app.use('/user/id', userRouter)

app.use((req, res, next) => {
    const error = new Error('Nada encontrado')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
        response: "Algo deu errado x.x",
        error: error.message,
        status: error.status
    })
    next(res)
})

module.exports = app;