import * as React from "react";
import {Dimensions, View} from "react-native";
import {DeviceTypeAndOrientation} from "../../util/DeviceTypeAndOrientation";
import {AccountTransactionsLandscapeScreen} from "./AccountTransactionsLandscapeScreen";
import {AccountTransactionsPortraitScreen} from "./AccountTransactionsPortraitScreen";
import {Font} from "expo";
import {UpdateAPositiveBalanceAccount} from "../../../lib/jbank-client-core/artifacts/src/model/domain/usecase/UpdateAPositiveBalanceAccount";
import {GetAccount} from "../../../lib/jbank-client-core/artifacts/src/model/domain/usecase/GetAccount";

export interface AccountTransactionsSceneProps {
  updateAccountUseCase: UpdateAPositiveBalanceAccount;
  getAccountUseCase: GetAccount;
}

interface AccountTransactionsSceneState {
  showLandscapeMode: boolean;
  resourcesLoaded: boolean
}

export class AccountTransactionsScene extends React.Component<AccountTransactionsSceneProps, AccountTransactionsSceneState> {

  private readonly fontToLoad: any;

  constructor(props: Readonly<AccountTransactionsSceneProps>) {
    super(props);
    this.state = {
      showLandscapeMode: this.shouldShowLandscapeMode(),
      resourcesLoaded: false
    };
    this.fontToLoad = require('../../../fonts/alverata-black.otf');
    Dimensions.addEventListener('change', () => {
      this.setState({
        showLandscapeMode: this.shouldShowLandscapeMode()
      });
    });
  }

  async componentDidMount() {
    if (!this.state.resourcesLoaded) {
      await Font.loadAsync({'alverata-black': this.fontToLoad});
      this.setState({resourcesLoaded: true});
    }
  }

  render() {
    return this.state.resourcesLoaded ? this.renderAccountTransactionsScreen() : <View/>
  }

  private renderAccountTransactionsScreen() {
    let updateAccountUseCase = this.props.updateAccountUseCase;
    let getAccountUseCase = this.props.getAccountUseCase;
    return this.state.showLandscapeMode
      ? <AccountTransactionsLandscapeScreen getAccountUseCase={getAccountUseCase}
                                            updateAccountUseCase={updateAccountUseCase}/>
      : <AccountTransactionsPortraitScreen getAccountUseCase={getAccountUseCase}
                                           updateAccountUseCase={updateAccountUseCase}/>;
  }

  private shouldShowLandscapeMode(): boolean {
    return DeviceTypeAndOrientation.isTablet() && DeviceTypeAndOrientation.isLandscape();
  }

}
