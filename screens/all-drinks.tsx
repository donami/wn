import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Animated } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import DrinkListItem from '../components/drink-list-item';
import Loader from '../components/loader';
import useDataLoaded from '../hooks/data-loaded';
import { Drink, Ingredient } from '../types/models';
import { Icon } from 'react-native-elements';
import { DropDownMenu, Button, Text } from '@shoutem/ui';
import BottomAd from '../components/bottom-ad';
import { getIngredientItems } from '../redux/selectors/ingredients';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { fetchMoreDrinks } from '../redux/actions/drinks-actions';
import { getDrinkItems, getDrinksLoadingMore } from '../redux/selectors/drinks';

const renderItem = ({ item, navigation }) => (
  <DrinkListItem item={item} navigation={navigation} />
);

const AllDrinksScreen = ({ navigation }) => {
  const allDrinks: Drink[] = useSelector(state => getDrinkItems(state));
  const loadingMore: boolean = useSelector(state =>
    getDrinksLoadingMore(state)
  );
  const allIngredients: Ingredient[] = useSelector(state =>
    getIngredientItems(state)
  );
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [dataIsLoaded] = useDataLoaded(['drinks']);
  const [isHidden, setIsHidden] = useState(true);
  const [bounceValue, setBounceValue] = useState(new Animated.Value(300));
  const dispatch = useDispatch();

  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [allSelectedIngredients, setAllSelectedIngredients] = useState<
    Ingredient[]
  >([]);

  useEffect(() => {
    setDrinks(allDrinks);
  }, [allDrinks]);

  useEffect(() => {
    if (selectedIngredient) {
      const alreadyExists = allSelectedIngredients.find(ingredient => {
        return ingredient.id === selectedIngredient.id;
      });

      if (!alreadyExists) {
        setAllSelectedIngredients([
          ...allSelectedIngredients,
          selectedIngredient,
        ]);
      }
    }
  }, [selectedIngredient]);

  useEffect(() => {
    if (allSelectedIngredients.length > 0) {
      const ingredientIds = allSelectedIngredients.map(
        ingredient => ingredient.id
      );
      const filteredDrinks = allDrinks.filter(drink => {
        const hasIngredient = drink.ingredients.find(
          ingredient => ingredientIds.indexOf(ingredient.ingredient as any) > -1
        );

        return hasIngredient;
      });

      setDrinks(filteredDrinks);
    }
  }, [allSelectedIngredients]);

  const toggleSubview = () => {
    let toValue = 300;
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
        onEndReached={() => {
          dispatch(fetchMoreDrinks());
        }}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        ListFooterComponent={
          <>
            {loadingMore && (
              <View
                style={{
                  position: 'relative',
                  paddingVertical: 20,
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                <Loader />
              </View>
            )}
          </>
        }
      />

      <View
        style={[styles.fixedView, { bottom: isHidden ? 25 : 325 }]}
        onTouchStart={() => {
          toggleSubview();
        }}
      >
        <Icon
          style={styles.fab}
          name='filter'
          type='font-awesome'
          raised
          color='#7FC583'
          reverse
        />
      </View>
      <Animated.View
        style={[styles.subView, { transform: [{ translateY: bounceValue }] }]}
      >
        <Text style={{ fontSize: 20, padding: 15 }}>Filter</Text>
        {allSelectedIngredients && !!allSelectedIngredients.length && (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: 10,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {allSelectedIngredients.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.tag}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                onPress={() => {
                  setAllSelectedIngredients(
                    allSelectedIngredients.filter(ingredient => {
                      return ingredient.id !== item.id;
                    })
                  );
                }}
              >
                <Text style={styles.tagText}>{item.title}</Text>
                <Icon
                  name='times'
                  type='font-awesome'
                  size={16}
                  color='white'
                />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {allIngredients && !!allIngredients.length && (
          <DropDownMenu
            styleName='horizontal'
            options={allIngredients}
            selectedOption={
              selectedIngredient ? selectedIngredient : allIngredients[0]
            }
            onOptionSelected={item => {
              setSelectedIngredient(item);
            }}
            titleProperty='title'
            valueProperty='ingredient.id'
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
    height: 300,
  },
  tag: {
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#7FC583',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagText: {
    marginRight: 5,
    color: 'white',
  },
});
