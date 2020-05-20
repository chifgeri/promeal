import React, {useState, useEffect} from 'react';
import {Picker} from '@react-native-community/picker';
import {
  Modal,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ColorPropType,
} from 'react-native';
import {Meal} from '../../entities/meals';
import {Repository} from 'typeorm';

const mealtimes = [
  {
    key: 1,
    label: 'Breakfast',
    value: 'BF',
  },
  {
    key: 2,
    label: 'Elevenses',
    value: 'EL',
  },
  {
    key: 3,
    label: 'Lunch',
    value: 'L',
  },
  {
    key: 4,
    label: 'Snack',
    value: 'SN',
  },
  {
    key: 5,
    label: 'Supper',
    value: 'SP',
  },
];

interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
  onSelect: (meal: Meal, time: string) => void;
  mealRepo: Repository<Meal> | null;
}

const FoodChooser = (props: Props) => {
  const [selectedTime, setSelectedTime] = useState<any>();
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>();

  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    if (props.mealRepo && props.open) {
      props.mealRepo
        .find({
          where: {deleted: false},
          relations: ['ingredients', 'ingredients.nutrients'],
        })
        .then(results => {
          if (results) {
            setMeals(results);
          }
        });
    }
  }, [props.mealRepo, props.open]);

  return (
    <View>
      <Modal visible={props.open} transparent>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <View style={styles.pickers}>
                <Text>Choose a time:</Text>
                <Picker
                  mode="dropdown"
                  selectedValue={selectedTime && selectedTime.value}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedTime(
                      mealtimes.find(item => item.value === itemValue),
                    )
                  }>
                  {mealtimes.map(item => (
                    <Picker.Item
                      key={item.key}
                      label={item.label}
                      value={item.value}
                    />
                  ))}
                </Picker>
                <Text>Choose the food:</Text>
                <Picker
                  mode="dropdown"
                  selectedValue={selectedMeal ? selectedMeal.name : ''}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedMeal(meals.find(item => item.name === itemValue))
                  }>
                  {meals.map(item => (
                    <Picker.Item
                      key={item.id}
                      label={
                        item.name.slice(0, 25) +
                        (item.name.length > 25 ? '...' : '')
                      }
                      value={item.name}
                    />
                  ))}
                  {meals.length === 0 && (
                    <Picker.Item key={0} label={'No Food Found'} value={'NO'} />
                  )}
                </Picker>
              </View>

              <View style={styles.buttons}>
                <TouchableOpacity
                  style={{marginTop: 10}}
                  onPress={() => {
                    if (selectedMeal && selectedTime) {
                      props.onSelect(selectedMeal, selectedTime.label);
                      setSelectedMeal(null);
                      setSelectedTime(null);
                    }
                    props.setOpen(false);
                  }}>
                  <Text style={{fontSize: 20, color: 'grey'}}>Choose</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{marginVertical: 10}}
                  onPress={() => {
                    props.setOpen(false);
                  }}>
                  <Text style={{color: 'red'}}>Dismiss</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000085',
  },
  modalView: {
    minWidth: '70%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pickers: {
    minWidth: '80%',
  },
  buttons: {
    alignItems: 'center',
  },
});

export default FoodChooser;
