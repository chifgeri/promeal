import React from 'react';
import {View, Text} from 'react-native';
import MealCard from './MealCard';

const MealsPage = () => {
  return (
    <View style={{padding: 20}}>
      <Text>Meals</Text>
      <MealCard
        meal={{
          key: 1,
          name: 'Spaghetti a la corona as',
          ingredients: [
            {
              key: 1,
              name: 'Tomato',
              nutrients: [{key: 1, nutrient: 'Prot.', quantity: '50g'}],
            },
          ],
        }}
      />
    </View>
  );
};

export default MealsPage;
