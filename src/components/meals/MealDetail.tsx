import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableHighlight} from 'react-native-gesture-handler';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BaseButton from '../../core/components/BaseButton';
import IngredientChooser from './ingredients/IngredientChooser';
import {Meal} from '../../data/meals.dto';
import NutrientsList from './ingredients/NutrientsList';

interface Props {
  route: {
    params: {
      meal: Meal;
    };
  };
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
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
    marginBottom: 10,
  },
  ingrText: {
    fontSize: 18,
  },
  nutrient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  delete: {
    backgroundColor: '#B50606',
    padding: 5,
    marginHorizontal: 10,
    borderBottomEndRadius: 10,
    borderTopStartRadius: 10,
  },
});

const MealDetail = (props: Props) => {
  const meal = props.route.params.meal;
  const [edit, setEdit] = useState(false);
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>{meal.name}</Text>
        <View style={styles.section}>
          <Text style={styles.subtitle}>Ingredients</Text>
          {meal.ingredients.map(item => (
            <View key={item.id} style={styles.ingredient}>
              <View style={styles.row}>
                <Text style={styles.ingrText}>{item.name} (Brand)</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.ingrText}>{item.quantityInGramm} gr</Text>
                  {edit && (
                    <TouchableHighlight
                      onPress={() => {}}
                      underlayColor="#FFFFFF00">
                      <View style={styles.delete}>
                        <Icon name="clear" size={20} color="white" />
                      </View>
                    </TouchableHighlight>
                  )}
                </View>
              </View>
              <NutrientsList ingredient={item} />
            </View>
          ))}
        </View>
        {edit && <IngredientChooser addIngredient={() => {}} />}
      </View>

      <View>
        {edit ? (
          <BaseButton
            onPress={() => {
              setEdit(false);
            }}
            secondary
            style={{marginTop: 10}}>
            <Text style={{color: 'white', marginHorizontal: 10}}>Save</Text>
          </BaseButton>
        ) : (
          <BaseButton
            onPress={() => {
              setEdit(true);
            }}
            secondary
            style={{marginTop: 10}}>
            <Text style={{color: 'white', marginHorizontal: 10}}>Edit</Text>
          </BaseButton>
        )}
      </View>
    </ScrollView>
  );
};

export default MealDetail;
