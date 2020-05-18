import {Meal} from '../../entities/meals';
import {Nutrient} from 'src/entities/nutrient';

export interface Sum {
  quantity: number;
  nutrients: Nutrient[];
}

export const calcNutrients = (meal: Meal) => {
  let nutrients: Nutrient[] = [];
  let quantity: number = 0;
  meal.ingredients.forEach(ingr => {
    ingr.nutrients.forEach(nutri => {
      let nutr = nutrients.find(
        item => item.nutrientApiID === nutri.nutrientApiID,
      );
      if (nutr) {
        nutr.amount += (nutri.amount * ingr.quantityInGramm) / 100;
      } else {
        nutrients.push(nutri);
      }
    });
    quantity += ingr.quantityInGramm;
  });

  return {quantity, nutrients};
};

export const calcMealArrayNutrient = (meals: Meal[]) => {
  let sumOfMeals: Sum = {quantity: 0, nutrients: []};

  meals.forEach(meal => {
    let sum = calcNutrients(meal);
    sumOfMeals = {
      quantity: sumOfMeals.quantity + sum.quantity,
      nutrients: sumOfMeals.nutrients.map(nutri => {
        let nutr = sumOfMeals.nutrients.find(
          item => item.nutrientApiID === nutri.nutrientApiID,
        );
        if (nutr) {
          nutr.amount += nutri.amount;
        } else {
          nutr = nutri;
        }
        return nutr;
      }),
    };
  });
  return sumOfMeals;
};
