import {Ingredient} from './ingredient.dto';

export interface Meal {
  id: number;
  ingredients: Ingredient[];
  name: string;
}
