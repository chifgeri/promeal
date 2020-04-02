import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {View, Text, StyleSheet} from 'react-native';
import BaseInput from '../../core/components/BaseInput';
import BaseButton from '../../core/components/BaseButton';
import {Meal} from '../../data/meals.dto';

interface Props {
  route: {
    params: {
      meal: Meal;
    };
  };
}

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 26,
    alignSelf: 'center',
  },
  section: {
    margin: 16,
  },
  subtitle: {
    fontSize: 24,
  },
  ingredient: {
    marginHorizontal: 10,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ingrText: {
    fontSize: 18,
  },
  nutrient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  nutrText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    backgroundColor: 'lightgrey',
  },
  nutrTextLight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    backgroundColor: 'grey',
    color: 'white',
  },
});

const MealDetail = (props: Props) => {
  const meal = props.route.params.meal;
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>{meal.name}</Text>
        <View style={styles.section}>
          <Text style={styles.subtitle}>Ingredients</Text>
          {meal.ingredients.map(item => (
            <View key={`ingr-${item.key}`} style={styles.ingredient}>
              <View style={styles.row}>
                <Text style={styles.ingrText}>{item.name} (Brand)</Text>
                <Text style={styles.ingrText}>{item.quantityInGramm} gr</Text>
              </View>
              {item.nutrients &&
                item.nutrients.map((it, index) => (
                  <View
                    key={`ingr-${it.key}`}
                    style={
                      index % 2 === 0 ? styles.nutrTextLight : styles.nutrText
                    }>
                    <Text>{it.nutrient}</Text>
                    <Text>{it.quantity} gr</Text>
                  </View>
                ))}
            </View>
          ))}
        </View>
      </View>
      <View>
        <BaseButton onPress={() => {}} secondary style={{marginTop: 10}}>
          <Text style={{color: 'white', marginHorizontal: 10}}>Save</Text>
        </BaseButton>
      </View>
    </ScrollView>
  );
};

export default MealDetail;
