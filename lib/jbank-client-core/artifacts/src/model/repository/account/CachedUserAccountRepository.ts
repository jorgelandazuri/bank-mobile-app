import {Account} from "../../domain/entity/Account";
import {Cache} from "../Cache";
import {UserAccountRepository} from "./UserAccountRepository";

export class CachedUserAccountRepository {

  private readonly remoteUserAccountRepository: UserAccountRepository;
  private readonly cache: Cache<String, Account>;
  private readonly cacheKeyPrefix: string = '@Account:';


  constructor(remoteUserAccountRepository: UserAccountRepository, cache: Cache<String, Account>) {
    this.remoteUserAccountRepository = remoteUserAccountRepository;
    this.cache = cache;
  }

  async load(accountId: number): Promise<Account> {
    try {
      const account = await this.remoteUserAccountRepository.load(accountId);
      await this.cache.save(this.cacheKeyPrefix + String(accountId), account);
      return account;
    } catch (r) {
      console.log("Loading from cache due to error: " + r);
      return await this.cache.get(this.cacheKeyPrefix + String(accountId));
    }
  }

  async update(account: Account): Promise<void> {
    try {
      await this.remoteUserAccountRepository.update(account);
      await this.cache.save(this.cacheKeyPrefix + String(account.id), account);
      return Promise.resolve();
    } catch (r) {
      return Promise.reject('Could not perform account transfer - Reason: ' + r);
    }
  }

}
