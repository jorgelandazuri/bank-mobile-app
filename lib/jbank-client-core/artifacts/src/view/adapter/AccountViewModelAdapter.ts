import {Adapter} from "./Adapter";
import {AccountViewModel} from "../viewmodel/AccountViewModel";
import {Account} from "../../model/domain/entity/Account";
import {Transfer} from "../../model/domain/entity/Transfer";
import {MoneyAdapter} from "./MoneyAdapter";
import {Money} from "../../model/domain/entity/Money";
import {TransferViewModel} from "../viewmodel/TransferViewModel";
import {TransferViewModelAdapter} from "./TransferViewModelAdapter";

export class AccountViewModelAdapter implements Adapter<Account, AccountViewModel> {

  private moneyAdapter: MoneyAdapter;
  private transferAdapter: TransferViewModelAdapter;

  constructor(moneyAdapter: MoneyAdapter, transferAdapter: TransferViewModelAdapter) {
    this.moneyAdapter = moneyAdapter;
    this.transferAdapter = transferAdapter;
  }

  adapt(account: Account): AccountViewModel {
    const totalSent = this.moneyAdapter.adapt(new Money(account.currency, account.totalSent));
    const currentBalanceLabel = this.moneyAdapter.adapt(new Money(account.currency, account.currentBalance));
    return new AccountViewModel(totalSent, currentBalanceLabel, this.adaptTransfers(account.transfers));
  }

  private adaptTransfers(transfers: Transfer[]): TransferViewModel[] {
    return transfers.map(t => this.transferAdapter.adapt(t));
  }

}
