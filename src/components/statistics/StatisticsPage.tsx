import React, {useEffect, useContext, useState} from 'react';
import {View, Text} from 'react-native';
import {ConnectionContext} from '../../core/database/ConnectionContext';
import {Day} from '../../entities/day';
import WeightChart from './WeightChart';
import NutrientChart from './NutrientChart';
import {Repository} from 'typeorm';
import {ScrollView} from 'react-native-gesture-handler';

const StatisticsPage = () => {
  const [days, setDays] = useState<Day[]>([]);
  const conn = useContext(ConnectionContext);
  useEffect(() => {
    if (conn) {
      const dayRepo: Repository<Day> = conn.getRepository<Day>('Day');
      dayRepo
        .find({
          relations: [
            'mealsEaten',
            'mealsEaten.meal',
            'mealsEaten.meal.ingredients',
            'mealsEaten.meal.ingredients.nutrients',
          ],
        })
        .then(results => {
          if (results) {
            setDays(results);
          }
        });
    }
  }, [conn]);
  return (
    <ScrollView>
      <WeightChart
        data={days.map(item => ({
          date: new Date(item.date),
          weight: item.weight,
        }))}
      />
      <NutrientChart days={days} />
    </ScrollView>
  );
};

export default StatisticsPage;
