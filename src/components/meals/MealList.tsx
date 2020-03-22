import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  View,
  Button,
  Text,
  TouchableHighlight,
} from 'react-native';
import {Meal} from 'src/data/meals.dto';
import MealCard from './MealCard';
import MealCreate from './MealCreate';

interface Props {
  meals: Meal[];
  removeItem: (id: number) => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    marginVertical: 24,
    alignSelf: 'center',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#AFB42B',
    width: '40%',
    borderTopStartRadius: 10,
    borderBottomEndRadius: 10,
    marginBottom: 14,
  },
  buttonText: {
    paddingVertical: 8,
    fontSize: 24,
    color: 'white',
  },
});

const MealList = (props: Props) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={props.meals}
        renderItem={({item}) => (
          <View style={styles.item}>
            <MealCard removeItem={props.removeItem} meal={item} />
          </View>
        )}
        keyExtractor={item => item.key.toString()}
      />
    </SafeAreaView>
  );
};

export default MealList;
