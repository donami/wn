import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import DrinkListItem from '../components/drink-list-item';
import { useSelector } from 'react-redux';
import { getFavoriteEntities } from '../redux/selectors/favorites';
import useDataLoaded from '../hooks/data-loaded';
import Loader from '../components/loader';
import { Drink } from '../types/models';

const renderItem = ({ item, navigation }) => (
  <DrinkListItem item={item} navigation={navigation} />
);

const FavoritesScreen = ({ navigation }) => {
  const [dataIsLoaded] = useDataLoaded(['drinks']);
  const favorites = useSelector(state => getFavoriteEntities(state));

  if (!dataIsLoaded) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites || []}
        renderItem={args => renderItem({ ...args, navigation })}
        keyExtractor={(item: Drink) => item.id}
      />
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF1FB',
  },
});
