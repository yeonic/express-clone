import { IRoute } from './interfaces/IRoute'

const _routes: IRoute[] = []
// http method, path,
// GET /users/:id

export function addRoute(
  method: HttpMethod,
  path: string,
  handler: IRoute.Handler
): void {
  const parts = path.split('/').filter(Boolean)
  const params = parts.filter((p) => p.startsWith(':')).map((p) => p.slice(1))

  _routes.push({ method, parts, params, handler: handler })
}

export function matchRoute(
  method: HttpMethod,
  url: string
): {
  handler: IRoute.Handler
  params: IRoute.PathParams
} | null {
  const urlParts = url.split('/').filter(Boolean)

  for (const route of _routes) {
    if (method !== route.method || route.parts.length !== urlParts.length)
      continue

    const params: IRoute.PathParams = {}
    let matched = true

    for (const idx in urlParts) {
      if (
        route.parts[idx].startsWith(':') &&
        !Number.isNaN(Number(urlParts[idx].trim()))
      ) {
        console.log(Number.isNaN(urlParts[idx]))
        params[route.parts[idx].slice(1)] = urlParts[idx]
        continue
      }

      if (urlParts[idx] !== route.parts[idx]) {
        matched = false
        break
      }
    }
    if (matched) return { handler: route.handler, params }
  }

  return null
}
