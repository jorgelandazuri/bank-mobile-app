import {Profile} from "./Profile";

export class Transfer {
  public readonly receiver: Profile;
  public readonly amount: number;
  public readonly currency: string;


  constructor(receiver: Profile, amount: number, currency: string) {
    this.receiver = receiver;
    this.amount = amount;
    this.currency = currency;
  }
}
