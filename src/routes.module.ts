import { getAbout, getContact, getHome, RouteHandler } from './controller'
import { HttpMethod } from './controller/types'

export const route: Route = {
  GET: {
    '/': getHome,
    '/about': getAbout,
    '/contact': getContact,
  },
} as const

export type Route = {
  [method in HttpMethod]?: {
    [path: string]: RouteHandler
  }
}
