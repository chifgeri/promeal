import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Meal} from '../../entities/meals';
import {useNavigation} from '@react-navigation/native';

interface Props {
  meal: Meal;
  removeItem: (id: number) => void;
  saveMeal: (meal: Meal) => void;
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

const MealCard: React.FC<Props> = ({meal, removeItem, saveMeal}) => {
  const navigation = useNavigation();
  return (
    <View style={style.card}>
      <TouchableHighlight
        onPress={() => {
          navigation.navigate('MealDetail', {meal: meal});
        }}
        underlayColor="#FFFFFFF00">
        <View>
          <View style={{flexDirection: 'row'}}>
            <ImageBackground
              source={require('../../assets/mealCard.png')}
              style={style.titleBackground}
              resizeMode="stretch">
              <View>
                <Text style={style.title}>{meal.name}</Text>
              </View>
            </ImageBackground>
            {meal.favorite ? (
              <TouchableHighlight
                style={{marginRight: 10, marginTop: 10}}
                underlayColor="#FFFFFF00"
                onPress={e => {
                  e.preventDefault();
                  meal.favorite = false;
                  saveMeal(meal);
                }}>
                <Icon name="favorite" size={25} color="grey" />
              </TouchableHighlight>
            ) : (
              <TouchableHighlight
                style={{marginRight: 10, marginTop: 10}}
                underlayColor="#FFFFFF00"
                onPress={e => {
                  e.preventDefault();
                  meal.favorite = true;
                  saveMeal(meal);
                }}>
                <Icon name="favorite-border" size={25} color="grey" />
              </TouchableHighlight>
            )}
          </View>
          <View style={style.cardContent}>
            <Text>Ingredients:</Text>
            {meal
              ? meal.ingredients.map((item, index) => (
                  <View key={`ingrd-${index}`} style={style.ingredients}>
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
              onPress={e => {
                removeItem(meal.id);
                e.stopPropagation();
              }}
              underlayColor="#FFFFFF00">
              <View style={style.delete}>
                <Icon name="clear" size={20} color="white" />
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default MealCard;
