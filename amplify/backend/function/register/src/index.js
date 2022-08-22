const pool = require("/opt/connection");
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context, callback) => {
  const body = JSON.parse(event.body);

  const newUser = body.userData;

  if (Object.values(newUser).some((value) => !value)) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify({ message: "All user data is required" }),
    };
  }

  try {
    await pool.query("insert into user set ?", [newUser]);

    return {
      statusCode: 200,
      //  Uncomment below to enable CORS requests
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "POST",
      },
      body: JSON.stringify({ message: "User saved" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      //  Uncomment below to enable CORS requests
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "POST",
      },
      body: JSON.stringify({ message: error }),
    };
  }
};
