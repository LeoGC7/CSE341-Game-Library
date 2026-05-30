const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const mongodb = require('./db/connect.js')
const errorHandler = require('./middleware/errorHandler.js')
const swaggerUi = require('swagger-ui-express')
const swaggerDocumnet = require('./swagger.json')

const app = express()
const port = process.env.PORT || 8080

app.use(cors())
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumnet))

app.use('/', routes)

app.use(errorHandler)

mongodb.initDb((err) => {
    if (err) {
        console.log(`An error ocurred: ${err}`)
    } else {
        app.listen(port, () => {
            console.log(`App listening on http://localhost:${port} and DB is connected`)
        })
    }
})
