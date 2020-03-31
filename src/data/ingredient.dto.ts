export interface Ingredient {
  key: number;
  name: string;
  nutrients: {key: number; nutrient: string; quantity: string}[];
  quantityInGramm: number;
}
