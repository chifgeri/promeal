import React, {useState} from 'react';
import {StyleSheet, TouchableHighlight} from 'react-native';
import MealList from './MealList';
import {Meal} from '../../entities/meals';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import IngredientSearch from './ingredients/IngredientSearch';

const MealsPage = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const navigation = useNavigation();
  return (
    <>
      {/* Search bar */}
      {meals && (
        <MealList
          removeItem={id => setMeals(meals.filter(item => item.id !== id))}
          meals={meals}
        />
      )}
      <TouchableHighlight
        onPress={() => {
          navigation.navigate('MealCreate', {
            addMeal: (meal: Meal) => {
              setMeals([...meals, meal]);
            },
          });
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
