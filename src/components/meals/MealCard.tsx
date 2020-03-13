import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Meal} from 'src/data/meals.dto';

interface Props {
  meal: Meal;
}

const style = StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 0.8,
    shadowColor: 'black',
    backgroundColor: 'white',
    height: 100,
    elevation: 3,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowRadius: 10,
  },
  titleBackground: {
    width: 'auto',
    height: 'auto',
    borderRadius: 10,
  },
  title: {
    color: 'white',
    margin: 5,
    marginHorizontal: 20,
  },
  bottomButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  edit: {
    backgroundColor: 'lightgrey',
    padding: 5,
    borderTopStartRadius: 10,
  },
  delete: {
    backgroundColor: 'red',
    padding: 5,
    borderBottomEndRadius: 10,
  },
});

const MealCard: React.FC<Props> = ({meal}) => {
  return (
    <View style={style.card}>
      <ImageBackground
        source={require('../../assets/mealCard.png')}
        style={style.titleBackground}>
        <Text style={style.title}>{meal.name}</Text>
      </ImageBackground>
      <Text>Ingredients:</Text>
      {meal
        ? meal.ingredients.map(item => (
            <View>
              <Text>{item}</Text>
            </View>
          ))
        : null}
      <View style={style.bottomButtons}>
        <TouchableHighlight onPress={() => {}}>
          <View style={style.edit}>
            <Icon name="edit" size={20} color="black" />
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => {}}>
          <View style={style.delete}>
            <Icon name="clear" size={20} color="white" />
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default MealCard;
