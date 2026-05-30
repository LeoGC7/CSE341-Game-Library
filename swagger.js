const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        title: 'Game Library API',
        description: 'API for managing a video game library with reviews. CSE341 Project.',
    },
    host: 'localhost:8080',
    schemes: ['http'],
}

const outputFile = './swagger.json'
const endpointsFiles = ['./routes/index.js']

swaggerAutogen(outputFile, endpointsFiles, doc)
