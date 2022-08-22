const mysql = require("mysql2");
const keys = require("./keys");

const { promisify } = require("util");

const pool = mysql.createPool({
  host: keys.host,
  database: keys.database,
  user: keys.user,
  password: keys.password,
});
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed by provider");
    }

    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has more than admited connections");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("The connection to databse was refused by provider");
    }
  }
  if (connection) {
    connection.release();
    console.log("Database connected succesfully");
    return;
  }
});

pool.query = promisify(pool.query);
module.exports = pool;
