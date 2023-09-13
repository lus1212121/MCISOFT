const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const constants = require('./src/shared/constants');
const conexion = require('./config/db');
const path = require('path');


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuración para servir archivos estáticos

app.set('views', path.join(__dirname, 'views'));

// local host//

app.use('/', require('./routes/index'));

app.listen(constants.HTTPS_PORT, constants.IP, () => {
  console.log('servicio https');
});

app.listen(constants.HTTP_PORT, constants.IP, () => {
  console.log('servicio http');
});
