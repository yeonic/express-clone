import { addRoute } from '../_internal/_routes'
import { IRoute } from '../_internal/interfaces/IRoute'

export function initRoutes() {
  addRoute(
    'GET',
    '/',
    (req: HttpRequest, res: HttpResponse, params?: IRoute.PathParams) => {
      res.writeHead(200, { 'content-type': 'text/plain' })
      res.end('This is home')
    }
  )

  addRoute(
    'GET',
    '/:id',
    (req: HttpRequest, res: HttpResponse, params?: IRoute.PathParams) => {
      res.writeHead(200, { 'content-type': 'text/plain' })
      const value = 'This is home' + (!!params ? ` with ${params!['id']}` : '')
      res.end(value)
    }
  )

  addRoute(
    'GET',
    '/about/:id',
    (req: HttpRequest, res: HttpResponse, params?: IRoute.PathParams) => {
      res.writeHead(200, { 'content-type': 'text/plain' })
      const value =
        'This is about us' + (!!params ? ` with ${params!['id']}` : '')
      res.end(value)
    }
  )

  addRoute(
    'GET',
    '/contact/:id',
    (req: HttpRequest, res: HttpResponse, params?: IRoute.PathParams) => {
      res.writeHead(200, { 'content-type': 'text/plain' })
      const value =
        'This is our contact' + (!!params ? ` with ${params!['id']}` : '')
      res.end(value)
    }
  )
}
