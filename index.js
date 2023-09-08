const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const constants = require('./src/shared/constants');
const conexion = require('./config/db');
<<<<<<< HEAD
const path = require('path');
=======
>>>>>>> 3d337017bec7f0d10dbb168cef55ae6217a5e9c2

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuración para servir archivos estáticos
<<<<<<< HEAD

app.set('views', path.join(__dirname, 'views'));
=======
//app.use(express.static('public'));
>>>>>>> 3d337017bec7f0d10dbb168cef55ae6217a5e9c2

// local host//

app.use('/', require('./routes/index'));

app.listen(constants.HTTPS_PORT, constants.IP, () => {
  console.log('servicio https');
});

app.listen(constants.HTTP_PORT, constants.IP, () => {
  console.log('servicio http');
});
