import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableHighlight} from 'react-native';
import MealList from './MealList';
import {Meal} from '../../entities/meals';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {useConnection} from '../../core/database/connection';

const MealsPage = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const navigation = useNavigation();

  const {mealRepository} = useConnection();

  useEffect(() => {
    if (mealRepository) {
      mealRepository
        .find({relations: ['ingredients', 'ingredients.nutrients']})
        .then(meals => setMeals(meals));
    }
  }, [mealRepository]);

  const removeItem = (id: number) => {
    if (mealRepository) {
      mealRepository.findOne(id).then(meal => {
        if (meal) {
          mealRepository.delete(meal.id).then(it => {
            setMeals(meals.filter(item => item.id !== meal.id));
          });
        }
      });
    }
  };
  return (
    <>
      {/* Search bar */}
      {meals && 
        <MealList 
          removeItem={removeItem}
          meals={meals}
          saveMeal={(meal:Meal) =>{ 
              mealRepository?.save(meal)
              .then(meal => 
                setMeals([...meals.filter(item => item.id !== meal.id), meal]))
              }}
        />
      }
      <TouchableHighlight
        onPress={() => {
          navigation.navigate('MealCreate', {
            addMeal: (meal: Meal) => {
              if (mealRepository) {
                mealRepository.save(meal).then(() => {
                  console.log(meal);
                  setMeals([...meals, meal]);
                });
              }
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
