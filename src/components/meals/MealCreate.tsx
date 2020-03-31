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

interface Props {}

const MealCreate = (props: Props) => {
  const [newIngredient, setNewIngredient] = useState<Ingredient | null>(null);
  const [name, setName] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

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
          <BaseInput placeholder="Spaghetti" underlineColorAndroid="grey" />
        </View>
        <View style={styles.section}>
          <Text style={styles.subtitle}>Ingredients</Text>
          {ingredients.map(item => (
            <View key={`ingr-${item.key}`} style={styles.ingredient}>
              <Text>{item.name} (Brand)</Text>
              <Text>{item.quantityInGramm} gr</Text>
            </View>
          ))}
          <BaseInput
            inlineImageLeft="ic_search"
            placeholder="Search ingredients or meals"
            value={name}
            onChangeText={text => setName(text)}
          />
        </View>
        <View style={styles.quantity}>
          <Text>Quantity</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <BaseInput
              placeholder="gramms"
              keyboardType="decimal-pad"
              underlineColorAndroid="grey"
              value={quantity.toString()}
              onChangeText={text => {
                setQuantity(Number(text));
              }}
            />
            <Text>gr</Text>
          </View>
        </View>
        <View style={styles.addButton}>
          <BaseButton
            onPress={() => {
              if (name.length !== 0 && quantity > 0) {
                setIngredients([
                  ...ingredients,
                  {
                    key: 12,
                    name: name,
                    quantityInGramm: quantity,
                    nutrients: [],
                  },
                ]);
                setName('');
                setQuantity(0);
                setNewIngredient(null);
              }
            }}
            primary>
            <Text style={{color: 'white', marginHorizontal: 10}}>Add</Text>
          </BaseButton>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <TouchableHighlight
          onPress={() => {
            navigation.goBack();
          }}>
          <Text>Cancel</Text>
        </TouchableHighlight>
        <BaseButton onPress={() => {}} secondary style={{marginTop: 10}}>
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
  quantity: {
    marginVertical: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    alignItems: 'center',
    marginVertical: 10,
  },
  bottomSection: {
    alignItems: 'center',
  },
});

export default MealCreate;
