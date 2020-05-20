import React, { useState, useEffect } from 'react'
import { Meal } from 'src/entities/meals'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Sum, calcNutrients, calcMealArrayNutrient } from './calculations';
import { Bar } from "react-native-progress";
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  meals: Meal[],
  opened: boolean;
  setOpened: (b:boolean) => void;
}

const Summary = (props: Props) => {
  const [sumValues, setSumValues] = useState<Sum>({ quantity: 0, nutrients: []});
  
  useEffect(() =>{
    setSumValues(calcMealArrayNutrient(props.meals));
  }, [props.meals]);
  
  const getAmount = (name: string) => {
    if(sumValues){
      const nutr = sumValues.nutrients.find(item => item.nutrient.includes(name))
      return nutr ? nutr.amount : 0;
    }
    return 0;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity 
          onPress={() => {props.setOpened(!props.opened)}}
        >
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 18}}>Summary</Text>
            { props.opened ? 
              <Icon name={'expand-more'} size={20} />
              :
              <Icon name={'expand-less'} size={20} />
            }
          </View>
      </TouchableOpacity>
      { props.opened && 
      <View>
      <View style={styles.row}>
        <Text >Proteins</Text>
        <View style={styles.progress}>
          <Text style={styles.numbers}>
            ({sumValues.nutrients.find(item => item.nutrient==='Protein')?.amount.toString()}/120)
          </Text>
          <Bar
            progress={getAmount('Protein')/120}
            color={getAmount('Protein')/120 >= 1 ? '#B50606' : '#AFB42B'}
            width={150}
            height={12} />
        </View>
      </View>
      <View style={styles.row}>
        <Text>CH</Text>
        <View style={styles.progress}>
          <Text style={styles.numbers}>
            ({getAmount('Carbohydrate').toString()}/200)
          </Text>
          <Bar 
            progress={getAmount('Carbohydrate')/200}
            color={getAmount('Carbohydrate')/200 >= 1 ? '#B50606' : '#AFB42B'}
            width={150}
            height={12} />
        </View>
      </View>
      <View style={styles.row}>
        <Text>Energy</Text>
        <View style={styles.progress}>
          <Text style={styles.numbers}>({getAmount('Energy').toString()} /2000)</Text>
          <Bar 
            progress={getAmount('Energy')/2000}
            color={getAmount('Energy')/2000 >= 1 ? '#B50606' : '#AFB42B'}
            width={150}
            height={12} />
        </View> 
      </View>
      </View>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 100,
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#DDDDDD',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  numbers: {
    fontSize: 12,
    marginHorizontal: 4
  },
  progress: { 
    flexDirection: "row",
    alignItems: "center",
  }
})

export default Summary
