import { route } from '../controller/routes'
import { ErrorMiddleWare, MiddleWare } from '../core/middleware.types'

export function runRouteHandlers(req: HttpRequest, res: HttpResponse) {
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
}

export function runMiddlewares(
  req: HttpRequest,
  res: HttpResponse,
  middlewares: MiddleWare[],
  errorMiddleWare: ErrorMiddleWare
): void {
  let idx = 0

  function next(err?: Error) {
    if (err) {
      return errorMiddleWare(err, req, res, next)
    }

    if (idx >= middlewares.length) {
      console.log('Middleware 처리 완료')
      return
    }
    const currentMiddleware = middlewares[idx++]
    try {
      currentMiddleware(req, res, next)
    } catch (error) {
      next(error as unknown as Error)
    }
  }

  next()
}
