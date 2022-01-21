import {StringValidator} from "../../../lib/jbank-client-core/artifacts/src/util/validator/StringValidator";
import * as React from "react";
import {Text, View, StyleSheet, TouchableOpacity, Alert} from "react-native";
import {TextField} from "react-native-material-textfield";
import {TransferFormView} from "../view/TransferFormView";
import {TransferFormPresenter} from "../../presentation/TransferFormPresenter";
import {UpdateAPositiveBalanceAccount} from "../../../lib/jbank-client-core/artifacts/src/model/domain/usecase/UpdateAPositiveBalanceAccount";
import {LocalUserStubRepository} from "../../../lib/jbank-client-core/artifacts/src/model/repository/user/LocalUserStubRepository";
import {OnlyPoundsCurrencyCodeRepository} from "../../../lib/jbank-client-core/artifacts/src/model/repository/currency/OnlyPoundsCurrencyCodeRepository";
import {ComponentMViewP} from "../../../lib/jbank-client-core/artifacts/src/view/ComponentMViewP";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

export interface TransferFormProps {
  onTransferCompleted() : void;

  onTransferNotCompleted(error: string): void;

  onFormSubmitted? :() => void;
  nameValidator: StringValidator;
  emailValidator: StringValidator;
  amountValidator: StringValidator;
  usecase: UpdateAPositiveBalanceAccount;
}

export interface TransferFormState {
  receiverName: string;
  validReceiverName: boolean;
  receiverEmail: string;
  validReceiverEmail: boolean;
  amount: string;
  validAmount: boolean
}

export class TransferForm extends ComponentMViewP<TransferFormPresenter, TransferFormProps, TransferFormState>
  implements TransferFormView {

  constructor(props: Readonly<TransferFormProps>) {
    super(props);
    this.presenter = new TransferFormPresenter(this, this.props.usecase, new LocalUserStubRepository(), new OnlyPoundsCurrencyCodeRepository());

    this.state = {
      receiverName: '',
      validReceiverName: true,
      receiverEmail: '',
      validReceiverEmail: true,
      amount: '',
      validAmount: true
    };
  }

  render() {
    const {receiverName, receiverEmail, amount} = this.state;
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          style={{backgroundColor: '#FFF'}}
          resetScrollToCoords={{x: 0, y: 0}}
          scrollEnabled={true}>
          <View style={styles.titleAndInputsContainer}>
            <Text style={styles.formTitle}>Send Money</Text>
            <TextField
              containerStyle={styles.inputContainer}
              label='Name'
              value={receiverName}
              textColor={'black'}
              onChangeText={(receiverName) => this.setState({receiverName})}
              onBlur={() => this.validateName()}
              error={this.getInputErrorMessageState(this.state.validReceiverName, 'name')}
              errorColor={'red'}
              tintColor={'#4B3CFA'}
            />
            <TextField
              containerStyle={styles.inputContainer}
              label='Email address'
              value={receiverEmail}
              textColor={'black'}
              onChangeText={(receiverEmail) => this.setState({receiverEmail})}
              onBlur={() => this.validateEmail()}
              error={this.getInputErrorMessageState(this.state.validReceiverEmail, 'email address')}
              errorColor={'red'}
              tintColor={'#4B3CFA'}
            />
            <TextField
              containerStyle={styles.inputContainer}
              label='Amount'
              value={amount}
              textColor={'black'}
              onChangeText={(amount) => this.setState({amount})}
              onBlur={() => this.validateAmount()}
              prefix={'£'}
              error={this.getInputErrorMessageState(this.state.validAmount, 'amount')}
              errorColor={'red'}
              tintColor={'#4B3CFA'}
            />
          </View>
        </KeyboardAwareScrollView>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.onFormSubmitted()}
          disabled={!this.isEveryInputValid()}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    );
  }

  onFormSubmitted() {
    this.props.onFormSubmitted();
    const {receiverName, receiverEmail, amount} = this.state;
    this._presenter.startTransferTo(receiverName, receiverEmail, amount);
  }

  showTransferError(error: string): void {
    this.props.onTransferNotCompleted(error);
  }

  showTransferSuccess(): void {
    this.props.onTransferCompleted();
  }

  private getInputErrorMessageState(valid: boolean, fieldContent: string): string {
    return valid ? '' : 'Please enter a valid ' + fieldContent;
  }

  private validateName() {
    const validReceiverName = this.props.nameValidator.validate(this.state.receiverName);
    this.setState({validReceiverName});
  }

  private validateEmail() {
    const validReceiverEmail = this.props.emailValidator.validate(this.state.receiverEmail);
    this.setState({validReceiverEmail});
  }

  private validateAmount() {
    const validAmount = this.props.amountValidator.validate(this.state.amount);
    this.setState({validAmount});
  }

  private isEveryInputValid(): boolean {
    const {receiverName, receiverEmail, amount, validAmount, validReceiverEmail, validReceiverName} = this.state;
    const notInitialEmptyState = receiverName.length > 0 && receiverEmail.length > 0 && amount.length > 0;
    return notInitialEmptyState && validReceiverName && validReceiverEmail && validAmount;
  }

}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  titleAndInputsContainer: {
    paddingTop: 36,
    width: '100%',
    flexDirection: 'column'
  },
  formTitle: {
    fontFamily: 'alverata-black',
    fontSize: 32,
    marginBottom: 16
  },
  inputContainer: {
    marginTop: 32
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
  }
});

