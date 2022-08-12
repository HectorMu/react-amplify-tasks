/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context, callback) => {
  const newUser = event.userData;

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
