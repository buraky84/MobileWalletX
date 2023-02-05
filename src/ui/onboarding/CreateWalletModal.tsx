import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../consts/Colors';
import LottieView from 'lottie-react-native';
import {WALLET_ACTIONS} from '../../redux/actionTypes';
import {useDispatch} from 'react-redux';
import {createWallet} from 'react-native-web3-wallet';

const CreateWalletModal: React.FC<{navigation: any}> = ({navigation}) => {
  const [isWalletCreationTried, setIsWalletCreationTried] =
    React.useState(false);
  const [isWalletCreationSucceeded, setIsWalletCreationSucceeded] =
    React.useState(false);

  const initWalletResponse = {address: '', mnemonic: '', keystore: ''};
  type WalletResponse = typeof initWalletResponse;

  const [walletResponse, setWalletResponse] =
    useState<WalletResponse>(initWalletResponse);

  useEffect(() => {
    createWallet('password', "m/44'/60'/0'/0/0")
      .then(res => {
        console.log('createWalletResponse => ', res);
        if (res && res.address && res.mnemonic && res.keystore) {
          setWalletResponse({
            address: res.address,
            mnemonic: res.mnemonic.join(' '),
            keystore: JSON.stringify(res.keystore),
          });
          setIsWalletCreationSucceeded(true);
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setIsWalletCreationTried(true));
  }, []);

  const dispatch = useDispatch();

  const onWalletCreated = () => {
    dispatch({
      type: WALLET_ACTIONS.SET_WALLET_INFO,
      payload: {
        address: walletResponse.address,
        mnemonic: walletResponse.mnemonic,
        keystore: walletResponse.keystore,
      },
    });

    setTimeout(() => {
      navigation.goBack(null);
      navigation.navigate('Wallet');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {!isWalletCreationTried && (
        <View style={styles.subContainer}>
          <LottieView
            style={{width: 130}}
            source={require('../../assets/lottie/loading.json')}
            autoPlay
            loop={true}
          />
          <Text style={styles.infoText}>
            Hold on... We are creating your wallet! :)
          </Text>
        </View>
      )}
      {isWalletCreationTried &&
        (isWalletCreationSucceeded ? (
          <View style={styles.subContainer}>
            <LottieView
              style={{width: 130}}
              source={require('../../assets/lottie/success.json')}
              autoPlay
              loop={false}
              onAnimationFinish={onWalletCreated}
            />
            <Text style={styles.infoText}>
              Wallet Created in Blockchain... Redirecting to your wallet.
            </Text>
          </View>
        ) : (
          <View style={styles.subContainer}>
            <LottieView
              style={{width: 130}}
              source={require('../../assets/lottie/error.json')}
              autoPlay
              loop={false}
              onAnimationFinish={() =>
                setTimeout(() => {
                  navigation.goBack(null);
                  navigation.navigate('Onboarding');
                }, 2000)
              }
            />
            <Text style={styles.infoText}>
              Something went wrong :( Redirecting you to Onboarding!
            </Text>
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.bgColor1, padding: 20},
  subContainer: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  infoText: {
    color: Colors.light,
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default CreateWalletModal;
