import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TrackerPage from './TrackerPage';

const TrackerStack = createStackNavigator();
const headerOptions = {
  headerStyle: {
    backgroundColor: '#AFB42B',
  },
  headerTintColor: '#fff',
};

const TrackerMainStack = () => {
  return (
    <TrackerStack.Navigator>
      <TrackerStack.Screen
        options={{...headerOptions}}
        name="Tracker"
        component={TrackerPage}
      />
    </TrackerStack.Navigator>
  );
};

export default TrackerMainStack;
