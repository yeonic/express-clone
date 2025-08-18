import * as http from 'http'
import * as url from 'url'

import { assert } from 'console'
import { Router } from './types'

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
    http.createServer((req, res) => {
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
    })
  }

  return app
}

function createRouter(): Router {
  return {}
}
