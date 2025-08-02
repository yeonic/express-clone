import * as http from 'http'
import { runMiddlewares, runRouteHandlers } from './_internal/_runners'
import { middlewares } from './middleware/middlewares'

const server = http.createServer((req, res) => {
  runMiddlewares(req, res, middlewares)
  runRouteHandlers(req, res)
})

server.listen(3000, () => {
  console.log('🚀 server running at http://localhost:3000')
})
