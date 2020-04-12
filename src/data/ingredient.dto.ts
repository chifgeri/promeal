export interface Ingredient {
  id: string;
  name: string;
  nutrients?: {id: string; nutrient: string; quantity: string; unit: string}[];
  quantityInGramm: number;
}
