const config = require("./config");
const mysql = require('mysql2')
const db = mysql.createConnection(config.mysql);
 
module.exports = db;