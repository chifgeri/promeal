export interface Ingredient {
  id: string;
  name: string;
  nutrients?: {id: string; nutrient: string; amount: string; unit: string}[];
  quantityInGramm: number;
}
