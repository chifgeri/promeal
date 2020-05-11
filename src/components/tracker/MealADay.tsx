import React from 'react';
import {View, Text} from 'react-native';
import {Meal} from '../../entities/meals';
import NutrientsList from '../meals/ingredients/NutrientsList';

interface Props {
  name: string;
  food: Meal;
}

const MealADay = (props: Props) => {

  const getNutrientsOfMeal = (m:Meal) => {
    return props.food.ingredients.reduce((prev, curr) => {
      prev.quantityInGramm += curr.quantityInGramm;
      if(prev.nutrients){
        prev.nutrients = prev.nutrients.map(item => {
          let nut = curr.nutrients?.find(it => it.id === item.id)
          item.amount += nut?.amount;
          return item;
        })
     }
     return prev;
    })
  }

  const nutrients = getNutrientsOfMeal(props.food);
  return (
    <View>
      <Text>{props.name}</Text>
      <View>
        <View>
        <Text>{props.food.name}</Text>
        <Text>{nutrients.quantityInGramm}</Text>
        </View>
        <View>
          <NutrientsList ingredient={nutrients}></NutrientsList>
        </View>
      </View>
    </View>
  );
};

export default MealADay;
