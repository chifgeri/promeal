import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {LineChart, Grid, YAxis, XAxis} from 'react-native-svg-charts';

interface Props {
  data: DayData[];
}

interface DayData {
  date: Date;
  weight: number;
}

const WeightChart = (props: Props) => {
  const data = [...props.data.map(item => item.weight)];
  // To fill the week if fewer values given
  const week = [null, null, null, null, null, null, null];

  return (
    <View style={{margin: 10}}>
      <Text style={styles.chartTitle}>Weight statistics within a week:</Text>
      <View>
        <View style={{height: 200, flexDirection: 'row'}}>
          <YAxis
            data={[
              ...data
                .slice(0, 6)
                .concat(week)
                .slice(0, 6),
            ]}
            svg={{
              fill: 'grey',
              fontSize: 10,
            }}
            contentInset={{top: 20, bottom: 20}}
            numberOfTicks={10}
            formatLabel={value => `${value} kg`}
          />
          <LineChart
            style={{flex: 1, marginLeft: 16, marginRight: 25}}
            data={[
              ...data
                .slice(0, 6)
                .concat(week)
                .slice(0, 6),
            ]}
            contentInset={{top: 20, bottom: 20}}
            svg={{stroke: 'rgb(134, 65, 244)'}}>
            <Grid />
          </LineChart>
        </View>
        <XAxis
          style={{marginHorizontal: 16}}
          data={[
            ...data
              .slice(0, 6)
              .concat(week)
              .slice(0, 6),
          ]}
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

export default WeightChart;
