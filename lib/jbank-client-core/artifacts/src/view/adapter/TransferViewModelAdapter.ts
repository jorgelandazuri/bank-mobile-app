import {Transfer} from "../../model/domain/entity/Transfer";
import {TransferViewModel} from "../viewmodel/TransferViewModel";
import {Adapter} from "./Adapter";
import {MoneyAdapter} from "./MoneyAdapter";
import {Money} from "../../model/domain/entity/Money";

export class TransferViewModelAdapter implements Adapter<Transfer, TransferViewModel> {

  private moneyAdapter: MoneyAdapter;

  constructor(moneyAdapter: MoneyAdapter) {
    this.moneyAdapter = moneyAdapter;
  }

  adapt(transfer: Transfer): TransferViewModel {
    let amountLabel = this.moneyAdapter.adapt(new Money(transfer.currency, transfer.amount));
    return new TransferViewModel(transfer.receiver.name, transfer.receiver.email, amountLabel);
  }

}
