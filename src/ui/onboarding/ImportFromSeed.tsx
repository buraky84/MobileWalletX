import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {AppHeader} from '../../components/AppHeader';
import {AppButton} from '../../components/AppButton';
import Octicons from 'react-native-vector-icons/Octicons';
import {Colors} from '../../consts/Colors';
import {validateSeedText} from '../../consts/Validation';

const ImportFromSeed: React.FC<{navigation: any}> = ({navigation}) => {
  const [seedText, setSeedText] = useState('');

  const pasteFromClipboard = async () => {
    const text = await Clipboard.getString();
    seedTestUpdate(text);
  };

  const seedTestUpdate = (text: string) => {
    const result = validateSeedText(text);
    result && setSeedText(result);
  };

  return (
    <View style={styles.container}>
      <AppHeader onPressBack={() => navigation.goBack()}>
        Import from seed
      </AppHeader>
      <View style={{alignItems: 'center', marginTop: 10}}>
        <Text style={styles.secretPhraseHeaderText}>
          Enter your secret phrase
        </Text>
        <View style={styles.secretContainer}>
          <Text style={styles.secretPhraseText}>SECRET PHRASE</Text>
          <TextInput
            value={seedText}
            onChangeText={seedTestUpdate}
            style={styles.seedInput}
            multiline
            numberOfLines={4}
          />
        </View>
        <AppButton
          containerStyle={{
            marginTop: 15,
            backgroundColor: Colors.buttonBgColor1,
          }}
          onPress={pasteFromClipboard}>
          <Octicons name="copy" color="#FFFFFF" size={15} />
          {'  Paste from clipboard'}
        </AppButton>
      </View>
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

export default ImportFromSeed;
