import * as React from 'react';
import {AsyncStorage, Platform, StyleSheet, View} from 'react-native';
import {UpdateAPositiveBalanceAccount} from "./lib/jbank-client-core/artifacts/src/model/domain/usecase/UpdateAPositiveBalanceAccount";
import {AccountSummaryLocalDBService} from "./lib/jbank-client-core/artifacts/src/model/service/AccountSummaryLocalDBService";
import {AccountUpdateLocalDBService} from "./lib/jbank-client-core/artifacts/src/model/service/AccountUpdateLocalDBService";
import {RemoteUserAccountRepository} from "./lib/jbank-client-core/artifacts/src/model/repository/account/RemoteUserAccountRepository";
import {AsyncStorageUserAccountCache} from "./src/model/AsyncStorageUserAccountCache";
import {CachedUserAccountRepository} from "./lib/jbank-client-core/artifacts/src/model/repository/account/CachedUserAccountRepository";
import {GetAccount} from "./lib/jbank-client-core/artifacts/src/model/domain/usecase/GetAccount";
import {LocalUserStubRepository} from "./lib/jbank-client-core/artifacts/src/model/repository/user/LocalUserStubRepository";
import {FetchNetworkClient} from "./lib/jbank-client-core/artifacts/src/model/network/FetchNetworkClient";
import {GetAccountFromHttpLocalDBRequestFactory} from "./lib/jbank-client-core/artifacts/src/model/network/GetAccountFromHttpLocalDBRequestFactory";
import {UpdateAccountToHttpLocalDBRequestFactory} from "./lib/jbank-client-core/artifacts/src/model/network/UpdateAccountToHttpLocalDBRequestFactory";
import {AccountTransactionsScene} from "./src/ui/component/AccountTransactionsScene";
import {AccountNetworkAdapter} from "./lib/jbank-client-core/artifacts/src/model/service/adapter/AccountNetworkAdapter";


export default class App extends React.Component<{}> {

  private readonly updateAccountUseCase: UpdateAPositiveBalanceAccount;
  private readonly getAccountUseCase: GetAccount;

  constructor(props: Readonly<{}>) {
    super(props);
    const asyncStorageUserAccountCache = new AsyncStorageUserAccountCache(AsyncStorage);
    const fetchNetworkClient = new FetchNetworkClient();
    const localhost: string = Platform.OS === 'ios' ? 'http://localhost:3000/' : 'http://10.0.2.2:3000/';
    const getRequestFactory = new GetAccountFromHttpLocalDBRequestFactory(localhost);
    const accountSummaryLocalDBService = new AccountSummaryLocalDBService(fetchNetworkClient, getRequestFactory, new AccountNetworkAdapter());
    const updateRequestFactory = new UpdateAccountToHttpLocalDBRequestFactory(localhost);
    const accountUpdateLocalDBService = new AccountUpdateLocalDBService(fetchNetworkClient, updateRequestFactory);
    const remoteUserAccountRepository = new RemoteUserAccountRepository(accountSummaryLocalDBService, accountUpdateLocalDBService);
    const cachedUserAccountRepository = new CachedUserAccountRepository(remoteUserAccountRepository, asyncStorageUserAccountCache);
    this.updateAccountUseCase = new UpdateAPositiveBalanceAccount(cachedUserAccountRepository, remoteUserAccountRepository);
    this.getAccountUseCase = new GetAccount(new LocalUserStubRepository(), cachedUserAccountRepository);
  }

  render() {
    return <View style={styles.container}>
      <AccountTransactionsScene
        updateAccountUseCase={this.updateAccountUseCase}
        getAccountUseCase={this.getAccountUseCase} />
    </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
