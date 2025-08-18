import { IRoute } from '../_internal/interfaces/IRoute'

export type RouteHandler = (
  req: HttpRequest,
  res: HttpResponse,
  params?: IRoute.PathParams
) => void | Promise<void>

export type Route = {
  [method in HttpMethod]?: {
    [path: string]: RouteHandler
  }
}
