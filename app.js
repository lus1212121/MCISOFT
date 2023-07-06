const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const conexion = require('./database/db');




app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// local host//

app.use('/', require('./router'));
app.use(express.static('public'));

app.listen(8001, ()=>{
    console.log('servicio');
});



