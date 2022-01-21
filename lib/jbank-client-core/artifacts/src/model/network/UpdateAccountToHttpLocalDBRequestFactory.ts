import {Account} from "../domain/entity/Account";
import {NetworkRequest, PutRequest} from "./NetworkClient";
import {UrlBuilder} from "./UrlBuilder";

export interface UpdateAccountRequestFactory<T> {
  make(accountToUpdate: Account): T
}

export class UpdateAccountToHttpLocalDBRequestFactory implements UpdateAccountRequestFactory<NetworkRequest> {

  private path: string = "accounts/";

  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  make(account: Account): NetworkRequest {
    const url = UrlBuilder
      .fromUrlTemplate(this.baseUrl + this.path + String(account.id))
      .build();
    let putRequest = new PutRequest(url, {'Content-Type': 'application/json'}, {});
    putRequest.addBody(JSON.stringify(account));
    return putRequest;
  }

}
