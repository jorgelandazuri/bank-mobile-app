import {MVPresenter} from "../../lib/jbank-client-core/artifacts/src/presentation/MVPresenter";
import {GetAccount} from "../../lib/jbank-client-core/artifacts/src/model/domain/usecase/GetAccount";
import {AccountTransactionsScreenView} from "../ui/view/AccountTransactionsScreenView";
import {Account} from "../../lib/jbank-client-core/artifacts/src/model/domain/entity/Account";

export class AccountTransactionsScreenPresenter extends MVPresenter<AccountTransactionsScreenView, GetAccount> {

  constructor(view: AccountTransactionsScreenView, model: GetAccount) {
    super(view, model);
  }

  async onStart() {
    try {
      const account: Account = await this.model.execute();
      this.view.showAccount(account);
    } catch (e) {
      this.view.showAccountFetchingError('Could not fetch account details: ' + e);
    }
  }

  async onRefresh() {
    try {
      const account: Account = await this.model.execute();
      this.view.refreshOnTransactionDone(account);
    } catch (e) {
      this.view.showAccountFetchingError('Could not refresh account details: ' + e);
    }

  }

}
