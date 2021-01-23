import Logger from '@src/infra/logger'
import app from './app'
import configs from './config'

const logger = new Logger()

app.default.listen(configs.PORT, () => {
    logger.info('server started', { port: configs.PORT })
})
