import * as fs from 'fs'
import * as path from 'path'

import { MiddleWare } from '../core/middleware.types'

export function getMimeType(filePath: string): string {
  const extname = path.extname(filePath)

  switch (extname) {
    case '.html':
      return 'text/html'
    case '.css':
      return 'text/css'
    case '.js':
      return 'application/javascript'
    case '.png':
      return 'image/png'
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg'
    case '.gif':
      return 'image/gif'
    case '.svg':
      return 'image/svg+xml'
    default:
      return 'application/octet-stream'
  }
}

export function createStaticMiddleware(staticDir: string): MiddleWare {
  return (req, res, next) => {
    const filePath = path.join(staticDir, req.url ?? '')
    fs.stat(filePath, (err, stats) => {
      if (!err && stats.isFile()) {
        const stream = fs.createReadStream(filePath)
        res.writeHead(200, { 'content-type': getMimeType(filePath) })
        stream.pipe(res)
      } else {
        next()
      }
    })
  }
}
