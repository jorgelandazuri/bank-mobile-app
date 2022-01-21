export class Money {
  public readonly currencyCode: String;
  public readonly amount: number;

  constructor(currencyCode: String, amount: number) {
    this.currencyCode = currencyCode;
    this.amount = amount;
  }
}
