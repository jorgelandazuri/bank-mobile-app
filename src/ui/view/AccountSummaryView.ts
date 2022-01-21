import {AccountViewModel} from "../../../lib/jbank-client-core/artifacts/src/view/viewmodel/AccountViewModel";

export interface AccountSummaryView {
  showAccountSummary(accountView: AccountViewModel):void
}
