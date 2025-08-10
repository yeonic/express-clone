import * as http from 'http'
import { runMiddlewares, runRouteHandlers } from './_internal/_runners'
import { initRoutes } from './controller/controllers'
import { middlewares } from './middleware'
import { errorMiddleWare } from './middleware/errorMiddleware'

const server = http.createServer((req, res) => {
  initRoutes()
  runMiddlewares(req, res, middlewares, errorMiddleWare, () => {
    runRouteHandlers(req, res) // 미들웨어 완료 후 라우트 핸들러 실행
  })
})

const port = 3000

server.listen(port, () => {
  console.log(`🚀 server running at http://localhost:${port}`)
})
