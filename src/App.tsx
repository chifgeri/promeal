import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StatisticsPage from './components/statistics/StatisticsPage';
import SettingsPage from './components/settings/SettingsPage';
import MealStackScreen from './components/meals/MealsStack';

import {YellowBox} from 'react-native';
import {ConnectionContext, connect} from './core/database/ConnectionContext';
import {Connection} from 'typeorm';
import TrackerMainStack from './components/tracker/TrackerStack';

YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
  'Require cycle:',
]);

const Tab = createBottomTabNavigator();

const App = () => {
  const [connection, setConnection] = React.useState<Connection | null>(null);

  React.useEffect(() => {
    if (!connection) {
      connect().then(retVal => setConnection(retVal));
    }
  }, []);

  return (
    <ConnectionContext.Provider value={connection}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              switch (route.name) {
                case 'Meals':
                  iconName = 'food-croissant';
                  break;
                case 'Tracker':
                  iconName = 'ballot-outline';
                  break;
                case 'Statistics':
                  iconName = 'chart-line';
                  break;
                case 'Settings':
                  iconName = 'settings';
                  break;
                default:
                  iconName = 'warehouse';
              }

              return <Icon name={iconName} size={35} color={color} />;
            },
          })}
          tabBarOptions={{
            style: {
              height: 60,
            },
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen name="Meals" component={MealStackScreen} />
          <Tab.Screen name="Tracker" component={TrackerMainStack} />
          <Tab.Screen name="Statistics" component={StatisticsPage} />
          <Tab.Screen name="Settings" component={SettingsPage} />
        </Tab.Navigator>
      </NavigationContainer>
    </ConnectionContext.Provider>
  );
};

export default App;
