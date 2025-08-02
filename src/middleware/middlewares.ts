import { MiddleWare } from '../core/middleware.types'

export const middlewares: MiddleWare[] = [
  (req: HttpRequest, res: HttpResponse, next: () => void) => {
    console.log('[Middleware 1] 요청 수신')
    next()
  },
  (req: HttpRequest, res: HttpResponse, next: () => void) => {
    console.log('[Middleware 2] 요청 검증')
    next()
  },
  (req: HttpRequest, res: HttpResponse, next: () => void) => {
    console.log('[Middleware 3] 응답 준비')
    next()
  },
] as const
