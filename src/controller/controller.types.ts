export type RouteHandler = (req: HttpRequest, res: HttpResponse) => void | Promise<void>

export type Route = {
  [method in HttpMethod]?: {
    [path: string]: RouteHandler
  }
}
