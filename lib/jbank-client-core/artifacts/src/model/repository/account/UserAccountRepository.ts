import {Account} from "../../domain/entity/Account";

export interface UserAccountRepository {
  load(accountId: number): Promise<Account>

  update(account: Account): Promise<void>
}
