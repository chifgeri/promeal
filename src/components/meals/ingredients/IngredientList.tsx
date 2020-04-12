import React from 'react';
import {Ingredient} from 'src/data/ingredient.dto';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {FlatList} from 'react-native';

interface Props {
  ingredients: Ingredient[];
  setIngredient: (item: Ingredient) => void;
}

interface ItemProps {
  item: Ingredient;
  setIngredient: (item: Ingredient) => void;
}

const Item = (props: ItemProps) => (
  <TouchableHighlight
    onPress={() => {
      props.setIngredient(props.item);
    }}>
    <View style={styles.item}>
      <Text>{props.item.name}</Text>
    </View>
  </TouchableHighlight>
);

const IngredientList = (props: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={props.ingredients}
        renderItem={({item}) => (
          <Item item={item} setIngredient={props.setIngredient} />
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    top: 40,
    left: 0,
  },
  item: {
    marginHorizontal: 20,
    marginVertical: 8,
  },
});

export default IngredientList;
