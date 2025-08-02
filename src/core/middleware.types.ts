export type MiddleWare = (
  req: HttpRequest,
  res: HttpResponse,
  next: () => void
) => void

export type ErrorMiddleWare = (
  err: Error,
  req: HttpRequest,
  res: HttpResponse,
  next: (err?: Error) => void
) => void
