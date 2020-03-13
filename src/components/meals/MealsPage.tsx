import React from 'react';
import {View, Text} from 'react-native';
import MealCard from './MealCard';

const MealsPage = () => {
  return (
    <View style={{padding: 20}}>
      <Text>Meals</Text>
      <MealCard
        meal={{name: 'Spaghetti a la corona', ingredients: ['asdas']}}
      />
    </View>
  );
};

export default MealsPage;
