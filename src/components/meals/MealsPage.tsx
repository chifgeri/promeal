import React, {useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import MealCard from './MealCard';
import MealList from './MealList';
import {Meal} from 'src/data/meals.dto';

const mealsArray = [
  {
    key: 1,
    name: 'Spaghetti a la corona as',
    ingredients: [
      {
        key: 1,
        name: 'Tomato',
        nutrients: [{key: 11, nutrient: 'Prot.', quantity: '50g'}],
      },
    ],
  },

  {
    key: 2,
    name: 'Pizza sültkrumpli',
    ingredients: [
      {
        key: 1,
        name: 'Tomato',
        nutrients: [{key: 21, nutrient: 'Prot.', quantity: '50g'}],
      },
      {
        key: 2,
        name: 'Krumpli',
        nutrients: [{key: 22, nutrient: 'CH.', quantity: '150g'}],
      },
    ],
  },
  {
    key: 3,
    name: 'Pizza sültkrumpli',
    ingredients: [
      {
        key: 1,
        name: 'Tomato',
        nutrients: [{key: 21, nutrient: 'Prot.', quantity: '50g'}],
      },
      {
        key: 2,
        name: 'Krumpli',
        nutrients: [{key: 22, nutrient: 'CH.', quantity: '150g'}],
      },
    ],
  },
  {
    key: 4,
    name: 'Pizza sültkrumpli',
    ingredients: [
      {
        key: 1,
        name: 'Tomato',
        nutrients: [{key: 21, nutrient: 'Prot.', quantity: '50g'}],
      },
      {
        key: 2,
        name: 'Krumpli',
        nutrients: [{key: 22, nutrient: 'CH.', quantity: '150g'}],
      },
    ],
  },
];

const MealsPage = () => {
  const [meals, setMeals] = useState<Meal[]>(mealsArray);
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Meals</Text>
        {/* Search bar */}
      </View>
      <MealList
        removeItem={id => setMeals(meals.filter(item => item.key !== id))}
        meals={meals}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
  },
});

export default MealsPage;
