const {sendResponse} = require("../../responses/index");
const {v4: uuidv4} = require("uuid");

const Keys = [];

//1. Generera API Key och returnera den i response.
// 2. retunera generarad api key


module.exports.handler = async (event) => {

const generatedKey = uuidv4();

    Keys.push({
        key: generatedKey,
    createdAt: new Date().toLocaleTimeString(),
    requests:1000,
});


 
    
    return sendResponse({generatedKey});
}