const mysql = require('mysql2');

const { contentDBConfig } = require('../config/contentDBConfig');


const connection = mysql.createConnection( contentDBConfig);

connection.connect(function (err) {
  if (err) {
    console.log("!!! Cannot connect !!! Error:");
    throw err;
  } else {
    console.log("Connection established.");
  }
});

module.exports = connection;
