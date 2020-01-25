const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const authenticate = require('./middleware/authenticate')
const gql = require('./graphql')

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    if(req.method === 'OPTIONS') {
        return res.sendStatus(200)
    }
    
    next()
})

app.use(authenticate)

app.use('/api/v1', gql)

mongoose
    .connect('mongodb://localhost:27017/event-booking-dev', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Event booking database is connected'))
    .catch(err => console.log(err.message))

app.listen(3010, () => {
    console.log('Server is live')
})
