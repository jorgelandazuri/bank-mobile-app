import {Transfer} from "../../lib/jbank-client-core/artifacts/src/model/domain/entity/Transfer";
import {Profile} from "../../lib/jbank-client-core/artifacts/src/model/domain/entity/Profile";
import {AccountViewModel} from "../../lib/jbank-client-core/artifacts/src/view/viewmodel/AccountViewModel";
import {TransferViewModel} from "../../lib/jbank-client-core/artifacts/src/view/viewmodel/TransferViewModel";
import {User} from "../../lib/jbank-client-core/artifacts/src/model/domain/entity/User";
import {Account} from "../../lib/jbank-client-core/artifacts/src/model/domain/entity/Account";


export module TestUtil {

  export function accountWithId1(): Account {
    let firstTransfer = new Transfer(new Profile('Natalia', 'natalia@email.com'), 1500, 'GBP');
    let secondTransfer = new Transfer(new Profile('Thomas', 'thomas@email.com'), 1000, 'GBP');
    let thirdTransfer = new Transfer(new Profile('Martin', 'martin@email.com'), 2000, 'GBP');
    return new Account(1, 'GBP', 13500, [firstTransfer, secondTransfer, thirdTransfer]);
  }

  export function accountWithId1ViewModel(): AccountViewModel {
    let firstTransferViewModel = new TransferViewModel('Natalia', 'natalia@email.com', '£ 1500.00');
    let secondTransferViewModel = new TransferViewModel('Thomas', 'thomas@email.com', '£ 1000.00');
    let thirdTransferViewModel = new TransferViewModel('Martin', 'martin@email.com', '£ 2000.00');
    return new AccountViewModel('£ 13500.00', '£ 9000.00',
      [firstTransferViewModel, secondTransferViewModel, thirdTransferViewModel]);
  }

  export function accountId1AfterNewTransfers(transfers: Transfer[]) {
    const accountWithId1: Account = TestUtil.accountWithId1();
    const updatedTransfers: Transfer[] = accountWithId1.transfers.concat(transfers);
    return Object.assign(accountWithId1, {transfers: updatedTransfers})
  }

  export function accountWithLowBalanceId2(): Account {
    let firstTransfer = new Transfer(new Profile('Natalia', 'natalia@email.com'), 150, 'GBP');
    let secondTransfer = new Transfer(new Profile('Thomas', 'thomas@email.com'), 100, 'GBP');
    let thirdTransfer = new Transfer(new Profile('Martin', 'martin@email.com'), 200, 'GBP');
    return new Account(2, 'GBP', 500, [firstTransfer, secondTransfer, thirdTransfer]);
  }

  export function accountId2AfterNewTransfers(transfers: Transfer[]) {
    const accountWithId1: Account = TestUtil.accountWithLowBalanceId2();
    const updatedTransfers: Transfer[] = accountWithId1.transfers.concat(transfers);
    return Object.assign(accountWithId1, {transfers: updatedTransfers})
  }

  export function userWithAccountId1(): User {
    return new User(new Profile('Jorge', 'Landazuri'), 1);
  }

  export function userWithInvalidAccountId(): User {
    return new User(new Profile('Giorje', 'Landzur'));
  }

}
