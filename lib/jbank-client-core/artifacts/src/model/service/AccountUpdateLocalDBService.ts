import {Service} from "./Service";
import {Account} from "../domain/entity/Account";
import {UpdateAccountRequestFactory} from "../network/UpdateAccountToHttpLocalDBRequestFactory";
import {NetworkClient, NetworkRequest, NetworkResponse} from "../network/NetworkClient";

export class AccountUpdateLocalDBService implements Service<Account, Promise<void>> {

  private readonly restNetworkClient: NetworkClient;
  private readonly requestFactory: UpdateAccountRequestFactory<NetworkRequest>;

  constructor(restNetworkClient: NetworkClient, requestFactory: UpdateAccountRequestFactory<NetworkRequest>) {
    this.restNetworkClient = restNetworkClient;
    this.requestFactory = requestFactory;
  }

  async process(accountToUpdate: Account): Promise<void> {
    const request = this.requestFactory.make(accountToUpdate);
    try {
      const response: NetworkResponse = await this.restNetworkClient.process(request);
      return this.success(response.status)
        ? Promise.resolve()
        : Promise.reject('Status code: ' + response.status)
    } catch (e) {
      return Promise.reject('Account update client service error : ' + e)
    }
  }

  private success(statusCode: number): boolean {
    return statusCode == 200;
  }

}
