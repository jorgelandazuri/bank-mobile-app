import {ComponentMViewP} from "../../../lib/jbank-client-core/artifacts/src/view/ComponentMViewP";
import {AccountSummaryPresenter} from "../../presentation/AccountSummaryPresenter";
import {AccountSummaryView} from "../view/AccountSummaryView";
import * as React from "react";
import {AccountViewModel} from "../../../lib/jbank-client-core/artifacts/src/view/viewmodel/AccountViewModel";
import {Account} from "../../../lib/jbank-client-core/artifacts/src/model/domain/entity/Account";
import {FlatList, StyleSheet, Text, View} from "react-native";
import {AccountViewModelAdapter} from "../../../lib/jbank-client-core/artifacts/src/view/adapter/AccountViewModelAdapter";
import {MoneyAdapter} from "../../../lib/jbank-client-core/artifacts/src/view/adapter/MoneyAdapter";
import {TransferViewModelAdapter} from "../../../lib/jbank-client-core/artifacts/src/view/adapter/TransferViewModelAdapter";
import PieChart from 'react-native-pie-chart';
import {TransactionItem} from "./TransactionItem";

export interface AccountSummaryProps {
  account: Account;
}

export interface AccountSummaryState {
  accountViewModel: AccountViewModel | undefined;
}

export class AccountSummary extends ComponentMViewP<AccountSummaryPresenter, AccountSummaryProps, AccountSummaryState>
  implements AccountSummaryView {


  constructor(props: Readonly<AccountSummaryProps>) {
    super(props);
    this.state = {
      accountViewModel: undefined
    };
    const moneyAdapter = new MoneyAdapter();
    const transferAdapter = new TransferViewModelAdapter(moneyAdapter);
    this.presenter = new AccountSummaryPresenter(this, new AccountViewModelAdapter(moneyAdapter, transferAdapter));
  }

  componentDidMount() {
    this._presenter.onStart(this.props.account);
  }

  render() {
    return (this.state.accountViewModel ? this.renderAccountSummary(this.state.accountViewModel) : <View/>)
  }

  private renderAccountSummary(accountViewModel: AccountViewModel) {
    let account = this.props.account;
    const pieChartSeries = [account.currentBalance, account.totalSent];
    return (
      <View style={styles.container}>
        <Text style={styles.formTitle}>My account</Text>
        <View style={styles.accountBalanceContainer}>
          <View style={styles.balanceTextContainer}>
            <Text style={{fontSize: 20}}>{accountViewModel.totalSent}</Text>
            <Text style={{fontSize: 18}}>total sent</Text>
          </View>
          <View style={{marginHorizontal: 4, alignItems: 'center'}}>
            <PieChart
              chart_wh={96}
              series={pieChartSeries}
              sliceColor={['#FFB428', '#EAEAEE']}
              doughnut={true}
              coverRadius={0.60}
              coverFill={'#FFF'}
            />
          </View>
          <View style={styles.balanceTextContainer}>
            <Text style={{fontSize: 20}}>{accountViewModel.currentBalance}</Text>
            <Text style={{fontSize: 18}}>available</Text>
          </View>
        </View>
        <View style={styles.transactionsContainer}>
          <Text style={styles.transactionsTitle}>Transactions</Text>
          <FlatList
            ItemSeparatorComponent={this.renderSeparator}
            data={this.state.accountViewModel.transfers}
            renderItem={({item}) => (
              <TransactionItem
                transaction={item}/>
            )}
            keyExtractor={(item) => String(item.receiverEmail)}
          />
        </View>
      </View>
    )
  }

  showAccountSummary(accountView: AccountViewModel): void {
    this.setState({accountViewModel: accountView})
  }

  renderSeparator() {
    return (
      <View style={{height: 1, width: '100%', paddingHorizontal: 16, backgroundColor: '#E9EAF4'}}/>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  formTitle: {
    fontFamily: 'alverata-black',
    fontSize: 32,
    marginBottom: 16
  },
  accountBalanceContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  balanceTextContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  transactionsContainer: {
    width: '100%',
    height: '45%',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  transactionsTitle: {
    fontFamily: 'alverata-black',
    fontSize: 20,
    marginBottom: 16
  },
});

