const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');
const swaggerDefinition = {
openapi: '3.0.0',
info: {
title: 'Amnil API',
version: '1.0.0',
description: 'My first swagger API',
},
components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [{
    bearerAuth: [],
  }],
};

const options = {
swaggerDefinition,
apis: [path.resolve(__dirname, '../routes/*.js')],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;