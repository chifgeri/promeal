import {Ingredient} from './ingredient.dto';

export interface Meal {
  key: number;
  ingredients: Ingredient[];
  name: string;
}
