const mysql = require("mysql2");
const { promisify } = require("util");

const pool = mysql.createPool({
  host: "tasks.ctdju6yvrlfc.us-east-1.rds.amazonaws.com",
  database: "tasks",
  user: "admin",
  password: "espartanclase3",
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

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  const userSub = event.requestContext.authorizer.claims.sub;

  try {
    const userTasks = await pool.query("select * from task where fk_user = ?", [
      userSub,
    ]);
    return {
      statusCode: 200,
      //  Uncomment below to enable CORS requests
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "GET",
      },
      body: JSON.stringify(userTasks),
    };
  } catch (error) {
    return {
      statusCode: 400,
      //  Uncomment below to enable CORS requests
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "GET",
      },
      body: JSON.stringify([]),
    };
  }
};
