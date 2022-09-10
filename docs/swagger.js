import swaggerJSDoc from "swagger-jsdoc";

/**
 * Api Config Info
 */

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "My API Documentation",
        version: "1.0.1",
    },
    servers: [
        {
            url: 'http://localhost:3000/api'
        },
        {
            url: 'http://localhost:9080/api'
        }
    ]
};

/**
 * Options
 */
const options = {
    swaggerDefinition,
    apis: [
        "../src/routes/routes.js"
    ]
};

export const openApiConf = swaggerJSDoc(options);