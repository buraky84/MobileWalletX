import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppHeader} from '../../components/AppHeader';
import {AppButton} from '../../components/AppButton';
import {Colors} from '../../consts/Colors';

const ImportWallet: React.FC<{navigation: any}> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <AppHeader onPressBack={() => navigation.goBack()}>
        Protect your wallet
      </AppHeader>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.importHeaderText}>Import your XDEFI wallet</Text>
        <Text style={styles.importOptionsText}>
          You can choose between 2 options
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          containerStyle={{
            marginTop: 15,
            backgroundColor: Colors.buttonBgColor1,
          }}
          onPress={() => navigation.navigate('ImportFromSeed')}>
          Import from seed
        </AppButton>
        <AppButton
          containerStyle={{
            marginTop: 15,
            backgroundColor: Colors.buttonBgColor1,
          }}
          onPress={() => navigation.navigate('ImportFromQR')}>
          Scan a QR Code
        </AppButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgColor2,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  importHeaderText: {color: Colors.textColor2, fontSize: 20, fontWeight: '700'},
  importOptionsText: {
    color: Colors.textColor1,
    fontSize: 16,
    fontWeight: '500',
    marginTop: 16,
  },
  buttonContainer: {flex: 1, justifyContent: 'flex-end', alignItems: 'center'},
});

export default ImportWallet;
