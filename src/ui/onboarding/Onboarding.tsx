import React from 'react';
import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import {openLink} from '../../services/LinkingService';
import {AppButton} from '../../components/AppButton';
import {Colors} from '../../consts/Colors';
import {Links} from '../../consts/Links';

const Onboarding: React.FC<{navigation: any}> = ({navigation}) => {
  const onCreateNewWallet = () => {
    Alert.alert(
      'Want to Create new Wallet?',
      'This will immediately create a new wallet! You may also import your existing wallet if you already have one!',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'OK',
          onPress: () => navigation.navigate('CreateWalletModal'),
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image
          source={require('../../assets/xdefi_logo.png')}
          style={{maxHeight: 150}}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={{flex: 1, marginVertical: 32, marginHorizontal: 16}}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.welcomeText}>Welcome to XDEFI wallet</Text>
            <Text style={styles.onboardText}>Let's get you on board!</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Text style={styles.proceedText}>
              By proceeding, you agree to XDEFI{' '}
              <Text
                style={{color: Colors.linkColor}}
                onPress={() => openLink(Links.termsCondition)}>
                Terms
              </Text>{' '}
              and{' '}
              <Text
                style={{color: Colors.linkColor}}
                onPress={() => openLink(Links.privacyPolicy)}>
                Privacy policy
              </Text>
            </Text>

            <AppButton
              containerStyle={{marginTop: 15}}
              onPress={onCreateNewWallet}>
              Create a new wallet
            </AppButton>
            <AppButton
              containerStyle={{
                marginTop: 15,
                backgroundColor: Colors.buttonBgColor1,
              }}
              onPress={() => navigation.navigate('ImportWallet')}>
              Import a wallet
            </AppButton>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.bgColor1},
  topContainer: {alignItems: 'center', marginVertical: 50},
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.bgColor2,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  welcomeText: {color: Colors.textColor2, fontSize: 20, fontWeight: '700'},
  onboardText: {
    color: Colors.textColor1,
    fontSize: 16,
    fontWeight: '500',
    marginTop: 16,
  },
  proceedText: {
    color: Colors.textColor1,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
});

export default Onboarding;
