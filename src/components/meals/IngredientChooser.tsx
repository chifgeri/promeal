import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BaseInput from '../../core/components/BaseInput';
import BaseButton from '../../core/components/BaseButton';
import {Ingredient} from '../../data/ingredient.dto';

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
  const [name, setName] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);

  useEffect(() => {
    if (newIngredient) {
      props.addIngredient(newIngredient);
    }
  }, [newIngredient]);

  return (
    <View>
      <BaseInput
        inlineImageLeft="ic_search"
        placeholder="Search ingredients or meals"
        value={name}
        onChangeText={text => setName(text)}
      />
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
              props.addIngredient({
                key: Math.random() * 100,
                name: name,
                quantityInGramm: quantity,
                nutrients: [
                  {nutrient: 'CH', key: Math.random(), quantity: '100mg'},
                ],
              });
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
  );
};

export default IngredientChooser;
