import { ErrorMiddleWare, MiddleWare } from '../core/middleware.types'

export const middlewares: MiddleWare[] = [
  (req: HttpRequest, res: HttpResponse, next: () => void) => {
    console.log('📮 요청 수신')
    if (req.url === '/forbidden') {
      res.writeHead(403, { 'content-type': 'text/plain' })
      return res.end('Access Denied: You cannot access this resource.')
    }
    next()
  },
  (req: HttpRequest, res: HttpResponse, next: () => void) => {
    console.log('⚠️ 의도적인 에러 발생')
    throw new Error('Something went wrong in Middleware 2!')
  },
  (req: HttpRequest, res: HttpResponse, next: () => void) => {
    console.log('📦 응답 준비')
    res.writeHead(200, { 'content-type': 'text/plain' })
    res.end('Hello, everything is fine')
  },
] as const

export const errorMiddleWare: ErrorMiddleWare = (err, req, res, next) => {
  console.error('[Error MiddleWare] 에러 발생 : ', err.message)
  res.writeHead(500, 'text/plain')
  res.end(`Internal Server Error: ${err.message}`)
}
