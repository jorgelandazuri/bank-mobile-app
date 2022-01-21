import { StringMap } from './Type';

export class UrlBuilder {
  private readonly urlTemplate: string;
  private pathParams: StringMap<string>;
  private queryParams: StringMap<string>;

  private constructor(url: string) {
    this.urlTemplate = url;
  }

  static fromUrlTemplate(url: string): UrlBuilder {
    return new UrlBuilder(url);
  }

  withPathParameters(parameters: StringMap<string>): UrlBuilder {
    this.pathParams = parameters;
    return this;
  }

  withQueryStringParameters(parameters: StringMap<string>): UrlBuilder {
    this.queryParams = parameters;
    return this;
  }

  build(): string {
    return this.expandPathParams() + this.buildQueryString();
  }

  private expandPathParams(): string {
    const placeholder = (param: string): string => '{' + param + '}';
    return this.pathParams
      ? Object.keys(this.pathParams).reduce((processedUrl, currentParamName) => {
          return processedUrl.replace(placeholder(currentParamName), this.pathParams[currentParamName]);
        }, this.urlTemplate)
      : this.urlTemplate;
  }

  buildQueryString(): string {
    return this.queryParams
      ? '?' +
          Object.keys(this.queryParams)
            .map((paramName) => encodeURIComponent(paramName) + '=' + encodeURIComponent(this.queryParams[paramName]))
            .join('&')
      : '';
  }
}
