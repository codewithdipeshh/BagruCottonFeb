const express = require('express')
// const { list } = require('postcss')
const app = express()

app.get('/', (req, res) => {
    res.send('ddd')
})


app.listen(3000)