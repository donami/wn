import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Animated,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import DrinkListItem from '../components/drink-list-item';
import Loader from '../components/loader';
import useDataLoaded from '../hooks/data-loaded';
import { Drink } from '../types/models';
import { Icon } from 'react-native-elements';
import { DropDownMenu, Button, Text } from '@shoutem/ui';
import BottomAd from '../components/bottom-ad';

const renderItem = ({ item, navigation }) => (
  <DrinkListItem item={item} navigation={navigation} />
);

const AllDrinksScreen = ({ navigation }) => {
  const allDrinks: Drink[] = useSelector(state => state.drinks.items);
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [dataIsLoaded] = useDataLoaded(['drinks', 'tags']);
  const [isHidden, setIsHidden] = useState(true);
  const [bounceValue, setBounceValue] = useState(new Animated.Value(200));
  const tags = useSelector(state => state.tags.items);

  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    setDrinks(allDrinks);
  }, [allDrinks]);

  useEffect(() => {
    if (selectedCategory) {
      setDrinks(
        allDrinks.filter(drink => {
          return drink.tags.indexOf(selectedCategory.title.toLowerCase()) > -1;
        })
      );
    } else {
      setDrinks(allDrinks);
    }
  }, [selectedCategory]);

  const toggleSubview = () => {
    let toValue = 200;
    if (isHidden) {
      toValue = 0;
    }

    //This will animate the transalteY of the subview between 0 & 100 depending on its current state
    //100 comes from the style below, which is the height of the subview.
    Animated.spring(bounceValue, {
      toValue: toValue,
      velocity: 3,
      tension: 2,
      friction: 8,
    }).start();

    setIsHidden(!isHidden);
  };

  if (!dataIsLoaded) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={{ flex: 1 }}
        data={drinks}
        renderItem={args => renderItem({ ...args, navigation })}
        keyExtractor={(item: Drink) => item.id}
      />
      <View style={[styles.fixedView, { bottom: isHidden ? 25 : 225 }]}>
        <Icon
          style={styles.fab}
          onPress={() => {
            toggleSubview();
          }}
          name='filter'
          type='font-awesome'
          raised
          color='#517fa4'
          reverse
        />
      </View>
      <Animated.View
        style={[styles.subView, { transform: [{ translateY: bounceValue }] }]}
      >
        <Text style={{ fontSize: 20, padding: 15 }}>Filter</Text>
        {tags && !!tags.length && (
          <DropDownMenu
            styleName='horizontal'
            options={tags}
            selectedOption={selectedCategory ? selectedCategory : tags[0]}
            onOptionSelected={tag => {
              setSelectedCategory(tag);
            }}
            titleProperty='title'
            valueProperty='tag.id'
          />
        )}
        <Button
          styleName='secondary'
          style={{
            margin: 20,
          }}
          onPress={() => {
            setDrinks(allDrinks);
          }}
        >
          <Text>CLEAR</Text>
        </Button>
      </Animated.View>
      <BottomAd />
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
  fab: {
    marginHorizontal: 10,
  },
  fixedView: {
    position: 'absolute',
    right: 25,
    bottom: 25,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  subView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    height: 200,
  },
});
