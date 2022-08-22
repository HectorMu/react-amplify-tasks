const pool = require("/opt/connection");

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  const taskId = event.queryStringParameters.id;
  const body = JSON.parse(event.body);

  const editedTask = body.editTask;

  await pool.query("update task set ? where id = ?", [editedTask, taskId]);

  return {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Methods": "GET",
    },
    body: JSON.stringify({ message: "Task edited!" }),
  };
};
