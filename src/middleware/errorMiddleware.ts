import { ErrorMiddleWare } from '../core/middleware.types'

export const errorMiddleWare: ErrorMiddleWare = (err, req, res, next) => {
  console.error('[Error MiddleWare] 에러 발생 : ', err.message)
  res.writeHead(500, 'text/plain')
  res.end(`Internal Server Error: ${err.message}`)
}
