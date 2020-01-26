import React, { useEffect } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import DrinkListItem from '../components/drink-list-item';
import { useSelector, useDispatch } from 'react-redux';
import { getFavoriteEntities } from '../redux/selectors/favorites';
import useDataLoaded from '../hooks/data-loaded';
import Loader from '../components/loader';
import { Drink } from '../types/models';
import { Text } from '@shoutem/ui';
import BottomAd from '../components/bottom-ad';
import { fetchFavorites } from '../redux/actions/drinks-actions';

const renderItem = ({ item, navigation }) => (
  <DrinkListItem item={item} navigation={navigation} />
);

const FavoritesScreen = ({ navigation }) => {
  const [dataIsLoaded] = useDataLoaded(['drinks']);
  const favorites = useSelector(state => getFavoriteEntities(state));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavorites());
  }, []);

  if (!dataIsLoaded) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      {!!favorites.length && (
        <FlatList
          data={favorites || []}
          renderItem={args => renderItem({ ...args, navigation })}
          keyExtractor={(item: Drink) => item.id}
        />
      )}
      {!favorites.length && (
        <View style={styles.noFavorites}>
          <Text>You do not have any favorites added yet. </Text>

          <Text style={{ marginVertical: 10 }}>
            Add a favorite by clicking on the heart on the drink page.
          </Text>
        </View>
      )}
      <BottomAd />
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF1FB',
  },
  noFavorites: {
    backgroundColor: 'white',
    padding: 15,
    margin: 40,
  },
});
