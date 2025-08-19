import * as http from 'http'
import * as url from 'url'

import { assert } from 'console'
import { AnyHandler, ErrorHandler, Handler, Method, Router } from './types'

export function createApplication() {
  const app = createRouter()

  app.settings = {}

  app.set = function (name: string, value: string) {
    if (!this.settings) {
      app.settings = {}
    }
    app.settings![name] = value
  }

  app.listen = function () {
    const server = http.createServer((req, res) => {
      assert(req.url !== undefined)

      const { pathname, query } = url.parse(req.url!, true)

      req.pathname = pathname
      req.query = query

      res.status = function (statusCode) {
        res.writeHead(statusCode)
        return res
      }

      res.send = function (data) {
        const mimeType =
          typeof data === 'object' ? 'application/json' : 'text/html'

        res.writeHead(res.statusCode || 200, { 'content-type': mimeType })
        res.end(typeof data === 'object' ? JSON.stringify(data) : data)
      }

      res.json = function (data) {
        res.writeHead(res.statusCode || 200, {
          'content-type': 'application/json',
        })
        res.end(JSON.stringify(data))
      }

      // TODO: app.handle 호출
    })

    return app.listen?.apply(server)
  }

  return app
}

function createRouter(): Router {
  const router: Router = function (req, res, next) {
    router.handle(req, res, next)
  }

  router.stack = []

  router.use = function (...args: any[]) {
    const handler: AnyHandler = args.length === 1 ? args[0] : args[1]
    const path: string = args.length === 1 ? '/' : args[0]

    assert(router.stack)
    router.stack!.push({
      method: 'use',
      path,
      handler,
      isErrorHandler: handler.length === 4,
    })
  }

  const methods = Object.values(Method)
  methods.forEach((method) => {
    router[method] = function (path: string, ...handlers: Handler[]) {
      assert(router.stack)
      handlers.forEach((handler) => {
        router.stack!.push({
          method,
          path,
          handler,
          isErrorHandler: false,
        })
      })
    }
  })

  router.handle = function (
    req: http.IncomingMessage,
    res: http.ServerResponse,
    out: (err: Error) => void
  ): void {
    let idx = 0
    const { pathname } = req

    function next(err?: Error): void {
      if (idx >= router.stack!.length) return out && out(err!)

      assert(router.stack)
      const layer = router.stack![idx++]
      const { method, path: layerPath, handler, isErrorHandler } = layer

      if (err) {
        if (!isErrorHandler) return next(err)
        if (layerPath !== '/' && !pathname?.startsWith(layerPath))
          return next(err)

        return (handler as ErrorHandler)(err, req, res, next)
      }

      if (method === 'use') {
        if (layerPath !== '/' && !pathname?.startsWith(layerPath)) return next()

        const subPath = pathname?.slice(layerPath.length) || '/'
        const originPath = req.pathname
        const originUrl = req.url

        req.pathname = subPath
        req.url = subPath + url.parse(req.url!, true).search || ''

        const router = handler as Router
        if (router.handle && router.handle === 'function') {
          router.handle(req, res, function (err?: Error) {
            req.pathname = originPath
            req.url = originUrl
            if (err) return next(err!)
            next()
          })
        } else {
          ;(handler as Handler)(req, res, function (err) {
            req.pathname = originPath
            req.url = originUrl
            if (err) return next(err!)
            next()
          })
        }
        return
      }

      assert(req.method)
      const m = req.method!.toLowerCase()
      if (
        method === 'all' ||
        method === m /** && matchPath(layerPaht, pathname, req) */
      ) {
        return (handler as Handler)(req, res, next)
      }

      next()
    }
    next()
  } satisfies Handler

  return router
}
