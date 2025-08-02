import * as http from 'http'
import { runRouteHandlers } from './core/runners'

const server = http.createServer((req, res) => {
  runRouteHandlers(req, res)
})

server.listen(3000, () => {
  console.log('🚀 server running at http://localhost:3000')
})
