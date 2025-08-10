import { ErrorMiddleWare, MiddleWare } from '../core/middleware.types'
import { matchRoute } from './_routes'

export function runRouteHandlers(req: HttpRequest, res: HttpResponse) {
  const { url, method } = req

  if (!url || !method) {
    res.statusCode = 400
    res.end('Bad Request')
    return
  }

  console.log('inside runRouteHandlers: ', method, url)

  const matched = matchRoute(method as HttpMethod, url)

  if (!matched) {
    res.statusCode = 404
    res.end('Not Found')
    return
  }

  matched.handler(req, res, matched.params)
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
