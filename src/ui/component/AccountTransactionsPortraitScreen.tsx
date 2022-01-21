import * as React from "react";
import {NameValidator} from "../../../lib/jbank-client-core/artifacts/src/util/validator/NameValidator";
import {EmailValidator} from "../../../lib/jbank-client-core/artifacts/src/util/validator/EmailValidator";
import {MoneyAmountValidator} from "../../../lib/jbank-client-core/artifacts/src/util/validator/MoneyAmountValidator";
import {TransferForm} from "./TransferForm";
import {UpdateAPositiveBalanceAccount} from "../../../lib/jbank-client-core/artifacts/src/model/domain/usecase/UpdateAPositiveBalanceAccount";
import {GetAccount} from "../../../lib/jbank-client-core/artifacts/src/model/domain/usecase/GetAccount";
import {
  Alert, Image,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import {AccountTransactionsHorizontalProps} from "./AccountTransactionsLandscapeScreen";
import {Account} from "../../../lib/jbank-client-core/artifacts/src/model/domain/entity/Account";
import {AccountSummary} from "./AccountSummary";
import {ComponentMViewP} from "../../../lib/jbank-client-core/artifacts/src/view/ComponentMViewP";
import {AccountTransactionsScreenPresenter} from "../../presentation/AccountTransactionsScreenPresenter";
import {AccountTransactionsScreenView} from "../view/AccountTransactionsScreenView";

export interface AccountTransactionsPortraitProps {
  updateAccountUseCase: UpdateAPositiveBalanceAccount;
  getAccountUseCase: GetAccount;
}

interface AccountTransactionsPortraitState {
  account: Account | undefined;
  modalVisible: boolean
}

const closeModalImg = require('../../../image/cross.png');

export class AccountTransactionsPortraitScreen extends ComponentMViewP<AccountTransactionsScreenPresenter, AccountTransactionsPortraitProps, AccountTransactionsPortraitState>
  implements AccountTransactionsScreenView {

  constructor(props: Readonly<AccountTransactionsHorizontalProps>) {
    super(props);
    this.presenter = new AccountTransactionsScreenPresenter(this, this.props.getAccountUseCase);
    this.state = {
      account: undefined,
      modalVisible: false
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
        <View style={styles.accountSummaryContainer}>
          <AccountSummary
            account={this.state.account}/>
        </View>
        <TouchableHighlight
          style={styles.button}
          onPress={() => this.setState({modalVisible: true})}>
          <Text style={styles.buttonText}>New transaction</Text>
        </TouchableHighlight>
        <Modal
          presentationStyle={'fullScreen'}
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
          }}>
          <View style={styles.modalFormContainer}>
            <TransferForm
              onTransferCompleted={() => {
                this._presenter.onRefresh();
              }}
              onTransferNotCompleted={(error: string) => {
                this.showAccountFetchingError(error);
              }}
              onFormSubmitted={
                () => {
                  this.setState({modalVisible: false})
                }
              }
              nameValidator={new NameValidator()}
              emailValidator={new EmailValidator()}
              amountValidator={new MoneyAmountValidator()}
              usecase={this.props.updateAccountUseCase}
            />
            <TouchableHighlight
              underlayColor={'white'}
              style={styles.closeModalImgContainer}
              onPress={() => this.setState({modalVisible: false})}>
              <Image source={closeModalImg} style={styles.closeModalImg}/>
            </TouchableHighlight>
          </View>
        </Modal>
      </View>
    ) : <View/>
  }

  showAccount(account: Account): void {
    this.setState({account: account});
  }

  refreshOnTransactionDone(account: Account): void {
    setTimeout(() => {
      Alert.alert(
        'Great!',
        'Transfer successfully done.',
        [
          {text: 'OK', onPress: () => {this.setState({account: account});}},
        ],
        { cancelable: false }
      )
    }, 1000);
  }

  showAccountFetchingError(error: string): void {
    setTimeout(() => { Alert.alert('Error: ', error); }, 1500);
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    width: '100%',
    height: '100%',
    padding: 24,
  },
  accountSummaryContainer: {
    width: '100%',
    height: '85%',
  },
  modalFormContainer: {
    width: '100%',
    height: '100%',
    padding: 32
  },
  buttonText: {
    fontSize: 18,
    color: 'white'
  },
  button: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#4B3CFA'
  },
  closeModalImgContainer: {
    position: 'absolute',
    right: 16,
    top: 32,
    width: 32,
    height: 32
  },
  closeModalImg: {
    width: '100%',
    height: '100%'
  }
});
