import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {AppHeader} from '../../components/AppHeader';
import {AppButton} from '../../components/AppButton';
import {Colors} from '../../consts/Colors';

const Wallet: React.FC<{navigation: any}> = ({navigation}) => {
  useEffect(() => {

  }, []);

  return (
    <View style={styles.container}>
      <AppHeader onPressBack={() => navigation.goBack()}>Wallet</AppHeader>
      <View style={{alignItems: 'center', marginTop: 10}} />
      <View style={styles.bottomContainer}>
        <AppButton
          containerStyle={{
            marginTop: 15,
            backgroundColor: Colors.buttonBgColor3,
          }}
          onPress={() => navigation.navigate('')}>
          Next
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
  bottomContainer: {flex: 1, justifyContent: 'flex-end', alignItems: 'center'},
  secretContainer: {width: '100%', marginTop: 20},
  secretPhraseHeaderText: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.textColor1,
  },
  secretPhraseText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textColor3,
    marginBottom: 4,
  },
  seedInput: {
    height: 94,
    color: Colors.light,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.bgColor1,
    borderColor: Colors.borderColor1,
    borderWidth: 1,
    borderRadius: 8,
  },
});

export default Wallet;
