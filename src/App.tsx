import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MealsPage from './components/meals/MealsPage';
import TrackerPage from './components/tracker/TrackerPage';
import StatisticsPage from './components/statistics/StatisticsPage';
import SettingsPage from './components/settings/SettingsPage';

const Tab = createBottomTabNavigator();

 const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Meals" component={MealsPage} />
        <Tab.Screen name="Tracker" component={TrackerPage} />
        <Tab.Screen name="Statistics" component={StatisticsPage} />
        <Tab.Screen name="Settings" component={SettingsPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;