import {Cache} from "../../lib/jbank-client-core/artifacts/src/model/repository/Cache";
import {Account} from "../../lib/jbank-client-core/artifacts/src/model/domain/entity/Account";
import {AsyncStorage} from "react-native";

export class AsyncStorageUserAccountCache  implements Cache<string, Account>{

  private readonly storage: AsyncStorage;

  constructor(storage: AsyncStorage) {
    this.storage = storage;
  }

  async get(key: string): Promise<Account> {
    try {
      const account = await this.storage.getItem(key);
      return account ? Promise.resolve(JSON.parse(account)) : Promise.reject("Error resolving user account");
    } catch (e) {
      return Promise.reject("Error retrieving user account from cache, reason: " + e);
    }
  }

  async save(key: string, value: Account): Promise<void> {
    try {
      await this.storage.setItem(key, JSON.stringify(value));
      return Promise.resolve();
    } catch (e) {
      return Promise.reject("Error saving user account data in cache, reason: " + e);
    }
  }

}
