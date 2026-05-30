const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        title: 'Game Library API',
        description: 'API for managing a video game library with reviews. CSE341 Project.',
    },
    host: 'cse341-game-library.onrender.com',
    schemes: ['https'],
}

const outputFile = './swagger.json'
const endpointsFiles = ['./routes/index.js']

swaggerAutogen(outputFile, endpointsFiles, doc)
