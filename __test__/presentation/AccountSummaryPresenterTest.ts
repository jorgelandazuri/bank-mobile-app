import {AccountSummaryPresenter} from "../../src/presentation/AccountSummaryPresenter";
import {AccountViewModelAdapter} from "../../lib/jbank-client-core/artifacts/src/view/adapter/AccountViewModelAdapter";
import {IMock, Mock, Times} from "typemoq";
import {AccountSummaryView} from "../../src/ui/view/AccountSummaryView";
import {TestUtil} from "../util/TestUtil";

describe('When AccountSummaryPresenter starts', () => {

  let adapter: IMock<AccountViewModelAdapter> = Mock.ofType<AccountViewModelAdapter>();
  let view: IMock<AccountSummaryView> = Mock.ofType<AccountSummaryView>();
  const underTest: AccountSummaryPresenter = new AccountSummaryPresenter(view.object, adapter.object);

  it('should adapt the account object and make the view to show the view model', () => {
    adapter.setup(it => it.adapt(TestUtil.accountWithId1())).returns(() => TestUtil.accountWithId1ViewModel());

    underTest.onStart(TestUtil.accountWithId1());

    view.verify(it => it.showAccountSummary(TestUtil.accountWithId1ViewModel()), Times.once());
  });

});
