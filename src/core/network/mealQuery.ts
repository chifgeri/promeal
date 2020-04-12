import axios, {Canceler, CancelToken} from 'axios';
import react, {useState} from 'react';
import {Ingredient} from 'src/data/ingredient.dto';

const APIKEY = 'DEMO_KEY';

const baseRequest = axios.create({
  baseURL: 'https://api.nal.usda.gov/fdc/v1/foods',
  timeout: 10000,
});

const convert = (item: any) => ({
  id: item.nutrientNumber,
  nutrient: item.nutrientName,
  amount: item.value,
  unit: item.unitName,
});

export const searchFood = (humanText: String) => {
  // If another call executed, the component cancels the old request
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const request = async () => {
    try {
      const response = await baseRequest.get('/search', {
        cancelToken: source.token,
        params: {
          query: humanText,
          api_key: APIKEY,
        },
      });

      // Data schema is found at https://fdc.nal.usda.gov/api-guide.htm
      const data = response.data;
      const ingredients: Ingredient[] = data.foods.map((it: any) => {
        const nutrients = [];
        for (const item of it.foodNutrients) {
          switch (item.nutrientNumber) {
            // Protein
            case '203':
              nutrients.push(convert(item));
              break;
            // Total Fat, lipids
            case '204':
              nutrients.push(convert(item));
              break;
            // Carbohydrate
            case '205':
              nutrients.push(convert(item));
              break;
            // Energy
            case '208':
              nutrients.push(convert(item));
              break;
            // Sugar
            case '269':
              nutrients.push(convert(item));
              break;
          }
        }

        return {
          id: it.fdcId,
          name: it.description,
          nutrients: nutrients,
        };
      });
      return ingredients;
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Request canceled', err.message);
      } else {
        console.log(err.request);
      }
    }
  };

  return {request, source};
};
