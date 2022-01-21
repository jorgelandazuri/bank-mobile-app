import {StringValidator} from "./StringValidator";

export class MoneyAmountValidator implements StringValidator {

  validate(amount: string): boolean {
    const re = /^[1-9][0-9]*(\.[0-9]{1,2})?$/;
    return re.test(amount);
  }

}
