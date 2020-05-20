import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FoodCard from './FoodCard';
import {ConnectionContext} from '../../core/database/ConnectionContext';
import {Repository} from 'typeorm';
import {Meal} from '../../entities/meals';
import {Day} from '../../entities/day';
import BaseButton from '../../core/components/BaseButton';
import FoodChooser from './FoodChooser';
import Summary from './Summary';
import {ScrollView} from 'react-native-gesture-handler';
import {Dish} from '../../entities/dish';

const TrackerPage = () => {
  const [mealRepo, setMealRepo] = useState<Repository<Meal> | null>(null);
  const [dayRepo, setDayRepo] = useState<Repository<Day> | null>(null);
  const [day, setDay] = useState<Day | null>();

  const [summaryOpened, setSummaryOpened] = useState<boolean>(false);

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const conn = useContext(ConnectionContext);

  useEffect(() => {
    if (conn) {
      setMealRepo(conn.getRepository('Meal'));
      setDayRepo(conn.getRepository('Day'));
    }
  }, [conn]);

  useEffect(() => {
    if (dayRepo) {
      dayRepo
        .findOne(
          {
            date: new Date().toDateString(),
          },
          {
            relations: [
              'mealsEaten',
              'mealsEaten.meal',
              'mealsEaten.meal.ingredients',
              'mealsEaten.meal.ingredients.nutrients',
            ],
          },
        )
        .then(result => {
          if (result) {
            console.log(result);
            setDay(result);
          } else {
            setDay({
              date: new Date().toDateString(),
              mealsEaten: [],
              weight: 0,
            });
          }
        })
        .catch(() => {
          setDay({date: new Date().toDateString(), mealsEaten: [], weight: 0});
        });
    }
  }, [dayRepo]);

  useEffect(() => {
    if (day) {
      dayRepo!.save(day);
    }
  }, [day]);

  return (
    <View>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={summaryOpened ? {...styles.cards} : {...styles.cards, marginBottom: 40}}>
        {day && (
          <View>
            <Text style={styles.date}>{day.date}</Text>
          </View>
        )}
        {day &&
          day.mealsEaten.map((item, index) => (
            <FoodCard
              key={index}
              id={index}
              meal={item.meal}
              time={item.time}
            />
          ))}

        <BaseButton
          style={styles.addButton}
          onPress={() => {
            setOpenDialog(true);
          }}
          primary>
          <Text style={{color: 'white'}}>I ate something</Text>
        </BaseButton>
        <FoodChooser
          mealRepo={mealRepo}
          onSelect={(meal, time) => {
            let d = new Dish();
            d.meal = meal;
            d.time = time;
            setDay({...day!, mealsEaten: [...day!.mealsEaten, d]});
          }}
          open={openDialog}
          setOpen={() => {
            setOpenDialog(false);
          }}
        />
      </View>
      
    </ScrollView>
    {day?.mealsEaten && <Summary opened={summaryOpened} setOpened={setSummaryOpened} meals={[...day!.mealsEaten.map(item => item.meal)]}/>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  cards: {
    alignItems: 'center',
    marginBottom: 100,
  },
  date: {
    fontSize: 24,
    alignItems: 'center',
    fontWeight: 'bold',
    marginVertical: 24,
  },
  addButton: {
    marginVertical: 12,
  },
});

export default TrackerPage;
