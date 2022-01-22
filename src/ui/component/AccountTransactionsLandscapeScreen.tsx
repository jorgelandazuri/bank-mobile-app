import * as React from "react";
import {View, StyleSheet, Alert} from "react-native";
import {EmailValidator} from "../../../lib/jbank-client-core/artifacts/src/util/validator/EmailValidator";
import {MoneyAmountValidator} from "../../../lib/jbank-client-core/artifacts/src/util/validator/MoneyAmountValidator";
import {UpdateAPositiveBalanceAccount} from "../../../lib/jbank-client-core/artifacts/src/model/domain/usecase/UpdateAPositiveBalanceAccount";
import {GetAccount} from "../../../lib/jbank-client-core/artifacts/src/model/domain/usecase/GetAccount";
import {TransferForm} from "./TransferForm";
import {NameValidator} from "../../../lib/jbank-client-core/artifacts/src/util/validator/NameValidator";
import {Account} from "../../../lib/jbank-client-core/artifacts/src/model/domain/entity/Account";
import {AccountSummary} from "./AccountSummary";
import {ComponentMViewP} from "../../../lib/jbank-client-core/artifacts/src/view/ComponentMViewP";
import {AccountTransactionsScreenPresenter} from "../../presentation/AccountTransactionsScreenPresenter";
import {AccountTransactionsScreenView} from "../view/AccountTransactionsScreenView";


export interface AccountTransactionsHorizontalProps {
  updateAccountUseCase: UpdateAPositiveBalanceAccount;
  getAccountUseCase: GetAccount;
}

interface AccountTransactionsHorizontalState {
  account: Account | undefined;
}

export class AccountTransactionsLandscapeScreen extends ComponentMViewP<AccountTransactionsScreenPresenter, AccountTransactionsHorizontalProps, AccountTransactionsHorizontalState>
  implements AccountTransactionsScreenView {

  constructor(props: Readonly<AccountTransactionsHorizontalProps>) {
    super(props);
    this.presenter = new AccountTransactionsScreenPresenter(this, this.props.getAccountUseCase);
    this.state = {
      account: undefined
    }
  }

  componentDidMount() {
    if (!this.state.account) {
      this._presenter.onStart();
    }
  }

  render() {
    return this.state.account ? (
      <View style={styles.container}>
        <View style={styles.sectionContainer}>
          <TransferForm
            onTransferCompleted={() => {
              this._presenter.onRefresh();
            }}
            onTransferNotCompleted={(error: string) => {
              this.showAccountFetchingError(error);
            }}
            onFormSubmitted={() => {}}
            nameValidator={new NameValidator()}
            emailValidator={new EmailValidator()}
            amountValidator={new MoneyAmountValidator()}
            usecase={this.props.updateAccountUseCase}
          />
        </View>
        <View style={styles.separator}/>
        <View style={styles.sectionContainer}>
          <AccountSummary
            account={this.state.account}/>
        </View>

      </View>) : <View/>
  }

  showAccount(account: Account): void {
    this.setState({account: account});
  }

  refreshOnTransactionDone(account: Account): void {
    this.setState({account: account}, () => {
      Alert.alert('Great!', 'Transfer successfully done.')
    });
  }

  showAccountFetchingError(error: string): void {
    Alert.alert('Error: ', error);
  }

}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 64
  },
  sectionContainer: {
    width: '40%',
    height: '100%'
  },
  separator: {
    width: 2,
    height: '100%',
    backgroundColor: '#E9EAF4'
  }
});
