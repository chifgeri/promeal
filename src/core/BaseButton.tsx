import React, {SyntheticEvent, FunctionComponent} from 'react';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {StyleSheet, View} from 'react-native';

interface Props {
  onPress: (e?: SyntheticEvent) => void;
  style?: Object;
  primary?: boolean;
  secondary?: boolean;
}

const BaseButton: FunctionComponent<Props> = props => {
  return (
    <View>
      <TouchableHighlight
        onPress={props.onPress}
        style={[
          styles.button,
          props.style,
          props.primary && styles.primary,
          props.secondary && styles.secondary,
        ]}
        underlayColor="lightgrey">
        {props.children}
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 'auto',
    height: 'auto',
    borderTopEndRadius: 10,
    borderBottomStartRadius: 10,
    padding: 10,
  },
  primary: {
    backgroundColor: '#AFB42B',
  },
  secondary: {
    backgroundColor: '#6202EE',
  },
});

export default BaseButton;
