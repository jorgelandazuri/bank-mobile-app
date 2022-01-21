import {Account} from "../../domain/entity/Account";
import {Service} from "../../service/Service";
import {UserAccountRepository} from "./UserAccountRepository";

export class RemoteUserAccountRepository implements UserAccountRepository {

  private readonly accountSummaryService: Service<number, Promise<Account>>;
  private readonly accountUpdateService: Service<Account, Promise<void>>;

  constructor(accountSummaryService: Service<number, Promise<Account>>,
              accountUpdateService: Service<Account, Promise<void>>) {
    this.accountSummaryService = accountSummaryService;
    this.accountUpdateService = accountUpdateService;
  }

  async load(accountId: number): Promise<Account> {
    try {
      return await this.accountSummaryService.process(accountId);
    } catch (r) {
      return Promise.reject('Remote account loading failed - reason: ' + r);
    }
  }

  async update(account: Account): Promise<void> {
    try {
      await this.accountUpdateService.process(account);
      return Promise.resolve();
    } catch (r) {
      return Promise.reject('Remote account update failed - reason: ' + r);
    }
  }

}
