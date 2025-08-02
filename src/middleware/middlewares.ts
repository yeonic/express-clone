import { MiddleWare } from '../core/middleware.types'

export const middlewares: MiddleWare[] = [
  (req: HttpRequest, res: HttpResponse, next: () => void) => {
    console.log('📮 요청 수신')
    req.processList = ['📮 요청 수신']
    next()
  },
  (req: HttpRequest, res: HttpResponse, next: () => void) => {
    console.log('🔑 요청 검증')
    req.user = { id: 123, name: 'user1' }
    req.processList?.push('🔑 요청 검증')
    next()
  },
  (req: HttpRequest, res: HttpResponse, next: () => void) => {
    console.log('📦 응답 준비')
    const resData = {
      message: 'Hello from Enhanced Middleware Chain!',
      user: req.user,
      log: req.processList,
    }
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify(resData))
    next()
  },
] as const
