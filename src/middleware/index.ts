import * as path from 'path'

import { MiddleWare } from '../core/middleware.types'
import { jsonParser } from './jsonParser'
import { createStaticMiddleware } from './staticMiddleware'

const staticFileMiddleware = createStaticMiddleware(
  path.resolve(__dirname, '../../static')
)

export const middlewares: MiddleWare[] = [
  staticFileMiddleware,
  jsonParser(),
  (req: HttpRequest, res: HttpResponse, next: () => void) => {
    console.log('📦 응답 준비')
    next()
  },
] as const
