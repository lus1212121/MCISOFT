const mysql = require('mysql2');
// require('dotenv').config();
const constants = require('../src/shared/constants');

const conexion = mysql.createConnection({
  host: constants.HOST1,
  user: constants.USER1,
  password: constants.PASS1,
  database: constants.DATA1,
});

conexion.connect((error) => {
  if (error) {
    console.log('el error de la conexion es:' + error);
    console.log({ constants });
    return;
  }
  console.log('CONECTADO A MYSQL');
});

module.exports = conexion;
