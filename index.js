const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const constants = require('./src/shared/constants');
const conexion = require('./config/db');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuración para servir archivos estáticos
//app.use(express.static('public'));

// local host//

app.use('/', require('./routes/index'));

app.listen(constants.HTTP_PORT, constants.IP, () => {
  console.log('servicio http');
});
