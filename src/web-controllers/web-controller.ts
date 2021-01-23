import { HttpRequest, HttpResponse } from './ports'

export interface WebController {
  handle(request: HttpRequest): Promise<HttpResponse>
}
