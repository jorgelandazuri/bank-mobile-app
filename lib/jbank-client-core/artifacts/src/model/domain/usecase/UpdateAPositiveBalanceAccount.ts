import {ModelVP} from "../../ModelVP";
import {Transfer} from "../entity/Transfer";
import {Account} from "../entity/Account";
import {UserAccountRepository} from "../../repository/account/UserAccountRepository";
import {AccountTransaction} from "../entity/AccountTransaction";
import {CachedUserAccountRepository} from "../../repository/account/CachedUserAccountRepository";
import {RemoteUserAccountRepository} from "../../repository/account/RemoteUserAccountRepository";

export class UpdateAPositiveBalanceAccount implements ModelVP<AccountTransaction, Promise<void>> {
  private cachedUserAccountRepository: UserAccountRepository;
  private remoteUserAccountRepository: UserAccountRepository;

  constructor(cachedUserAccountRepository: CachedUserAccountRepository, remoteUserAccountRepository: RemoteUserAccountRepository) {
    this.cachedUserAccountRepository = cachedUserAccountRepository;
    this.remoteUserAccountRepository = remoteUserAccountRepository;
  }

  async execute(transaction: AccountTransaction): Promise<void> {
    try {
      const accountBeforeTransfer = await this.remoteUserAccountRepository.load(transaction.fromAccountId);
      if (this.hasEnoughMoney(accountBeforeTransfer.currentBalance, transaction.transferDetails.amount)) {
        const updatedTransfers: Transfer[] = accountBeforeTransfer.transfers.concat(transaction.transferDetails);
        const updatedAccount: Account = Object.assign(accountBeforeTransfer, {transfers: updatedTransfers});
        return await this.cachedUserAccountRepository.update(updatedAccount);
      } else {
        return Promise.reject('Unable to perform transfer - reason: Low balance');
      }
    } catch (r) {
      return Promise.reject('Unable to perform transfer - reason: ' + r);
    }
  }

  private hasEnoughMoney(currentBalance: number, amountToTransfer: number): Boolean {
    return currentBalance - amountToTransfer >= 0;
  }

}
