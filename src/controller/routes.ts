import { getAbout, getContact, getHome } from './controllers'
import { Route } from './types'

export const route: Route = {
  GET: {
    '/': getHome,
    '/about': getAbout,
    '/contact': getContact,
  },
} as const
