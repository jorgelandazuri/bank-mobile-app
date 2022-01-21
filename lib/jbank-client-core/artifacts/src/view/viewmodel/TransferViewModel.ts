export class TransferViewModel {
  public readonly receiverName: String;
  public readonly receiverEmail: String;
  public readonly amount: String;

  constructor(receiverName: String, receiverEmail: String, amount: String) {
    this.receiverName = receiverName;
    this.receiverEmail = receiverEmail;
    this.amount = amount;
  }
}
