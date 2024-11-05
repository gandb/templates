
import * as axios from 'axios';

interface HttpHeaders {

  set(headerName?: string, value?: any): HttpHeaders;
  set(headers?:  HttpHeaders | string, rewrite?: boolean): HttpHeaders;

  get(headerName: string, parser: RegExp): RegExpExecArray | null;
  get(headerName: string ): string;

  has(header: string): boolean;

  delete(header: string | string[] ): boolean;

  clear(): boolean;

  setUserAgent(value: string): HttpHeaders;
  getUserAgent(parser?: RegExp): RegExpExecArray | null;

  setContentEncoding(value: string): HttpHeaders;
  getContentEncoding(parser?: RegExp): RegExpExecArray | null;

  setAuthorization(value: string ): HttpHeaders;
}


interface HttpRequestConfig<D = any> {
  url?: string;
  method?: string;
  baseURL?: string;
  headers?:  HttpHeaders;
  params?: any;
  data?: D;
  responseType?: ResponseType;
}


interface HttpResponseConfig<D = any> {
  headers?:  HttpHeaders;
}

export interface HttpResponse<T = any, D = any> {
  data: T;
  status: number;
  statusText: string;
  headers: HttpHeaders;
  config: HttpResponseConfig<D>;
  request?: any;
}


export interface HTTPClient  {
  get<T = any, R = HttpResponse<T>, D = any>(url: string, config?: HttpRequestConfig<D>): Promise<R>;
  delete<T = any, R = HttpResponse<T>, D = any>(url: string, config?: HttpRequestConfig<D>): Promise<R>;
  head<T = any, R = HttpResponse<T>, D = any>(url: string, config?: HttpRequestConfig<D>): Promise<R>;
  options<T = any, R = HttpResponse<T>, D = any>(url: string, config?: HttpRequestConfig<D>): Promise<R>;
  post<T = any, R = HttpResponse<T>, D = any>(url: string, data?: D, config?: HttpRequestConfig<D>): Promise<R>;
  put<T = any, R = HttpResponse<T>, D = any>(url: string, data?: D, config?: HttpRequestConfig<D>): Promise<R>;
  patch<T = any, R = HttpResponse<T>, D = any>(url: string, data?: D, config?: HttpRequestConfig<D>): Promise<R>;
}

const httpClient:HTTPClient =  axios.default as HTTPClient;

export default httpClient;
