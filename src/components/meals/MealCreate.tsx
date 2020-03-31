import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import BaseButton from '../../core/BaseButton';
import BaseInput from '../../core/BaseInput';

interface Props {}

const MealCreate = (props: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create a meal</Text>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Name</Text>
        <BaseInput placeholder="Spaghetti" underlineColorAndroid="grey" />
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Ingredients</Text>
        <BaseInput
          inlineImageLeft="ic_search"
          placeholder="Search ingredients or meals"
        />
      </View>
      <View style={styles.quantity}>
        <Text>Quantity</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <BaseInput
            placeholder="gramms"
            keyboardType="decimal-pad"
            underlineColorAndroid="grey"
          />
          <Text>gr</Text>
        </View>
      </View>
      <BaseButton onPress={() => {}} primary>
        <Text style={{color: 'white', marginVertical: 4}}>Add</Text>
      </BaseButton>
      <View style={styles.bottomSection}>
        <TouchableHighlight>
          <Text>Cancel</Text>
        </TouchableHighlight>
        <BaseButton onPress={() => {}} secondary>
          <Text style={{color: 'white'}}>Save</Text>
        </BaseButton>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    paddingBottom: 12,
  },
  subtitle: {
    fontSize: 24,
    paddingBottom: 8,
  },
  container: {
    padding: 16,
    margin: 10,
    flex: 1,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowColor: 'black',
    backgroundColor: 'white',
    elevation: 3,
    shadowRadius: 10,
  },
  section: {
    marginBottom: 10,
  },
  quantity: {
    marginVertical: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomSection: {
    marginTop: 'auto',
    alignItems: 'center',
  },
});

export default MealCreate;
