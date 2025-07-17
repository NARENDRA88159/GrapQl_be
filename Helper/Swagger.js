
const swaggerJsdoc = require("swagger-jsdoc");

const swaggerAutogen = require('swagger-autogen')();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Reastaurant",
      version: "1.0.0",
      description: "API documentation for my Reastaurant project",
    },
    host: "localhost:8003",
    servers: [{ url: "http://localhost:8003" }], // URL of your server

  },
  info: {
    title: "reastaurant",
    version: "1.0.0",
    description: "API documentation for my reastaurant project",
},
host: "localhost:8003", // Correct host and port
schemes: ["http"], // Use 'https' if deployed securely


  apis: ["./swagger/*.js"], // This is where your API routes are documented
};

const outputFile = '../swagger-output.json';

const routes = ['server.js']

swaggerAutogen(outputFile,routes,swaggerOptions)
const swaggerDocs = swaggerJsdoc(swaggerOptions);
// swaggerAutogen(outputFile,routes,swaggerOptions)
module.exports = swaggerDocs;
