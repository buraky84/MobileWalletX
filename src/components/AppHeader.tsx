import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from '../consts/Colors';

type AppHeaderProps = {
  children: React.ReactNode;
  onPressBack?: () => void;
};

export const AppHeader: React.FC<AppHeaderProps> = props => {
  const {children, onPressBack} = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.leftButton} onPress={onPressBack}>
        <AntDesign name="left" color={Colors.light} size={18} />
      </TouchableOpacity>
      <View style={{justifyContent: 'center'}}>
        <Text style={styles.middleText}>{children}</Text>
      </View>
      <View style={{width: 44}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  leftButton: {
    width: 44,
    borderRadius: 8,
    backgroundColor: Colors.buttonBgColor1,
    padding: 12,
  },
  middleText: {color: Colors.light, fontSize: 16, fontWeight: '700'},
});
