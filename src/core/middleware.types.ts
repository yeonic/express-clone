export type MiddleWare = (req: HttpRequest, res: HttpResponse, next: () => void) => void
