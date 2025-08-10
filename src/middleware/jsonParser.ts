import { MiddleWare } from '../core/middleware.types'

export function jsonParser(): MiddleWare {
  return (req: HttpRequest, res: HttpResponse, next: () => void) => {
    const type = req.headers['content-type'] ?? ''

    if (type !== 'application/json') {
      next()
      return
    }

    let body = ''

    req.on('data', (chunk) => {
      body += chunk
    })

    req.on('end', () => {
      try {
        req.body = JSON.parse(body)
        next()
      } catch (error) {
        res.writeHead(400, { 'content-type': 'text/plain' })
        res.end('Invalid JSON Format.')
      }
    })

    req.on('error', (err) => {
      console.error(`Error occurred when receiving data: ${err.message}`)
      res.writeHead(400, { 'content-type': 'text/plain' })
      res.end('Error while receiving data.')
    })
  }
}
