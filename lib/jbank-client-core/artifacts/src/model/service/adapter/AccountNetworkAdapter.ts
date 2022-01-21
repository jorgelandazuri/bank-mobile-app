import {Transfer} from "../../domain/entity/Transfer";
import {StringMap} from "../../network/Type";
import {Profile} from "../../domain/entity/Profile";
import {NetworkResponse} from "../../network/NetworkClient";
import {Account} from "../../domain/entity/Account";
import {Adapter} from "../../../view/adapter/Adapter";

export class AccountNetworkAdapter implements Adapter<NetworkResponse, Account> {

  public adapt(networkResponse: NetworkResponse): Account {
    const accountJson: StringMap<any> = JSON.parse(networkResponse.body);
    const transfersJson: StringMap<any>[] = accountJson['transfers'];
    const transfers: Transfer[] = transfersJson.map(transfersJson => this.adaptTransfer(transfersJson));
    return new Account(Number(accountJson['id']), accountJson['currency'], Number(accountJson['startingBalance']), transfers);
  }

  private adaptTransfer(transferJson: StringMap<string>): Transfer {
    return new Transfer(this.adaptProfileFrom(transferJson['receiver']),
      Number(transferJson['amount']),
      transferJson['currency']);
  }

  private adaptProfileFrom(profileJson: string): Profile {
    return new Profile(profileJson['name'], profileJson['email']);
  }
}
