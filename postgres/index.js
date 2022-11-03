const express = require('express');
const bodyParser = require('body-parser');

const config = require('../config');
const router = require('./network');

const app = express();

app.use(bodyParser.json());

// RUTAS
app.use('/', router)

app.listen(config.postgresService.port, () => {
    console.log('Servicio de postgres escuchando en el puerto', config.postgresService.port);
})