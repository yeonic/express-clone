import * as http from 'http'
import { runMiddlewares } from './_internal/_runners'
import { errorMiddleWare, middlewares } from './middleware/middlewares'

const server = http.createServer((req, res) => {
  runMiddlewares(req, res, middlewares, errorMiddleWare)
  // runRouteHandlers(req, res)
})

const port = 3000

server.listen(port, () => {
  console.log(`🚀 server running at http://localhost:${port}`)
})
