import {createConnection, Repository} from 'typeorm';
import {Meal} from '../../entities/meals';
import {Ingredient} from '../../entities/ingredient';
import {Nutrient} from '../../entities/nutrient';
import {useState, useEffect} from 'react';

export const useConnection = () => {
  const [mealRep, setMealRep] = useState<Repository<Meal>>();
  const [ingrRep, setIngrRep] = useState<Repository<Ingredient>>();
  const [nutrRep, setNutrRep] = useState<Repository<Nutrient>>();

  useEffect(() => {
    createConnection({
      type: 'react-native',
      database: 'test',
      location: 'default',
      logging: ['error', 'query', 'schema'],
      synchronize: true,
      entities: [Meal, Ingredient, Nutrient],
    })
      .then(connection => {
        setMealRep(connection.getRepository(Meal));
        setIngrRep(connection.getRepository(Ingredient));
        setNutrRep(connection.getRepository(Nutrient));
      })
      .catch(error => console.warn(error));
    return () => {};
  }, []);

  return {
    mealRepository: mealRep,
    ingredientRepository: ingrRep,
    nutrientRepository: nutrRep,
  };
};
