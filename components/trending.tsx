import React, { useEffect } from 'react';
import { StyleSheet, ScrollView, StyleProp } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { Image, View, Title } from '@shoutem/ui';
import { getTrendingLoading } from '../redux/selectors/drinks';
import Loader from './loader';
import useDataLoaded from '../hooks/data-loaded';
import { getTrendingEntities, getTrendingIds } from '../redux/selectors/app';
import Text from './text';
import { fetchTrending } from '../redux/actions/drinks-actions';

type Props = {
  navigation: any;
  containerStyle?: StyleProp<any>;
};
const Trending: React.FC<Props> = ({ containerStyle = {}, navigation }) => {
  const dispatch = useDispatch();

  const [dataIsLoaded] = useDataLoaded(['app']);
  const trendingItems = useSelector(state => getTrendingEntities(state));
  const trendingIds = useSelector(state => getTrendingIds(state));
  const trendingLoading = useSelector(state => getTrendingLoading(state));

  useEffect(() => {
    dispatch(fetchTrending());
  }, [trendingIds]);

  if (!dataIsLoaded) {
    return <Loader />;
  }

  return (
    <View
      style={{
        ...styles.container,
        ...containerStyle,
      }}
    >
      <Title
        style={{
          marginBottom: 5,
        }}
      >
        Trending
      </Title>
      {trendingLoading && <Loader />}
      <ScrollView style={styles.itemsContainer} horizontal>
        {(trendingItems || []).map(item => {
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.item}
              onPress={() => {
                navigation.navigate('Drink', {
                  id: item.id,
                });
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
