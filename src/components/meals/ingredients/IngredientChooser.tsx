import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BaseInput from '../../../core/components/BaseInput';
import BaseButton from '../../../core/components/BaseButton';
import {Ingredient} from '../../../entities/ingredient';
import IngredientSearch from './IngredientSearch';
import NutrientsList from './NutrientsList';

interface Props {
  addIngredient: (ingredient: Ingredient) => void;
}

const styles = StyleSheet.create({
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
});

const IngredientChooser = (props: Props) => {
  const [newIngredient, setNewIngredient] = useState<Ingredient | null>(null);
  const [quantity, setQuantity] = useState<number>(0);

  return (
    <View>
      <IngredientSearch addIngredient={i => setNewIngredient(i)} />
      {newIngredient && (
        <View>
          <Text>Nutrients per 100g</Text>
          <NutrientsList nutrients={newIngredient.nutrients} />
        </View>
      )}
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
            if (newIngredient && quantity > 0) {
              props.addIngredient({
                ...newIngredient,
                quantityInGramm: quantity,
              });
            }
          }}
          primary>
          <Text style={{color: 'white', marginHorizontal: 10}}>Add</Text>
        </BaseButton>
      </View>
    </View>
  );
};

export default IngredientChooser;
