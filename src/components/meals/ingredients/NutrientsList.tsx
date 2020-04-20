import React from 'react';
import {Ingredient} from '../../../entities/ingredient';
import {View, Text, StyleSheet} from 'react-native';

interface Props {
  ingredient: Ingredient;
}

const NutrientsList = (props: Props) => {
  return (
    <View>
      {props.ingredient.nutrients &&
        props.ingredient.nutrients.map((it, index) => (
          <View
            key={it.id}
            style={index % 2 === 0 ? styles.nutrTextLight : styles.nutrText}>
            <Text>{it.nutrient}</Text>
            <Text>
              {it.amount} {it.unit}
            </Text>
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  nutrText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    backgroundColor: '#cccfcc',
  },
  nutrTextLight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    backgroundColor: '#9fa19f',
    color: 'white',
  },
});

export default NutrientsList;
