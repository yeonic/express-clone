import * as http from 'http'
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

export const Method = {
  GET: 'get',
  POST: 'post',
  PATCH: 'patch',
  PUT: 'put',
  DELETE: 'delete',
  ALL: 'all',
  USE: 'use',
} as const

export type Method = (typeof Method)[keyof typeof Method]

export type Handler = (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  next: (err?: Error) => void
) => void

export type ErrorHandler = (
  err: Error,
  req: http.IncomingMessage,
  res: http.ServerResponse,
  next: (err?: Error) => void
) => void

export type AnyHandler = Handler | ErrorHandler

// Type guards
export function isErrorHandler(handler: AnyHandler): handler is ErrorHandler {
  return handler.length === 4
}

export function isRouter(handler: any): handler is Router {
  return typeof handler === 'function' && typeof handler.handle === 'function'
}

export interface Router {
  (
    req: http.IncomingMessage,
    res: http.ServerResponse,
    next: (err?: Error) => void
  ): void

  settings?: Settings

  set?: (name: string, value: string) => void

  listen?: () => void

  stack?: {
    method: Method

    path: string

    handler: AnyHandler

    isErrorHandler: boolean
  }[]

  use?: {
    (path: string, handler: AnyHandler): void
    (handler: AnyHandler): void
  }

  [key: string]: any
}
