import {AccountSummaryView} from "../ui/view/AccountSummaryView";
import {VPresenter} from "../../lib/jbank-client-core/artifacts/src/presentation/VPresenter";
import {AccountViewModelAdapter} from "../../lib/jbank-client-core/artifacts/src/view/adapter/AccountViewModelAdapter";
import {Account} from "../../lib/jbank-client-core/artifacts/src/model/domain/entity/Account";

export class AccountSummaryPresenter  extends VPresenter<AccountSummaryView>{

  private readonly adapter: AccountViewModelAdapter;

  constructor(view: AccountSummaryView, adapter: AccountViewModelAdapter) {
    super(view);
    this.adapter = adapter;
  }

  onStart(account: Account): void {
    this.view.showAccountSummary(this.adapter.adapt(account));
  };

}
