import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {Colors} from '../../consts/Colors';
import {useDispatch} from 'react-redux';
import {WALLET_ACTIONS} from '../../redux/actionTypes';
import {importMnemonic} from 'react-native-web3-wallet';

const OnboardingResultModal: React.FC<{route: any; navigation: any}> = ({
  route,
  navigation,
}) => {
  const [isSeedAnimationCompleted, setIsSeedAnimationCompleted] =
    React.useState(false);
  const [isWalletQueried, setIsWalletQueried] = React.useState(false);
  const [isWalletConfirmed, setIsWalletConfirmed] = React.useState(false);

  const initWalletResponse = {address: '', mnemonic: '', keystore: ''};
  type WalletResponse = typeof initWalletResponse;

  const [walletResponse, setWalletResponse] =
    useState<WalletResponse>(initWalletResponse);

  const {seed} = route?.params;
  const dispatch = useDispatch();

  const onSeedAnimationCompleted = () => {
    setIsSeedAnimationCompleted(true);
    setTimeout(() => {
      importMnemonic(seed, 'password')
        .then(res => {
          console.log('importWalletResponse => ', res);
          if (res && res.address && res.mnemonic && res.keystore) {
            setWalletResponse({
              address: res.address,
              mnemonic: res.mnemonic.join(' '),
              keystore: JSON.stringify(res.keystore),
            });
            setIsWalletConfirmed(true);
          }
        })
        .catch(err => {
          setIsWalletQueried(true);
          console.log('wallet err => ', err);
        })
        .finally(() => setIsWalletQueried(true));
    }, 4000);
  };

  const onWalletConfirmed = () => {
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
      {!isSeedAnimationCompleted && (
        <View style={styles.subContainer}>
          <LottieView
            style={{width: 130}}
            source={require('../../assets/lottie/success.json')}
            autoPlay
            loop={false}
            onAnimationFinish={() => {
              onSeedAnimationCompleted();
            }}
          />
          <Text style={styles.infoText}>Seed Phrade Detected...</Text>
          <View style={styles.seedContainer}>
            <Text style={styles.seedText}>{seed}</Text>
          </View>
        </View>
      )}
      {isSeedAnimationCompleted && !isWalletQueried && !isWalletConfirmed && (
        <View style={styles.subContainer}>
          <LottieView
            style={{width: 160}}
            source={require('../../assets/lottie/loading.json')}
            autoPlay
            loop={true}
          />
          <Text style={styles.infoText}>
            Confirming wallet identity via ETH network...
          </Text>
        </View>
      )}
      {isWalletQueried && isWalletConfirmed && (
        <View style={styles.subContainer}>
          <LottieView
            style={{width: 130}}
            source={require('../../assets/lottie/success.json')}
            autoPlay
            loop={false}
            onAnimationFinish={onWalletConfirmed}
          />
          <Text style={styles.infoText}>
            Wallet Confirmed in Blockchain... Redirecting to your wallet.
          </Text>
        </View>
      )}
      {isWalletQueried && !isWalletConfirmed && (
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
            Invalid wallet seed! Redirecting you to Onboarding!
          </Text>
        </View>
      )}
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
  seedContainer: {marginVertical: 8, paddingHorizontal: 40},
  seedText: {
    fontSize: 12,
    color: Colors.light,
    textAlign: 'center',
  },
});

export default OnboardingResultModal;
