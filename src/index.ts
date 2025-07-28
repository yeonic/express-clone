import * as http from 'http'

export type HttpRequest = http.IncomingMessage
export type HttpResponse = http.ServerResponse<HttpRequest>
export type RouteMapping = {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  url: string
  handler: (req: HttpRequest, res: HttpResponse) => void
}

const getHome = (req: HttpRequest, res: HttpResponse) => {
  res.writeHead(200, { 'content-type': 'text/plain' })
  res.end('This is home')
}

const getAbout = (req: HttpRequest, res: HttpResponse) => {
  res.writeHead(200, { 'content-type': 'text/plain' })
  res.end('This is about us')
}

const getContact = (req: HttpRequest, res: HttpResponse) => {
  res.writeHead(200, { 'content-type': 'text/plain' })
  res.end('This is our contact')
}

/* Http Method와 Url, Handler를 매핑한다. */
const routes: RouteMapping[] = [
  { method: 'GET', url: '/', handler: getHome },
  { method: 'GET', url: '/about', handler: getAbout },
  { method: 'GET', url: '/contact', handler: getContact },
]

const server = http.createServer((req, res) => {
  const { url, method } = req

  const route = routes.find((route) => route.url === url && route.method === method)

  if (route) {
    /* route가 존재한다면 handler를 호출한다 */
    route.handler(req, res)
  } else {
    res.writeHead(404, { 'content-type': 'text/plain' })
    res.end('Page not found')
  }
})

server.listen(3000, () => {
  console.log('🚀 server running at http://localhost:3000')
})
