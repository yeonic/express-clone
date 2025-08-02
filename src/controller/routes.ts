import { Route } from './controller.types'
import { getAbout, getContact, getHome } from './controllers'

export const route: Route = {
  GET: {
    '/': getHome,
    '/about': getAbout,
    '/contact': getContact,
  },
} as const
