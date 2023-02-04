import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../consts/Colors';
import React, {useEffect} from 'react';
import LottieView from 'lottie-react-native';
import {
  bigNumberFormatUnits,
  getGasLimit,
  getGasPrice,
  getNonce,
  sendTransaction,
  signTransaction,
  waitForTransaction,
} from 'react-native-web3-wallet';
import {providerAddr, chainId} from '../../consts/BlockchainInfo';

const TransactionModal: React.FC<{route: any; navigation: any}> = ({
  route,
  navigation,
}) => {
  const [isTransactionFailed, setIsTransactionFailed] = React.useState(false);
  const [isTransactionSucceeded, setIsTransactionSucceeded] =
    React.useState(false);

  const {address, sendAddress, sendAmount, keystore} = route?.params;

  useEffect(() => {
    startTransaction();
  }, []);

  const startTransaction = () => {
    const data = '0x';

    getGasPrice(providerAddr)
      .then(gasPrice => {
        console.log('gasPrice', gasPrice.toString());
        getGasLimit(providerAddr, address, sendAddress, sendAmount, data)
          .then(gasLimit => {
            console.log('gasLimit', gasLimit.toString());
            console.log('gas', bigNumberFormatUnits(gasPrice.mul(gasLimit)));

            getNonce(providerAddr, address)
              .then(nonce => {
                console.log('nonce', nonce);
                signTransaction(
                  JSON.stringify(keystore),
                  'password',
                  nonce,
                  gasLimit,
                  gasPrice,
                  sendAddress,
                  chainId,
                  sendAmount,
                  data,
                )
                  .then(signedTx => {
                    console.log('signedTx', signedTx);
                    sendTransaction(providerAddr, signedTx)
                      .then(resTx => {
                        console.log(resTx);
                        waitForTransaction(providerAddr, resTx.hash)
                          .then(res => {
                            console.log(res);
                            if (res && res.confirmations > 0) {
                              setIsTransactionSucceeded(true);
                            }
                          })
                          .catch(err => {
                            setIsTransactionFailed(true);
                            console.log(err);
                          });
                      })
                      .catch(err => {
                        setIsTransactionFailed(true);
                        console.log(err);
                      });
                  })
                  .catch(err => {
                    setIsTransactionFailed(true);
                    console.log(err);
                  });
              })
              .catch(err => {
                setIsTransactionFailed(true);
                console.log(err);
              });
          })
          .catch(err => {
            setIsTransactionFailed(true);
            console.log(err);
          });
      })
      .catch(err => {
        setIsTransactionFailed(true);
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      {!isTransactionFailed && !isTransactionSucceeded && (
        <View style={styles.subContainer}>
          <LottieView
            style={{width: 130}}
            source={require('../../assets/lottie/send.json')}
            autoPlay
            loop={true}
          />
          <Text style={styles.infoText}>Processing your transaction...</Text>
        </View>
      )}
      {isTransactionFailed && (
        <View style={styles.subContainer}>
          <LottieView
            style={{width: 130}}
            source={require('../../assets/lottie/error.json')}
            autoPlay
            loop={false}
            onAnimationFinish={() => navigation.goBack(null)}
          />
          <Text style={styles.infoText}>Error occured :( Please re-try or contact support!</Text>
        </View>
      )}
      {isTransactionSucceeded && (
        <View style={styles.subContainer}>
          <LottieView
            style={{width: 130}}
            source={require('../../assets/lottie/success.json')}
            autoPlay
            loop={false}
            onAnimationFinish={() => navigation.goBack(null)}
          />
          <Text style={styles.infoText}>Transaction completed successfully</Text>
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
});

export default TransactionModal;
