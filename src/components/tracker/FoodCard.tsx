import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {Meal} from '../../entities/meals';
import NutrientsList from '../meals/ingredients/NutrientsList';
import {Sum, calcNutrients} from './calculations';

interface Props {
  meal: Meal;
  time: string;
  id: number;
}

const FoodCard = (props: Props) => {
  const [sumOfIngredients, setSumOfIngredients] = useState<Sum>({
    quantity: 0,
    nutrients: [],
  });
  useEffect(() => {
    setSumOfIngredients(calcNutrients(props.meal));
  }, [props.meal]);

  return (
    <View style={styles.container}>
      {props.id % 2 === 0 ? (
        <View style={{flexDirection: 'row'}}>
          <ImageBackground
            source={require('../../assets/FoodCardLeft.png')}
            style={styles.titleBackground}
            resizeMode="stretch">
            <View>
              <Text style={styles.title}>{props.time}</Text>
            </View>
          </ImageBackground>
        </View>
      ) : (
        <View style={{flexDirection: 'row'}}>
          <ImageBackground
            source={require('../../assets/FoodCardRight.png')}
            style={styles.titleBackgroundRight}
            resizeMode="stretch">
            <View style={{flexDirection: 'row-reverse'}}>
              <Text style={{...styles.title, marginLeft: 10, width: '45%'}}>
                {props.time}
              </Text>
            </View>
          </ImageBackground>
        </View>
      )}
      <View style={styles.card}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.name}>
            {props.meal.name.slice(0, 22)}{' '}
            {props.meal.name.length > 22 && '...'}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.mainText}>Dish amount:</Text>
          <Text style={styles.mainText}>
            {sumOfIngredients.quantity.toString()} gr
          </Text>
        </View>
        <Text style={styles.mainText}>Nutrients</Text>
        {sumOfIngredients && (
          <NutrientsList nutrients={sumOfIngredients.nutrients} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleBackground: {
    width: '100%',
    height: 'auto',
  },
  titleBackgroundRight: {
    width: '100%',
    height: 'auto',
  },
  title: {
    fontSize: 18,
    color: 'white',
    marginVertical: 2,
    marginHorizontal: 10,
  },
  name: {
    fontSize: 22,
    marginBottom: 10,
  },
  mainText: {
    fontSize: 16,
    marginBottom: 4,
  },
  card: {
    padding: 12,
  },
});

export default FoodCard;
