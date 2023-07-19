const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const conexion = require('./config/db');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Configuración para servir archivos estáticos
//app.use(express.static('public'));


// local host//

app.use('/', require('./routes/index'));

app.listen(80, ()=>{
    console.log('servicio http');
});

app.listen(443, ()=>{
    console.log('servicio https');
});