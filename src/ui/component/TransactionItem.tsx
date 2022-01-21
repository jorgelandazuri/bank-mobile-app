import * as React from "react";
import {TransferViewModel} from "../../../lib/jbank-client-core/artifacts/src/view/viewmodel/TransferViewModel";
import {Text, View, StyleSheet} from "react-native";

interface TransactionItemProps {
  transaction: TransferViewModel;
}

export const TransactionItem: React.SFC<TransactionItemProps> = (props) => {
  return (<View style={styles.container}>
    <View style={styles.receiverContainer}>
      <Text style={{fontSize: 16, paddingVertical: 8}}>{props.transaction.receiverName}</Text>
      <Text style={{fontSize: 14, paddingBottom: 6}}>{props.transaction.receiverEmail}</Text>
    </View>
    <Text style={{fontSize: 20, paddingVertical: 8}}>{props.transaction.amount}</Text>
  </View>);
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  receiverContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  }
});

