export interface IRoute {
  method: HttpMethod

  parts: string[]

  params: string[]

  handler: IRoute.Handler
}

export namespace IRoute {
  export type Handler = (
    req: HttpRequest,
    res: HttpResponse,
    params?: PathParams
  ) => void

  export interface PathParams {
    [paramName: string]: string
  }
}
