const mysql = require("mysql2");
const util = require("util");
const dotenv = require("dotenv");

dotenv.config();

const prod_conn = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
});

const dev_conn = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
});

const conn = process.env.NODE_ENV === "production" ? prod_conn : dev_conn;
const query = util.promisify(conn.query).bind(conn);

module.exports = {
  query,
};
