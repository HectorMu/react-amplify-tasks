const pool = require("/opt/connection");

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const body = JSON.parse(event.body);

  console.log(event.requestContext);
  const newTask = body.newTask;

  const userSub = event.requestContext.authorizer.claims.sub;

  const taskWithUserSub = {
    ...newTask,
    fk_user: userSub,
  };

  await pool.query("insert into task set ?", [taskWithUserSub]);

  return {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Methods": "POST",
    },
    body: JSON.stringify("Task saved!"),
  };
};
