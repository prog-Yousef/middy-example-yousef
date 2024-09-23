const { sendResponse, sendError } = require("../../responses/index");
const { db } = require("../../services/db");
const middy = require("@middy/core");
const {validateToken} = require("../../middleware/auth'");


async function getAccount(username) {
  try {
    const user = await db.get({
      TableName: "accounts",
      Key: {
        username: username
      }
    }).promise();

    if (user?.Item) return user.Item;
    else return false;
  } catch (error) {
    console.log(error);
  }
}

exports.handler = async (event) => {
  try {
    const account = await getAccount();

    if (!account) {
      return sendError(404, "Account not found");
    }

    return sendResponse({
      success: true,
      account: account
    });
  } catch (error) {
    return sendError(400, {
      success: false,
      message: 'Could not get account',
      error: error.message || error
    });
  }
};