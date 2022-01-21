import {Adapter} from "./Adapter";
import {Money} from "../../model/domain/entity/Money";

const getSymbolFromCurrency = require('currency-symbol-map')

export class MoneyAdapter implements Adapter<Money, String> {

  adapt(money: Money): String {
    const symbolFromCurrency = getSymbolFromCurrency(money.currencyCode);
    return `${symbolFromCurrency ? symbolFromCurrency+' ' : '' }${money.amount.toFixed(2)}`
  }

}
