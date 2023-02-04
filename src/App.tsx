import React from 'react';
import {SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';
import store from './redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RNBootSplash from 'react-native-bootsplash';
import Onboarding from './ui/onboarding/Onboarding';
import ImportWallet from './ui/onboarding/ImportWallet';
import ImportFromSeed from './ui/onboarding/ImportFromSeed';
import ImportFromQR from './ui/onboarding/ImportFromQR';
import Wallet from './ui/wallet/Wallet';
import OnboardingResultModal from './ui/onboarding/OnboardingResultModal';
import CreateWalletModal from './ui/onboarding/CreateWalletModal';
import {React$Node} from './consts/GenericTypes';
import Toast from 'react-native-toast-message';
import TransactionModal from './ui/wallet/TransactionModal';

const Stack = createNativeStackNavigator();

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer
          onReady={() => RNBootSplash.hide({fade: true, duration: 1000})}>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen component={Onboarding} name="Onboarding" />
            <Stack.Screen component={ImportWallet} name="ImportWallet" />
            <Stack.Screen component={ImportFromSeed} name="ImportFromSeed" />
            <Stack.Screen component={ImportFromQR} name="ImportFromQR" />
            <Stack.Screen component={Wallet} name="Wallet" />
            <Stack.Group screenOptions={{presentation: 'fullScreenModal'}}>
              <Stack.Screen
                name="OnboardingResultModal"
                component={OnboardingResultModal}
              />
              <Stack.Screen
                name="CreateWalletModal"
                component={CreateWalletModal}
              />
            </Stack.Group>
            <Stack.Group
              screenOptions={{
                presentation: 'transparentModal',
                contentStyle: {backgroundColor: '#40404040'},
              }}>
              <Stack.Screen
                name="TransactionModal"
                component={TransactionModal}
              />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
