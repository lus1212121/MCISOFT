const mysql = require('mysql');
require('dotenv').config();

const conexion = mysql.createConnection({
    host: process.env.HOST1,
    user:process.env.USER1,
    port:process.env.PORT1, 
    password:process.env.PASS,
    database: process.env.DATA
})

conexion.connect((error)=>{
    if(error){
        console.log('el error de la conexion es:'+error);
        return
    }
    console.log('CONECTADO A MYSQL');
})


module.exports = conexion;