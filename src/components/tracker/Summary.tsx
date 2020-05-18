import React, { useState, useEffect } from 'react'
import { Meal } from 'src/entities/meals'
import { View, Text } from 'react-native'
import { Sum, calcNutrients, calcMealArrayNutrient } from './calculations';

interface Props {
  meals: Meal[],
}

const Summary = (props: Props) => {
  const [sumValues, setSumValues] = useState<Sum>({ quantity: 0, nutrients: []});
  
  useEffect(() =>{
    setSumValues(calcMealArrayNutrient(props.meals));
  }, [props.meals]);
  
  return (
    <View>
      <Text>Proteins</Text>
      <Text>{sumValues.nutrients.find(item => item.nutrient==='Protein')?.amount.toString()}</Text>
    </View>
  )
}

export default Summary
