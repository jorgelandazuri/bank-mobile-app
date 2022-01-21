import {GetAccount} from "../../lib/jbank-client-core/artifacts/src/model/domain/usecase/GetAccount";
import {AccountTransactionsScreenView} from "../../src/ui/view/AccountTransactionsScreenView";
import {AccountTransactionsScreenPresenter} from "../../src/presentation/AccountTransactionsScreenPresenter";
import {IMock, Mock, Times} from "typemoq";
import {TestUtil} from "../util/TestUtil";
import {Account} from "../../lib/jbank-client-core/artifacts/src/model/domain/entity/Account";

describe('When AccountTransactionsScreenPresenter', () => {

  const accountWithId1: Account = TestUtil.accountWithId1();

  let view: IMock<AccountTransactionsScreenView>;
  let model: IMock<GetAccount>;

  let underTest: AccountTransactionsScreenPresenter;

  beforeEach(() => {
    view = Mock.ofType<AccountTransactionsScreenView>();
    model = Mock.ofType<GetAccount>();
    underTest = new AccountTransactionsScreenPresenter(view.object, model.object);
  });

  describe('starts', () => {

    it('should fetch the account from model and ask the view to show it on success', async () => {
      model.setup(it => it.execute()).returns(() => Promise.resolve(accountWithId1));
      await underTest.onStart();
      view.verify(it => it.showAccount(accountWithId1), Times.once());
    });

    it('should fetch the account from model and ask the view to show the error on failure', async () => {
      model.setup(it => it.execute()).returns(() => Promise.reject('server error'));

      await underTest.onStart();

      view.verify(it => it.showAccountFetchingError('Could not fetch account details: server error'), Times.once());
    });
  });

  describe('refreshes', () => {

    it('should fetch the new account from model and ask the view to refresh it on success', async () => {
      model.setup(it => it.execute()).returns(() => Promise.resolve(accountWithId1));

      await underTest.onRefresh();

      view.verify(it => it.refreshOnTransactionDone(accountWithId1), Times.once());
    });

    it('should fetch the account from model and ask the view to show the error on failure', async () => {
      model.setup(it => it.execute()).returns(() => Promise.reject('404'));
      await underTest.onRefresh();
      view.verify(it => it.showAccountFetchingError('Could not refresh account details: 404'), Times.once());
    });
  });

});
