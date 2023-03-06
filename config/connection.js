/** @format */

const mysql = require("mysql");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 100,
  waitForConnections: true,
});

pool.query(
  `ALTER USER '${process.env.DATABASE_USER}'@'${process.env.DATABASE_HOST}' IDENTIFIED WITH mysql_native_password BY '${process.env.DATABASE_PASSWORD}'`
);

module.exports = pool;
