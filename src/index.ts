import * as http from 'http'
import { HttpMethod } from './controller/types'
import { route } from './routes.module'

const server = http.createServer((req, res) => {
  const { url, method } = req

  if (!url || !method) {
    res.statusCode = 400
    res.end('Bad Request')
    return
  }

  const handlers = route[method as HttpMethod]
  const handler = handlers && url in handlers ? handlers[url] : undefined

  if (handler) {
    handler(req, res)
  } else {
    res.statusCode = 404
    res.end('Not Found')
  }
})

server.listen(3000, () => {
  console.log('🚀 server running at http://localhost:3000')
})
