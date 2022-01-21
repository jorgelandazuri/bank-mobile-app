import {Account} from "../../../lib/jbank-client-core/artifacts/src/model/domain/entity/Account";

export interface AccountTransactionsScreenView {
  showAccount(account: Account): void;

  refreshOnTransactionDone(account: Account): void;

  showAccountFetchingError(error: string): void;

}
