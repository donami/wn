import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import DrinkListItem from '../components/drink-list-item';
import Loader from '../components/loader';
import useDataLoaded from '../hooks/data-loaded';
import { Drink } from '../types/models';

const renderItem = ({ item, navigation }) => (
  <DrinkListItem item={item} navigation={navigation} />
);

const AllDrinksScreen = ({ navigation }) => {
  const drinks = useSelector(state => state.drinks.items);
  const [dataIsLoaded] = useDataLoaded(['drinks']);

  if (!dataIsLoaded) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={drinks}
        renderItem={args => renderItem({ ...args, navigation })}
        keyExtractor={(item: Drink) => item.id}
      />
    </View>
  );
};

export default AllDrinksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF1FB',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
