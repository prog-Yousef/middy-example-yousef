const { keys } = require("../data/Keys");
const { sendError } = require("../responses/index");

const apiKeyValidator = {
  before: async (request) => {
    console.log(request.event);

    const apiKey = request.event.headers["todo-api-key"];

    if (!apiKey) return sendError(400, "API-key not found in header");

    const valid = keys.find((key) => key === apiKey);

    if (!valid) return sendError(400, "API-key not valid");
  },
};

module.exports = { apiKeyValidator };