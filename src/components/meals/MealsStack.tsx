import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MealsPage from './MealsPage';
import MealCreate from './MealCreate';

const MealStack = createStackNavigator();
const headerOptions = {
  headerStyle: {
    backgroundColor: '#AFB42B',
  },
  headerTintColor: '#fff',
};

const MealMainStack = () => {
  return (
    <MealStack.Navigator>
      <MealStack.Screen
        options={{...headerOptions}}
        name="Meals"
        component={MealsPage}
      />
    </MealStack.Navigator>
  );
};

const RootStack = createStackNavigator();

/* This Stack is needed to display "modal" window for creation form */
const MealStackScreen = () => {
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="Meal"
        component={MealMainStack}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="MealCreate"
        component={MealCreate}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
};

export default MealStackScreen;
