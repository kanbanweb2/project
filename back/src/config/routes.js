const express = require('express')

module.exports = (server) => {
    const router = express.Router()
    server.use('/api', router)

    const atividadesService = require('../api/atividades/atividadesService')
    atividadesService.register(router, '/atividades')
}