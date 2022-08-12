/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
  console.log("Event:", event);
  console.log("Context", context);

  const data = [{ name: "test", lastname: "testlast" }];
  return {
    statusCode: 200,
    //Uncomment below to enable CORS requests
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: JSON.stringify(data),
  };
};
