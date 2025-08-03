import * as path from 'path'

import { MiddleWare } from '../core/middleware.types'
import { createStaticMiddleware } from './staticMiddleware'

const staticFileMiddleware = createStaticMiddleware(
  path.resolve(__dirname, '../../static')
)

export const middlewares: MiddleWare[] = [
  staticFileMiddleware,
  (req: HttpRequest, res: HttpResponse, next: () => void) => {
    console.log('📦 응답 준비')
    res.writeHead(200, { 'content-type': 'text/plain' })
    res.end('Hello, everything is fine')
  },
] as const
