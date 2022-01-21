import {Transfer} from "./Transfer";

export class Account {
  public readonly id: number;
  public readonly currency: string;
  public readonly startingBalance: number;
  public readonly totalSent: number;
  public readonly currentBalance: number;
  public readonly transfers: Transfer[];

  constructor(id: number, currency: string, startingBalance: number, transfers: Transfer[]) {
    this.id = id;
    this.currency = currency;
    this.startingBalance = startingBalance;
    this.transfers = transfers;
    this.totalSent = this.calculateCurrentBalance(this.transfers);
    this.currentBalance = this.startingBalance - this.totalSent;
  }

  private calculateCurrentBalance(transfers: Transfer[]): number {
    return transfers.map(t => t.amount).reduce((a, b) => a + b);
  }
}
