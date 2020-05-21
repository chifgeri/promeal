import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import StatisticsPage from './StatisticsPage';

const StatisticsStack = createStackNavigator();

const headerOptions = {
  headerStyle: {
    backgroundColor: '#AFB42B',
  },
  headerTintColor: '#fff',
};

const StatisticsMainStack = () => {
  return (
    <StatisticsStack.Navigator>
      <StatisticsStack.Screen
        options={{...headerOptions}}
        name="Statistics"
        component={StatisticsPage}
      />
    </StatisticsStack.Navigator>
  );
};

export default StatisticsMainStack;
