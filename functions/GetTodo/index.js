const { sendResponse } = require("../../responses/index");
const { db } = require("../../services/db");
/* const middy = require("@middy/core"); */
const { apiKeyValidator } = require("../../middleware/index");

const handler = middy()
  .use(apiKeyValidator)
  .handler(async (event) => {
    const { username } = event.pathParameters;
    console.log(username);
    console.log(event.pathParameters);

    try {
      const { Items } = await db.query({
        TableName: "example-todos-middy",
        IndexName: "usernameIndex",
        KeyConditionExpression: "username = :username",
        ExpressionAttributeValues: {
          ":username": username,
        },
      });

      return sendResponse(Items);
    } catch (error) {}
  });

module.exports = { handler };