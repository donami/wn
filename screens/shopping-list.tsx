import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import Text from '../components/text';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from 'react-native-elements';

import { getShoppingListItems } from '../redux/selectors/shopping-list';
import {
  getIngredientsLoading,
  getIngredientsLoaded,
} from '../redux/selectors/ingredients';
import Loader from '../components/loader';
import { fetchIngredients } from '../redux/actions/drinks-actions';
import {
  removeIngredientFromList,
  removeShoppingList,
} from '../redux/actions/shopping-list-actions';
import ShoppingListItem from '../components/shopping-list-item';

type Props = {
  navigation: any;
};
const ShoppingListScreen: React.FC<Props> = ({ navigation }) => {
  const items = useSelector(state => getShoppingListItems(state));
  const loaded = useSelector(state => getIngredientsLoaded(state));
  const loading = useSelector(state => getIngredientsLoading(state));
  const dispatch = useDispatch();

  if (!loaded) {
    dispatch(fetchIngredients());
  }

  if (loading) {
    return <Loader />;
  }

  const handleRemoveIngredient = (drinkId: string, ingredientId: string) => {
    dispatch(removeIngredientFromList({ drinkId, ingredientId }));
    ToastAndroid.showWithGravity(
      'Ingredient removed.',
      ToastAndroid.LONG,
      ToastAndroid.TOP
    );
  };

  const handleRemoveList = (drinkId: string) => {
    dispatch(removeShoppingList({ drinkId }));
    ToastAndroid.showWithGravity(
      'List removed.',
      ToastAndroid.LONG,
      ToastAndroid.TOP
    );
  };

  const handleItemPress = (drinkId: string) => {
    navigation.navigate('Drink', { id: drinkId });
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.top}>
        <View style={styles.backButton}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Icon name='chevron-left' color='white' size={40} />
          </TouchableOpacity>
        </View>
        <View style={styles.pageTitle}>
          <Text style={{ color: '#fff', fontSize: 30 }}>Shopping List</Text>
        </View>
      </View>
      <ScrollView style={styles.container}>
        {!items.length && <Text>Your shopping list is empty.</Text>}

        {!!items.length && (
          <>
            <View style={{ flex: 1 }}>
              {items.map((item, index) => (
                <View key={index} style={styles.list}>
                  <View style={styles.listHeading}>
                    <TouchableOpacity
                      onPress={() => handleItemPress(item.drinkId)}
                    >
                      <Text style={{ fontSize: 24 }}>{item.title}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        handleRemoveList(item.drinkId);
                      }}
                    >
                      <Icon name='times' type='font-awesome' color='#7FC583' />
                    </TouchableOpacity>
                  </View>

                  <View>
                    {item.lineItems.map((lineItem, key) => (
                      <ShoppingListItem
                        key={`${lineItem.ingredient.id}`}
                        item={lineItem}
                        onDelete={() => {
                          handleRemoveIngredient(
                            item.drinkId,
                            lineItem.ingredient.id
                          );
                        }}
                      />
                    ))}
                  </View>
                </View>
              ))}
            </View>
            <View style={{ marginBottom: 40 }}></View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default ShoppingListScreen;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#EEF1FB',
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 40,
    flexGrow: 1,
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 0,
    backgroundColor: '#EEA18B',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  backButton: {
    flexGrow: 0,
    display: 'flex',
    alignItems: 'center',
    marginRight: 20,
  },
  pageTitle: {
    flex: 1,
  },
  list: {
    marginBottom: 20,
  },
  listHeading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});
