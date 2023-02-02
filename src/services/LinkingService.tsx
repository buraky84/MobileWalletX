import {Alert, Linking} from 'react-native';

export const openLink = async (url: string) => {
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert(`Can't open URL: ${url}`);
  }
};
