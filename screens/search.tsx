import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import Loader from '../components/loader';
import DrinkListItem from '../components/drink-list-item';
import { Drink } from '../types/models';
import Text from '../components/text';

const renderItem = ({ item, navigation }) => (
  <DrinkListItem item={item} navigation={navigation} />
);

const SearchScreen = ({ navigation }) => {
  const results = useSelector(state => state.search.results);
  const loading = useSelector(state => state.search.loading);
  const phrase = useSelector(state => state.search.phrase);

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      {!!phrase && !results.length && (
        <Text>Your search did not match any drinks.</Text>
      )}

      {!!phrase && !!results.length && (
        <View>
          <Text>Found ({results.length}) items matching!</Text>
          <FlatList
            data={results || []}
            renderItem={args => renderItem({ ...args, navigation })}
            keyExtractor={(item: Drink) => item.id}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 40,
  },
});

export default SearchScreen;
