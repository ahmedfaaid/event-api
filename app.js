const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const gql = require('./graphql')

const app = express()

app.use(bodyParser.json())

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
