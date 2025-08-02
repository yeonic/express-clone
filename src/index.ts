import * as http from 'http'
import { runMiddlewares } from './_internal/_runners'
import { middlewares } from './middleware/middlewares'

const server = http.createServer((req, res) => {
  runMiddlewares(req, res, middlewares)
  // runRouteHandlers(req, res)
})

const port = 3000

server.listen(port, () => {
  console.log(`🚀 server running at http://localhost:${port}`)
})
