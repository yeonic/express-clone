import { route } from '../controller/routes'
import { HttpMethod, HttpRequest, HttpResponse } from '../controller/types'

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
