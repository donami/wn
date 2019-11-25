import React from 'react';
import {
  // View,
  StyleSheet,
  ScrollView,
  StyleProp,
} from 'react-native';
// import { Image } from 'react-native-elements';
import { getDrinksLoading } from '../redux/selectors/drinks';
import { useSelector } from 'react-redux';
import { Card, Image, Subtitle, Caption, View, Title } from '@shoutem/ui';
import Loader from './loader';
import useDataLoaded from '../hooks/data-loaded';
import { getTrendingEntities } from '../redux/selectors/app';

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
            <Card
              style={{ marginRight: 10, width: 120, maxHeight: 160 }}
              key={item.id}
              onTouchEnd={() => {
                navigation.navigate('Drink', { id: item.id });
              }}
            >
              <Image
                styleName='medium-wide'
                source={{
                  uri: item.image,
                }}
              />
              <View styleName='content'>
                <Subtitle>{item.title}</Subtitle>
                {/* <Caption>21 hours ago</Caption> */}
              </View>
            </Card>
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
    // maxHeight: 120,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    padding: 20,
    marginBottom: 20,
    marginLeft: 5,
    // borderColor: '#ccc',
    // borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#F9FAFE',
    shadowColor: '#8F9AB0',
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 7,
  },
  itemTitle: {
    color: '#555',
  },
});
