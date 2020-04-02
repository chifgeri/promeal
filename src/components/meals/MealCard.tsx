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
import {useNavigation} from '@react-navigation/native';

interface Props {
  meal: Meal;
  removeItem: (id: number) => void;
}

const style = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowColor: 'black',
    backgroundColor: 'white',
    elevation: 3,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowRadius: 10,
    minWidth: 280,
    maxWidth: 300,
  },
  titleBackground: {
    width: '90%',
    height: 'auto',
  },
  title: {
    color: 'white',
    width: '75%',
    margin: 5,
    marginHorizontal: 20,
  },
  cardContent: {
    paddingHorizontal: 15,
    paddingVertical: 10,
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
    backgroundColor: '#B50606',
    padding: 5,
    borderBottomEndRadius: 10,
  },
  ingredients: {
    marginHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

const MealCard: React.FC<Props> = ({meal, removeItem}) => {
  const navigation = useNavigation();
  return (
    <View
      style={style.card}
      onTouchEnd={() => {
        navigation.navigate('MealDetail', {meal: meal});
      }}>
      <ImageBackground
        source={require('../../assets/mealCard.png')}
        style={style.titleBackground}
        resizeMode="stretch">
        <View>
          <Text style={style.title}>{meal.name}</Text>
        </View>
      </ImageBackground>
      <View style={style.cardContent}>
        <Text>Ingredients:</Text>
        {meal
          ? meal.ingredients.map(item => (
              <View key={`ingrd-${item.key}`} style={style.ingredients}>
                <Text>{item.name}:</Text>
                <Text>{item.quantityInGramm} gr</Text>
              </View>
            ))
          : null}
      </View>
      <View style={style.bottomButtons}>
        <TouchableHighlight onPress={() => {}} underlayColor="#FFFFFF00">
          <View style={style.edit}>
            <Icon name="edit" size={20} color="black" />
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            removeItem(meal.key);
          }}
          underlayColor="#FFFFFF00">
          <View style={style.delete}>
            <Icon name="clear" size={20} color="white" />
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default MealCard;
