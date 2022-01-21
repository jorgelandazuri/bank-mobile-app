import {StringMap} from './Type';

export class NetworkResponse {
  public readonly status: number;
  public readonly body: string;
  public readonly headers: StringMap<string>;

  constructor(status: number, body: string, headers: StringMap<string>) {
    this.status = status;
    this.body = body;
    this.headers = headers;
  }

  text(): string {
    return this.body;
  }

  json(): StringMap<any> {
    try {
      return JSON.parse(this.body);
    } catch (e) {
      return null;
    }
  }
}

export enum NetworkMethod {
  GET,
  POST,
  PUT,
  DELETE,
}

export abstract class NetworkRequest {
  protected readonly url: string;
  public readonly headers: StringMap<string>;
  public readonly params: StringMap<string>;
  public body: string = '';

  constructor(url: string, headers: StringMap<string> = {}, params: StringMap<string> = {}) {
    this.url = url;
    this.headers = headers;
    this.params = params;
  }

  public addHeader(key: string, value: string) {
    this.headers[key] = value;
  }

  public addParam(key: string, value: string) {
    this.params[key] = value;
  }

  public addBody(body: string) {
    this.body = body;
  }

  public abstract getComposedUrl(): string;

  public abstract getMethod(): NetworkMethod;
}

export class GetRequest extends NetworkRequest {
  public getComposedUrl(): string {
    const esc = encodeURIComponent;
    let query = Object.keys(this.params)
      .map((k) => esc(k) + '=' + esc(this.params[k]))
      .join('&');

    if (query.length > 0) {
      query = '?' + query;
    }

    return this.url + query;
  }

  public getMethod(): NetworkMethod {
    return NetworkMethod.GET;
  }
}

export class PutRequest extends NetworkRequest {
  public getComposedUrl(): string {
    return this.url;
  }

  public getMethod(): NetworkMethod {
    return NetworkMethod.PUT;
  }
}

export interface NetworkClient {
  /**
   * @deprecated This method is deprecated. Use NetworkClient.process(NetworkRequest) instead.
   */
  get(request: NetworkRequest): Promise<NetworkResponse>;

  process(request: NetworkRequest): Promise<NetworkResponse>;
}
