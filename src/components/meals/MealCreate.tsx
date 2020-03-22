import React from 'react';
import {Modal, View, Text, TouchableHighlight, TextInput} from 'react-native';

interface Props {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const MealCreate = (props: Props) => {
  return (
    <View>
      <Text>Create a meal</Text>
      <TextInput />
    </View>
  );
};

export default MealCreate;
