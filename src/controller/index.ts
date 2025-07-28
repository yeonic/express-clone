import { HttpRequest, HttpResponse } from './types'

export type RouteHandler = (req: HttpRequest, res: HttpResponse) => any

export const getHome = (req: HttpRequest, res: HttpResponse) => {
  res.writeHead(200, { 'content-type': 'text/plain' })
  res.end('This is home')
}

export const getAbout = (req: HttpRequest, res: HttpResponse) => {
  res.writeHead(200, { 'content-type': 'text/plain' })
  res.end('This is about us')
}

export const getContact = (req: HttpRequest, res: HttpResponse) => {
  res.writeHead(200, { 'content-type': 'text/plain' })
  res.end('This is our contact')
}
