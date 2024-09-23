const jwt = require('jsonwebtoken');
const { sendError } = require('../responses/index');
const { db } = require('../services/db');
const middy = require('@middy/core');



const validateToken = {
    before: async (request) => {
        try {
            const token = request.event.headers.authorization.replace('Bearer ', '');

            if (!token) { 
                throw new Error();

            const data = await jwt.verify(token, 'abc123');
            request.event.id = data.id;
            request.event.username = data.username;


            return request.response;
            }
        } catch (error) {

            request.event.error = '401';

            return request.response;
            
        }
    },

   onError: async (request) => {
    request.event.error = '401';

    return request.response;
   }
};

module.exports = {
    validateToken
};