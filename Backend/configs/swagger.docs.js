const swaggerJsdoc = require("swagger-jsdoc");

require("dotenv").config();
//1. swaggerjsdocs
const options = {
    failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
    definition: {
      openapi: '3.0.0',
      servers:[{url:process.env.SERVER},],
      info: {
        title: 'Dentique Backend Server Documentation',
        version: '1.0.0',
        description:"This is the official documentation for the dental appointment booking project named Dentique",
        contact:{name:"Dentique",url:"https://github.com/Sahil18718/greasy-sofa-244",email:"dentiqueproject@gmail.com"},

      },
    },
    apis: ['../Routes/*.js'],
  };
  
  const openapiSpecification = swaggerJsdoc(options);

  module.exports={openapiSpecification}
  