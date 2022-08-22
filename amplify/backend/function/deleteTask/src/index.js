const pool = require("/opt/connection");
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  const taskId = event.queryStringParameters.id;

  await pool.query("delete from task where id = ?", [taskId]);

  return {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Methods": "DELETE",
    },
    body: JSON.stringify({ message: "Task deleted!" }),
  };
};
