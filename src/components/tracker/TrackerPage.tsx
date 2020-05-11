import React from 'react';
import {View, Text} from 'react-native';

const TrackerPage = () => {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Text>{new Date().toDateString()}</Text>
    </View>
  );
};

export default TrackerPage;
