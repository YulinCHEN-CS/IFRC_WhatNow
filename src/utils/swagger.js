const path = require('path')
const express = require('express')
const swaggerUI = require('swagger-ui-express')
const swaggerDoc = require('swagger-jsdoc')

  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'api',
        version: '1.0.0',
        description: `whatnow`
      }
    },

    apis: [path.join(__dirname,'../route/*.js')]
  }

  var swaggerJson = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  }
  const swaggerSpec = swaggerDoc(options)
  
  var swaggerInstall = function(app) {
    if (!app){
      app = express()
    }

    app.get('/swagger.json', swaggerJson);

    app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  }
  module.exports = swaggerInstall 
