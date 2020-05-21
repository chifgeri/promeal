import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {LineChart, Grid, YAxis, XAxis} from 'react-native-svg-charts';
import {Day} from 'src/entities/day';
import {calcMealArrayNutrient, Sum} from '../tracker/calculations';
import {Picker} from '@react-native-community/picker';

interface Props {
  days: Day[];
}

const nutrients = [
  {
    key: 1,
    label: 'Protein',
    value: 'Protein',
  },
  {
    key: 2,
    label: 'Carbohydrate',
    value: 'Carbohydrate',
  },
  {
    key: 3,
    label: 'Sugar',
    value: 'Sugar',
  },
  {
    key: 4,
    label: 'Fat',
    value: 'fat',
  },
];

const NutrientChart = (props: Props) => {
  const [sums, setSums] = useState<Sum[]>([]);
  const [data, setData] = useState<Number[]>([]);
  const [nutrientName, setNutrientName] = useState<string>('Protein');

  useEffect(() => {
    setSums(
      props.days.map(item =>
        calcMealArrayNutrient(item.mealsEaten.map(dish => dish.meal)),
      ),
    );
  }, [props.days]);

  useEffect(() => {
    let amounts = sums.map(
      item =>
        item.nutrients.find(item => item.nutrient.includes(nutrientName))!
          .amount,
    );
    setData(amounts);
    console.log(amounts);
  }, [sums, nutrientName]);

  return (
    <View style={{margin: 10}}>
      <View>
        <Text style={styles.chartTitle}>Nutrient (10 day max.): </Text>
        <Picker
          mode="dropdown"
          selectedValue={nutrientName}
          onValueChange={(itemValue, itemIndex) =>
            setNutrientName(
              nutrients.find(item => item.value === itemValue)!.value,
            )
          }>
          {nutrients.map(item => (
            <Picker.Item key={item.key} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>
      <View>
        <View style={{height: 200, flexDirection: 'row'}}>
          <YAxis
            data={data.slice(0, 9)}
            svg={{
              fill: 'grey',
              fontSize: 10,
            }}
            contentInset={{top: 20, bottom: 20}}
            numberOfTicks={10}
            formatLabel={(value: any) => `${value}`}
          />
          <LineChart
            style={{flex: 1, marginLeft: 16, marginRight: 25}}
            data={data.slice(0, 9)}
            contentInset={{top: 20, bottom: 20}}
            svg={{stroke: 'rgb(134, 65, 244)'}}>
            <Grid />
          </LineChart>
        </View>
        <XAxis
          style={{marginHorizontal: 16}}
          data={data.slice(0, 9)}
          formatLabel={(value: any, index: number) => `${index + 1}. day`}
          contentInset={{left: 20, right: 20}}
          svg={{fontSize: 10, fill: 'black'}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartTitle: {
    fontSize: 20,
    marginVertical: 5,
  },
});

export default NutrientChart;
