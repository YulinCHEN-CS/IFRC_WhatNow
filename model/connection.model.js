const mysql = require('mysql2');

const { contentDBConfig } = require('../config/contentDBConfig');


const conn = mysql.createConnection(contentDBConfig);

conn.connect(function (err) {
  if (err) {
    console.log("!!! Cannot connect !!! Error:");
    throw err;
  } else {
    console.log("Connection established.");
  }
});

module.exports = conn;
