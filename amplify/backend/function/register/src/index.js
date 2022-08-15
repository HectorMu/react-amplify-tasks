const mysql = require("mysql2");
const { promisify } = require("util");

const Dbpool = mysql.createPool({
  host: "tasks.ctdju6yvrlfc.us-east-1.rds.amazonaws.com",
  database: "tasks",
  user: "admin",
  password: "espartanclase3",
});
Dbpool.getConnection((err, connection) => {
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

Dbpool.query = promisify(Dbpool.query);
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context, callback) => {
  console.log(JSON.stringify(event));
  const body = JSON.parse(event.body);

  const newUser = body.userData;

  // if (Object.values(newUser).some((value) => !value)) {
  //   return {
  //     statusCode: 400,
  //     headers: {
  //       "Access-Control-Allow-Origin": "*",
  //       "Access-Control-Allow-Headers": "*",
  //     },
  //     body: JSON.stringify({ error: "All user data is required" }),
  //   };
  // }

  const results = await Dbpool.query("insert into user set ?", [newUser]);
  console.log(newUser);

  return {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Methods": "POST",
    },
    body: JSON.stringify("User saved"),
  };
};
