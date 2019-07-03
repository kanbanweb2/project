const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const port = 3003

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())

server.listen(port, function(){
    console.log(`backend is running on port ${port}.`)
})

module.exports = server