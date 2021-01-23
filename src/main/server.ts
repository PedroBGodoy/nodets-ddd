import app from './app'
import configs from './config'

app.default.listen(configs.PORT, () => {
  console.log('server started', { port: configs.PORT })
})
