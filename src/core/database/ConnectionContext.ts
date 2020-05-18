import React from 'react';
import {createConnection, Connection} from 'typeorm';
import {Meal} from '../../entities/meals';
import {Ingredient} from '../../entities/ingredient';
import {Nutrient} from '../../entities/nutrient';
import {Day} from '../../entities/day';
import {Dish} from '../../entities/dish';

export const connect = async () => {
  const connection = await createConnection({
    type: 'react-native',
    database: 'test',
    location: 'default',
    logging: ['error', 'query', 'schema'],
    synchronize: true,
    entities: [Meal, Ingredient, Nutrient, Day, Dish],
  });

  return connection;
};

export const ConnectionContext = React.createContext<Connection | null>(null);
