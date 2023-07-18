const mysql = require('mysql2');
// require('dotenv').config();
const connection = require('../connection.json')

const conexion = mysql.createConnection({
    host: connection.HOST1,
    user: connection.USER1,
    password: connection.PASS1,
    database: connection.DATA1
})

conexion.connect((error)=>{
    if(error){
        console.log('el error de la conexion es:'+error);
        return
    }
    console.log('CONECTADO A MYSQL');
})


module.exports = conexion;