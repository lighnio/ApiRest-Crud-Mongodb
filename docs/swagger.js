import swaggerJSDoc from "swagger-jsdoc";

/**
 * Api Config Info
 */

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "My API Documentation",
        description: "This documentation was generated automatically",
        contact: {
            name: 'Lighnio',
            url: 'https://lighnio.github.io/',
            email: 'test@test.com'
        },
        version: "1.0.1",
    },
    servers: [
        {
            url: 'http://localhost:3000/api'
        },
        {
            url: 'http://localhost:9080/api'
        }
    ],
    
    //     securitySchemes: {
    //     bearerAuth: {
    //         type: "http",
    //         scheme: "bearer",
    //     },
    //     },
    // },
    // definitions: {
    components: {   
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
            }
        },
        schemas: {
            authLogin: {
                type: "object",
                required: ["email", "password"],
                properties: {
                    email: {
                        type: "string",
                    },
                    password: {
                        type: "string",
                    },
                },
            },

            authRegister: {
                type: "object",
                required: ["email", "password", "age", "name"],
                properties: {
                    name: {
                        type: "string",
                    },
                    age: {
                        type: "integer",
                    },
                    email: {
                        type: "string",
                    },
                    password: {
                        type: "string",
                    },
                },
            },

            track: {
                type: "object",
                required: ["name", "album", "cover", "artist", "duration", "mediaId"],
                properties: {
                    name: {
                        type: "string"
                    },
                    album: {
                        type: "string"
                    },
                    cover: {
                        type: "string"
                    },
                    artist: {
                        type: "object",
                        properties: {
                            name: {
                                type: "string"
                            },
                            nickname: {
                                type: "string"
                            },
                            nationality: {
                                type: "string"
                            }

                        }
                    },
                    duration: {
                        type: "object",
                        properties: {
                            start: {
                                type: "integer"
                            },
                            end: {
                                type: "integer"
                            },
                        }
                    },
                    mediaId: {
                        type: "string"
                    },
                },
            },

            storage: {
                type: "string",
                properties: {
                    url: {
                        type: "string",
                    },
                    filename: {
                        type: "string",
                    },
                },
            },
        },
    }
    };

/**
 * Options
 */
const options = {
    swaggerDefinition,
    apis: [
        "./src/routes/routes.js"
    ]
};

export const openApiConf = swaggerJSDoc(options);