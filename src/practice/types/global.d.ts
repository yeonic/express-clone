import * as http from 'http'

declare global {
  type HttpRequest = http.IncomingMessage
  type HttpResponse = http.ServerResponse<HttpRequest>
  type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
}

declare module 'http' {
  type BodyType = string | { [propertyName: string]: string }
  interface IncomingMessage {
    processList?: string[]
    user?: { id: number; name: string }
    body?: { [propertyName: string]: BodyType }
  }
}

export {}
