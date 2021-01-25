import express from 'express'

// middlewares
import cors from 'cors'
import helmet from 'helmet'
import bodyParser from 'body-parser'

// routes
import baseRouter from './routes/base'
import pageRouter from './routes/page'
import textRouter from './routes/text'

class App {
    public default: express.Application

    constructor() {
        this.default = express()

        this.setupMiddlewares()
        this.setupRoutes()
    }

    private setupMiddlewares() {
        this.default.use(cors())
        this.default.use(helmet())
        this.default.use(bodyParser.json())
    }

    private setupRoutes() {
        // public
        this.default.use(baseRouter)

        // private
        this.default.use(pageRouter)
        this.default.use(textRouter)

        this.default.use((_, response, next) => {
            response.send({ error: 'route not found' })
            next()
        })
    }
}

export default new App()
