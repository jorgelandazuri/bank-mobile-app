import {MVPresenter} from "../../lib/jbank-client-core/artifacts/src/presentation/MVPresenter";
import {TransferFormView} from "../ui/view/TransferFormView";
import {UpdateAPositiveBalanceAccount} from "../../lib/jbank-client-core/artifacts/src/model/domain/usecase/UpdateAPositiveBalanceAccount";
import {AccountTransaction} from "../../lib/jbank-client-core/artifacts/src/model/domain/entity/AccountTransaction";
import {Transfer} from "../../lib/jbank-client-core/artifacts/src/model/domain/entity/Transfer";
import {Profile} from "../../lib/jbank-client-core/artifacts/src/model/domain/entity/Profile";
import {UserRepository} from "../../lib/jbank-client-core/artifacts/src/model/repository/user/UserRepository";
import {CurrencyCodeRepository} from "../../lib/jbank-client-core/artifacts/src/model/repository/currency/CurrencyCodeRepository";

export class TransferFormPresenter extends MVPresenter<TransferFormView, UpdateAPositiveBalanceAccount> {

  private readonly userRepository: UserRepository;
  private readonly currencyCodeRepository: CurrencyCodeRepository;

  constructor(view: TransferFormView,
              model: UpdateAPositiveBalanceAccount,
              userRepository: UserRepository,
              currencyCodeRepository: CurrencyCodeRepository) {
    super(view, model);
    this.userRepository = userRepository;
    this.currencyCodeRepository = currencyCodeRepository;
  }

  async startTransferTo(name: string, email: string, amount: string) {
    const transfer = new Transfer(new Profile(name, email), Number(amount), this.currencyCodeRepository.load());
    try {
      await this.model.execute(new AccountTransaction(this.userRepository.load().accountId, transfer));
      this.view.showTransferSuccess();
    } catch (r) {
      this.view.showTransferError(r);
    }
  }

}
