const mysql = require("mysql2");
const util = require("util");

const dotenv = require("dotenv");

dotenv.config();

const prod_conn = mysql.createConnection({
    host: "localhost",
    port: 3306, // Remova as aspas
    database: "energi_care",
    user: "energi_care",
    password: "EnergiCare@2023",
});

const dev_conn = mysql.createConnection({
    host: "localhost",
    port: 3306, // Remova as aspas
    database: "energi_care",
    user: "energi_care",
    password: "EnergiCare@2023",
});


// const developmentConnection = {
//   host: process.env.DATABASE_HOST,
//   port: process.env.DATABASE_PORT,
//   database: process.env.DATABASE_NAME,
//   user: process.env.DATABASE_USERNAME,
//   password: process.env.DATABASE_PASSWORD,
// };

console.log(process.env.DATABASE_NAME);
conn = process.env.NODE_ENV === "production" ? prod_conn : dev_conn;

const query = util.promisify(conn.query).bind(conn);

module.exports.getUsuarios = async function getUsuarios(req, res) {
    try {
        res = await query("SELECT * FROM usuario");
        return res;
    } catch (err) {
        throw err;
    }
};



// module.exports.getUsuarios = function getUsuarios() {
  
//     if (!(conn instanceof mysql.createConnection)) {
//       throw new Error("connection is not a mysql connection");
//     }
  
//     conn.query("SELECT * FROM usuario", (err, results) => {
//       if (err) {
//         console.error(err);
//         process.exit(1);
//       }
  
//       console.log(results);
//     });
//   };