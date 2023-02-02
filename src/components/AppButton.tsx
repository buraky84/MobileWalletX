import React from 'react';
import {StyleSheet, Text, TextStyle, TouchableOpacity} from 'react-native';
import {Colors} from '../consts/Colors';

type AppButtonProps = {
  disabled?: boolean;
  containerStyle?: TextStyle;
  children: React.ReactNode;
  onPress?: () => void;
};

export const AppButton: React.FC<AppButtonProps> = props => {
  const {disabled, containerStyle, children, onPress} = props;

  return (
    <TouchableOpacity
      disabled={disabled}
      style={{
        ...styles.container,
        ...containerStyle,
      }}
      onPress={onPress}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors.buttonBgColor2,
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.light,
    textAlign: 'center',
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: '500',
  },
});
