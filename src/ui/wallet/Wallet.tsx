import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {AppHeader} from '../../components/AppHeader';
import {AppButton} from '../../components/AppButton';
import {Colors} from '../../consts/Colors';
import {
  contractTransaction,
  createWallet,
  exportKeystore,
  exportMnemonicFromKeystore,
  exportPrivateKeyFromKeystore,
  exportMnemonic,
  exportKeystoreFromMnemonic,
  exportPrivateKeyFromMnemonic,
  importKeystore,
  importMnemonic,
  importPrivateKey,
  getBalance,
  getContractBalance,
  getContractGasLimit,
  getContractNfts,
  getGasLimit,
  getGasPrice,
  getNonce,
  sendTransaction,
  signTransaction,
  signMessage,
  signTypedData,
  waitForContractTransaction,
  waitForTransaction,
  getContract,
  getSignerContract,
  getWalletSigner,
  getWalletSignerWithMnemonic,
  getWalletSignerWithPrivateKey,
  getSignerContractWithWalletProvider,
  bigNumberFormatUnits,
  bigNumberParseUnits,
} from 'react-native-web3-wallet';
import {providerAddr} from '../../consts/BlockchainInfo';
import {useInterval} from '../../hooks/useInterval';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../consts/GenericTypes';
import {WALLET_ACTIONS} from '../../redux/actionTypes';
import Octicons from 'react-native-vector-icons/Octicons';
import Toast from 'react-native-toast-message';
import Clipboard from '@react-native-clipboard/clipboard';
import {validateAmount, validateEthAddress} from '../../consts/Validation';

const Wallet: React.FC<{navigation: any}> = ({navigation}) => {
  const [sendAddress, setSendAddress] = useState('');
  const [sendAmount, setSendAmount] = useState('');

  const walletState = useSelector((state: RootState) => state.wallet);
  const {address, keystore, balance, lastTransactions} = walletState;
  const dispatch = useDispatch();

  const canSubmitSend =
    validateEthAddress(sendAddress) &&
    !!sendAmount &&
    parseFloat(sendAmount) > 0 &&
    validateAmount(sendAmount);

  useInterval(
    () => {
      getBalance(providerAddr, address)
        .then(res => {
          if (res) {
            dispatch({
              type: WALLET_ACTIONS.SET_BALANCE,
              payload: bigNumberFormatUnits(res, 18),
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    30000,
    true,
  );

  const onPressBack = () => {
    Alert.alert(
      'Want to exit?',
      'Leaving your wallet will clear wallet information and you will start over.',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'OK',
          onPress: () => navigation.navigate('Onboarding'),
        },
      ],
    );
  };

  const onPressCopyAddress = () => {
    Clipboard.setString(address);
    Toast.show({
      type: 'success',
      text1: 'Address copied to Clipboard',
    });
  };

  const onSendAddressChange = (val: string) => {
    if (val.trim().length >= 42) {
      !validateEthAddress(val) &&
        Toast.show({
          type: 'error',
          text1: 'Invalid ETH address',
        });
    }
    setSendAddress(val.trim());
  };

  const onPressPasteAddress = async () => {
    const text = await Clipboard.getString();
    onSendAddressChange(text.trim());
    Toast.show({
      type: 'success',
      text1: 'Address pasted from Clipboard',
    });
  };

  const onSendAmountChange = (val: string) => {
    if (validateAmount(val)) {
      setSendAmount(val);
    }
  };

  const onPressSend = () => {
    if (balance <= 0) {
      Toast.show({
        type: 'error',
        text1: "Can't send when your balance is 0",
      });
      return;
    }

    Alert.alert(
      'Confirm Transaction',
      `You want to send ${sendAmount} ETH to address ${sendAddress}`,
      [
        {
          text: 'Cancel',
        },
        {
          text: 'SEND',
          onPress: () => startTransaction(providerAddr),
        },
      ],
    );
  };

  const startTransaction = (providerAddr: string) => {
    const data = '0x'; //'0xhello world'
    const chainId = 5;

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
                          })
                          .catch(err => {
                            console.log(err);
                          });
                      })
                      .catch(err => {
                        console.log(err);
                      });
                  })
                  .catch(err => {
                    console.log(err);
                  });
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <AppHeader onPressBack={onPressBack}>Your Wallet</AppHeader>
      <KeyboardAwareScrollView
        keyboardOpeningTime={0}
        extraScrollHeight={5}
        contentContainerStyle={styles.contentContainer}>
        <Text style={styles.walletAddressHeader}>Wallet Address:</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput editable={false} style={styles.walletAddress}>
            {address}
          </TextInput>
          <TouchableOpacity
            style={{position: 'absolute', right: 16}}
            onPress={onPressCopyAddress}>
            <Octicons name="copy" color="#FFFFFF" size={16} />
          </TouchableOpacity>
        </View>
        <Text style={styles.balanceHeader}>Balance:</Text>
        <TextInput editable={false} style={styles.walletAddress}>
          {balance} ETH
        </TextInput>

        <View
          style={{
            marginTop: 5,
            maxHeight: 250,
            width: '100%',
            alignItems: 'center',
          }}>
          <Text style={styles.lastTransactionsHeader}>
            Last 10 Transactions:
          </Text>
          <FlatList
            keyExtractor={(item, index) => 'transaction' + index}
            data={lastTransactions}
            scrollEnabled={true}
            renderItem={({item}) => (
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: Colors.light}}>From: dasdasd</Text>
                <Text style={{color: Colors.light}}>To: dasdasd</Text>
                <Text style={{color: Colors.light}}>Amount: 0.5</Text>
              </View>
            )}
          />
        </View>
        <View style={{width: '100%', flex: 1, justifyContent: 'flex-end'}}>
          <Text style={styles.sendAssetHeader}>Send ETH Digital Asset</Text>
          <Text style={styles.sendAssetSubHeader}>Recipient Address:</Text>
          <View style={{...styles.sendAssetSubContainer, marginBottom: 20}}>
            <TextInput
              value={sendAddress}
              onChangeText={onSendAddressChange}
              style={styles.recipientAddressInput}
            />
            <TouchableOpacity
              style={{position: 'absolute', right: 16}}
              onPress={onPressPasteAddress}>
              <Octicons name="copy" color="#FFFFFF" size={16} />
            </TouchableOpacity>
          </View>
          <Text style={styles.sendAssetSubHeader}>Amount:</Text>
          <View style={styles.sendAssetSubContainer}>
            <TextInput
              value={sendAmount}
              keyboardType="numeric"
              onChangeText={onSendAmountChange}
              style={styles.sendAmountInput}
            />
          </View>
          <AppButton
            disabled={!canSubmitSend}
            containerStyle={{
              marginTop: 15,
              backgroundColor: !canSubmitSend
                ? Colors.buttonBgColor3
                : Colors.buttonBgColor2,
            }}
            onPress={onPressSend}>
            Send
          </AppButton>
        </View>
      </KeyboardAwareScrollView>
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
  contentContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginTop: 10,
    paddingHorizontal: 8,
  },
  walletAddressHeader: {
    color: Colors.light,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  walletAddress: {
    color: Colors.light,
    fontSize: 12,
    paddingVertical: 12,
    paddingLeft: 10,
    paddingRight: 40,
    backgroundColor: Colors.bgColor1,
    borderColor: Colors.borderColor1,
    borderWidth: 0.2,
    borderRadius: 8,
  },
  balanceHeader: {
    color: Colors.light,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 6,
  },
  balance: {
    color: Colors.light,
    fontSize: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: Colors.bgColor1,
    borderColor: Colors.borderColor1,
    borderWidth: 0.2,
    borderRadius: 8,
  },
  lastTransactionsHeader: {
    color: Colors.light,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 6,
  },
  sendAssetHeader: {
    color: Colors.light,
    fontSize: 15,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 20,
  },
  sendAssetSubHeader: {
    color: Colors.textColor1,
    fontSize: 14,
    fontWeight: '600',
  },
  sendAssetSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  recipientAddressInput: {
    flex: 1,
    color: Colors.light,
    fontSize: 12,
    paddingVertical: 12,
    paddingLeft: 10,
    paddingRight: 40,
    backgroundColor: Colors.bgColor1,
    borderColor: Colors.borderColor1,
    borderWidth: 0.2,
    borderRadius: 8,
  },
  sendAmountInput: {
    flex: 1,
    color: Colors.light,
    fontSize: 13,
    padding: 10,
    backgroundColor: Colors.bgColor1,
    borderColor: Colors.borderColor1,
    borderWidth: 0.2,
    borderRadius: 8,
  },
});

export default Wallet;
