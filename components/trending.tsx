import React from 'react';
import { StyleSheet, ScrollView, StyleProp } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import { Image, View, Title } from '@shoutem/ui';
import { getDrinksLoading } from '../redux/selectors/drinks';
import Loader from './loader';
import useDataLoaded from '../hooks/data-loaded';
import { getTrendingEntities } from '../redux/selectors/app';
import Text from './text';

type Props = {
  navigation: any;
  containerStyle?: StyleProp<any>;
};
const Trending: React.FC<Props> = ({ containerStyle = {}, navigation }) => {
  const loading = useSelector(state => getDrinksLoading(state));

  const [dataIsLoaded] = useDataLoaded(['drinks', 'app']);
  const trendingItems = useSelector(state => getTrendingEntities(state));

  if (!dataIsLoaded) {
    return <Loader />;
  }

  return (
    <View style={{ ...styles.container, ...containerStyle }}>
      <Title style={{ marginBottom: 5 }}>Trending</Title>
      {loading && <Loader />}
      <ScrollView style={styles.itemsContainer} horizontal>
        {(trendingItems || []).map(item => {
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.item}
              onPress={() => {
                navigation.navigate('Drink', { id: item.id });
              }}
            >
              <Image
                styleName='medium-wide'
                style={{
                  width: '100%',
                  maxWidth: '100%',
                }}
                source={{
                  uri: item.image,
                }}
              />
              <View
                style={{
                  padding: 10,
                }}
              >
                <Text>{item.title}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Trending;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 50,
  },
  itemsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  item: {
    marginRight: 10,
    backgroundColor: 'white',
    width: 120,
  },
});
