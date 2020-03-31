import React, {FunctionComponent} from 'react';
import {TextInputAndroidProps, StyleSheet, TextInputProps} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

const BaseInput: FunctionComponent<TextInputProps> = props => {
  return <TextInput {...props} style={styles.inputStyle} />;
};

const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#ddd',
    paddingVertical: 4,
    shadowRadius: 10,
  },
});
export default BaseInput;
