import { ParsedUrlQuery } from 'querystring'

declare module 'http' {
  interface IncomingMessage {
    pathname?: string | null

    query?: ParsedUrlQuery

    [key: string]: any
  }

  interface ServerResponse {
    status: (statusCode: number) => ServerResponse

    send: (data: object | any) => void

    json: (data: object) => void

    [key: string]: any
  }
}

export type Settings = { [name: string]: any }

export type Router = {
  settings?: Settings

  set?: (name: string, value: string) => void

  listen?: () => void
}
