const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        title: 'Game Library API',
        description:
            'API for managing a video game library with reviews. CSE341 Project. Protected routes (POST/PUT/DELETE on /games and /reviews) require GitHub OAuth login via /auth/github.',
    },
    host: 'cse341-game-library.onrender.com',
    schemes: ['https', 'http'],
    securityDefinitions: {
        cookieAuth: {
            type: 'apiKey',
            in: 'cookie',
            name: 'connect.sid',
            description: 'Session cookie set by Passport after logging in via GET /auth/github.',
        },
    },
}

const outputFile = './swagger.json'
const endpointsFiles = ['./routes/index.js']

swaggerAutogen(outputFile, endpointsFiles, doc)
