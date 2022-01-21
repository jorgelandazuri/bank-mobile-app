import {ModelVP} from "../../ModelVP";
import {Account} from "../entity/Account";
import {CachedUserAccountRepository} from "../../repository/account/CachedUserAccountRepository";
import {UserRepository} from "../../repository/user/UserRepository";

export class GetAccount implements ModelVP<void, Promise<Account>> {

  private userRepository: UserRepository;
  private userAccountRepository: CachedUserAccountRepository;

  constructor(userRepository: UserRepository, userAccountRepository: CachedUserAccountRepository) {
    this.userRepository = userRepository;
    this.userAccountRepository = userAccountRepository;
  }

  async execute(): Promise<Account> {
    const user = this.userRepository.load();
    try {
      if (user && user.accountId != 0) {
        return await this.userAccountRepository.load(user.accountId)
      } else {
        return Promise.reject('Invalid user');
      }
    } catch (r) {
      return Promise.reject(r);
    }
  }

}
