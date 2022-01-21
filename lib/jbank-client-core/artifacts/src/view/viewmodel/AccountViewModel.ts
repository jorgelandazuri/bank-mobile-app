import {TransferViewModel} from "./TransferViewModel";

export class AccountViewModel {
  public readonly totalSent: String;
  public readonly currentBalance: String;
  public readonly transfers: TransferViewModel[];

  constructor(totalSent: String, currentBalance: String, transfers: TransferViewModel[]) {
    this.totalSent = totalSent;
    this.currentBalance = currentBalance;
    this.transfers = transfers;
  }
}
