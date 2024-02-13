/**
 * Title: app.js
 * Author: Professor Krasso
 * Date: 8/5/2023
 * Modified by: Team Hufflpuff - Hannah Del Real, Jocelyn Dupuis, and Kyle Hochdoerfer
 */
'use strict'

// Require statements
const express = require('express');
const createServer = require('http-errors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const userRoute = require("./routes/user")

// Create the Express app
const app = express();

// Initiate Swagger API documentation
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BCRS API',
      version: '1.0.0',
      description: 'API Documentation for managing all users and invoices for BCRS'
    },
  },
  // This indicates the files containing annotations for OpenAPI specification
  apis: ['./swaggerDoc.js'],
};

const openApiSpecification = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpecification));

// Configure the app
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../dist/bcrs')))
app.use('/', express.static(path.join(__dirname, '../dist/bcrs')))


app.use("/api/users", userRoute);

// error handler for 404 errors
app.use(function(req, res, next) {
  next(createServer(404)) // forward to error handler
})

// error handler for all other errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500) // set response status code

  // send response to client in JSON format with a message and stack trace
  res.json({
    type: 'error',
    status: err.status,
    message: err.message,
    stack: req.app.get('env') === 'development' ? err.stack : undefined
  })
})

module.exports = app // export the Express application