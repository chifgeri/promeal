import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import BaseButton from '../../core/components/BaseButton';
import BaseInput from '../../core/components/BaseInput';
import {Ingredient} from 'src/data/ingredient.dto';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import IngredientChooser from './ingredients/IngredientChooser';
import {Meal} from 'src/data/meals.dto';

interface Props {
  route: {
    params: {
      addMeal: (meal: Meal) => void;
    };
  };
}

const MealCreate = (props: Props) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [name, setName] = useState<string>('');
  const navigation = useNavigation();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        justifyContent: 'space-between',
        minHeight: '85%',
      }}>
      <View>
        <Text style={styles.title}>Create a meal</Text>
        <View style={styles.section}>
          <Text style={styles.subtitle}>Name</Text>
          <BaseInput
            placeholder="Spaghetti"
            underlineColorAndroid="grey"
            onChangeText={text => {
              setName(text);
            }}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.subtitle}>Ingredients</Text>
          {ingredients.map(item => (
            <View key={item.id} style={styles.ingredient}>
              <Text>{item.name} (Brand)</Text>
              <Text>{item.quantityInGramm} gr</Text>
            </View>
          ))}
        </View>
        <IngredientChooser
          addIngredient={item => {
            setIngredients([...ingredients, item]);
          }}
        />
      </View>
      <View style={styles.bottomSection}>
        <TouchableHighlight
          onPress={() => {
            navigation.goBack();
          }}>
          <Text>Cancel</Text>
        </TouchableHighlight>
        <BaseButton
          onPress={() => {
            props.route.params.addMeal({
              id: 5,
              ingredients: ingredients,
              name: name,
            });
          }}
          secondary
          style={{marginTop: 10}}>
          <Text style={{color: 'white', marginHorizontal: 10}}>Save</Text>
        </BaseButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 10,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowColor: 'black',
    backgroundColor: 'white',
    elevation: 3,
    shadowRadius: 10,
  },
  title: {
    fontSize: 34,
    paddingBottom: 12,
  },
  subtitle: {
    fontSize: 24,
    paddingBottom: 8,
  },
  section: {
    marginBottom: 10,
  },
  ingredient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  bottomSection: {
    alignItems: 'center',
    paddingBottom: 10,
  },
});

export default MealCreate;
