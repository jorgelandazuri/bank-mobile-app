import {Transfer} from "./Transfer";

export class AccountTransaction {
  public readonly fromAccountId: number;
  public readonly transferDetails: Transfer;

  constructor(fromAccountId: number, transferDetails: Transfer) {
    this.fromAccountId = fromAccountId;
    this.transferDetails = transferDetails;
  }
}
