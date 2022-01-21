import {StringValidator} from "./StringValidator";

export class NameValidator implements StringValidator {
  validate(name: string): boolean {
    if (name) {
      return this.isLongEnoughForFirstNameAndLastName(name.trim()) && this.doesNotContainNumbers(name)
    }
    return false;
  }

  private isLongEnoughForFirstNameAndLastName(name: string) {
    return !this.isEmpty(name) && name.length >= 3;
  }

  private isEmpty(name: string) {
    return (!name || 0 === name.length);
  }

  private doesNotContainNumbers(name: string) {
    const re = /^([^0-9]*)$/;
    return re.test(name);
  }

}
