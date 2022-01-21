import {Service} from "./Service";
import {Account} from "../domain/entity/Account";
import {GetAccountRequestFactory} from "../network/GetAccountFromHttpLocalDBRequestFactory";
import {NetworkClient, NetworkRequest, NetworkResponse} from "../network/NetworkClient";
import {Adapter} from "../../view/adapter/Adapter";

export class AccountSummaryLocalDBService implements Service<number, Promise<Account>> {

  private readonly restNetworkClient: NetworkClient;
  private readonly requestFactory: GetAccountRequestFactory<NetworkRequest>;
  private readonly adapter: Adapter<NetworkResponse, Account>;

  constructor(restNetworkClient: NetworkClient, requestFactory: GetAccountRequestFactory<NetworkRequest>,
              adapter: Adapter<NetworkResponse, Account>) {
    this.restNetworkClient = restNetworkClient;
    this.requestFactory = requestFactory;
    this.adapter = adapter;
  }

  async process(id: number): Promise<Account> {
    const request = this.requestFactory.make(String(id));
    try {
      const response: NetworkResponse = await this.restNetworkClient.process(request);
      return this.success(response.status)
        ? Promise.resolve(this.adapter.adapt(response))
        : Promise.reject('Account summary service error : ' + response.status)
    } catch (e) {
      return Promise.reject('Account summary service error : ' + e)
    }
  }

  private success(statusCode: number): boolean {
    return statusCode === 200 || statusCode === 304;
  }

}
