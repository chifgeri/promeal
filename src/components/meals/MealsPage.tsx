import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import MealCard from './MealCard';
import MealList from './MealList';
import {Meal} from 'src/data/meals.dto';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

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
  const navigation = useNavigation();
  return (
    <>
      {/* Search bar */}
      <MealList
        removeItem={id => setMeals(meals.filter(item => item.key !== id))}
        meals={meals}
      />
      <TouchableHighlight
        onPress={() => {
          navigation.navigate('MealCreate');
        }}
        style={styles.button}
        underlayColor="green">
        <Icon name="add" size={32} color="white" />
      </TouchableHighlight>
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
  button: {
    position: 'absolute',
    zIndex: 100,
    bottom: 16,
    left: 16,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#AFB42B',
    width: 'auto',
    borderTopEndRadius: 10,
    borderBottomStartRadius: 10,
    padding: 10,
  },
});

export default MealsPage;
