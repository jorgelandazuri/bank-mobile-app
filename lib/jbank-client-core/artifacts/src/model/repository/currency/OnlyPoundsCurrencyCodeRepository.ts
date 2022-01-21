import {CurrencyCodeRepository} from "./CurrencyCodeRepository";

export class OnlyPoundsCurrencyCodeRepository implements CurrencyCodeRepository {
  load(): string {
    return "GBP";
  }


}
