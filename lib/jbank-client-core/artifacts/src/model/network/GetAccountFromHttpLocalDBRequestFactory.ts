import {GetRequest, NetworkRequest} from "./NetworkClient";
import {UrlBuilder} from "./UrlBuilder";

export interface GetAccountRequestFactory<T> {
  make(accountId: string): T
}

export class GetAccountFromHttpLocalDBRequestFactory implements GetAccountRequestFactory<NetworkRequest> {

  private path: string = "accounts/";

  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  make(accountId: string): NetworkRequest {
    const url = UrlBuilder
      .fromUrlTemplate(this.baseUrl + this.path + accountId)
      .build();

    return new GetRequest(url);
  }

}
