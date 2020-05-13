import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Meal} from '../../entities/meals';
import NutrientsList from '../meals/ingredients/NutrientsList';
import {Nutrient} from 'src/entities/nutrient';

interface Props {
  meal: Meal;
}

interface Sums {
  quantitySum: number;
  nutrients: Nutrient[];
}

const FoodCard = (props: Props) => {
  const [sumOfIngredients, setSumOfIngredients] = useState<Sums>({
    quantitySum: 0,
    nutrients: [],
  });
  useEffect(() => {
    const sum: Sums = {
      quantitySum: 0,
      nutrients: [],
    };

    props.meal.ingredients.forEach((item, index) => {
      if (index === 0) {
        item.nutrients.forEach(nutri => {
          sum.nutrients.push(nutri);
        });
      } else {
        item.nutrients.forEach((nutri, indx) => {
          sum.nutrients[indx].amount += nutri.amount;
        });
      }
      sum.quantitySum += item.quantityInGramm;
    });
    setSumOfIngredients(sum);
  }, [props.meal]);

  return (
    <View>
      <View>
        <Text>{props.meal.name}</Text>
      </View>
      <View>
        <View style={styles.row}>
          <Text>Dish amount:</Text>
          <Text>{sumOfIngredients.quantitySum.toString()} gr</Text>
        </View>
        <Text>Nutrients</Text>
        {sumOfIngredients && (
          <NutrientsList nutrients={sumOfIngredients.nutrients} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default FoodCard;
