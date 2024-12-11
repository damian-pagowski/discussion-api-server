require('dotenv').config();

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const PORT = process.env.SERVER_PORT || 3310; 

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Discussion API',
      version: '1.0.0',
      description: 'API documentation for the Discussion REST API',
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api`, 
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  swaggerSpec,
  swaggerUi,
};