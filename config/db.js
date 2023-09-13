const mysql = require('mysql2');
const constants = require('../src/shared/constants');

const ClientDB = function () {
  const conexion = mysql.createConnection({
    host: constants.HOST1,
    user: constants.USER1,
    password: constants.PASS1,
    database: constants.DATA1,
  });

  conexion.connect((error) => {
    if (error) {
      console.log('el error de la conexion es:' + error);
      return;
    }
    console.log('CONECTADO A MYSQL');
  });

  return conexion;
};

module.exports = ClientDB;
