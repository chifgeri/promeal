import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Nutrient} from '../../../entities/nutrient';

interface Props {
  nutrients: Nutrient[];
}

const NutrientsList = (props: Props) => {
  return (
    <View>
      {props.nutrients &&
        props.nutrients.map((it, index) => (
          <View
            key={`nutr-${index}`}
            style={index % 2 === 0 ? styles.nutrTextLight : styles.nutrText}>
            <Text>{it.nutrient}</Text>
            <Text>
              {it.amount.toString()} {it.unit}
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
