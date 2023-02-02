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

const Stack = createNativeStackNavigator();

const App: () => JSX.Element = () => {
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
            <Stack.Group screenOptions={{presentation: 'modal'}}>
              {/*<Stack.Screen name="Login" component={LoginModal} />*/}
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
};

export default App;
