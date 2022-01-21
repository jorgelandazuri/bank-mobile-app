import {TransferFormPresenter} from "../../src/presentation/TransferFormPresenter";
import {TransferFormView} from "../../src/ui/view/TransferFormView";
import {IMock, Mock, Times} from "typemoq";
import {UpdateAPositiveBalanceAccount} from "../../lib/jbank-client-core/artifacts/src/model/domain/usecase/UpdateAPositiveBalanceAccount";
import {UserRepository} from "../../lib/jbank-client-core/artifacts/src/model/repository/user/UserRepository";
import {CurrencyCodeRepository} from "../../lib/jbank-client-core/artifacts/src/model/repository/currency/CurrencyCodeRepository";
import {AccountTransaction} from "../../lib/jbank-client-core/artifacts/src/model/domain/entity/AccountTransaction";
import {Transfer} from "../../lib/jbank-client-core/artifacts/src/model/domain/entity/Transfer";
import {Profile} from "../../lib/jbank-client-core/artifacts/src/model/domain/entity/Profile";
import {OnlyPoundsCurrencyCodeRepository} from "../../lib/jbank-client-core/artifacts/src/model/repository/currency/OnlyPoundsCurrencyCodeRepository";
import {LocalUserStubRepository} from "../../lib/jbank-client-core/artifacts/src/model/repository/user/LocalUserStubRepository";

describe('TransferFormPresenter', () => {

  const receiver = new Profile('someone', 'someone@email.com');
  const transfer = new Transfer(receiver, 100.99, 'GBP');
  const accountTransaction = new AccountTransaction(1, transfer);

  let view: IMock<TransferFormView>;
  let model: IMock<UpdateAPositiveBalanceAccount>;
  let userRepository: UserRepository = new LocalUserStubRepository();
  let currencyRepository: CurrencyCodeRepository = new OnlyPoundsCurrencyCodeRepository();

  let underTest: TransferFormPresenter;

  beforeEach(() => {
    view = Mock.ofType<TransferFormView>();
    model = Mock.ofType<UpdateAPositiveBalanceAccount>();
    underTest = new TransferFormPresenter(view.object, model.object, userRepository, currencyRepository);
  });

  describe('when the model execution succeeds', () => {
    it('should ask the view to show success transfer made', async () => {
      model.setup(it => it.execute(accountTransaction)).returns(() => Promise.resolve());

      const result = await underTest.startTransferTo(receiver.name, receiver.email, '100.99');

      view.verify(it => it.showTransferSuccess(), Times.once());
    });
  });

  describe('when the model execution does not succeed', () => {
    it('should ask the view to show transfer not made error', async () => {
      model.setup(it => it.execute(accountTransaction)).returns(() => Promise.reject('Error'));

      await underTest.startTransferTo(receiver.name, receiver.email, '100.99');

      view.verify(it => it.showTransferError('Error'), Times.once());

    });
  });
});
