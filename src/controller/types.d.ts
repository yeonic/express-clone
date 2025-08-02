export type HttpRequest = http.IncomingMessage
export type HttpResponse = http.ServerResponse<HttpRequest>
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
export type Route = {
  [method in HttpMethod]?: {
    [path: string]: RouteHandler
  }
}
