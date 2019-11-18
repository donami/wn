import React from 'react';
import { StyleSheet, View, ImageBackground, ScrollView } from 'react-native';
import { Icon, ListItem, Image } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { getIngredientsForDrink } from '../redux/selectors/drinks';
import { addFavorite } from '../redux/actions/favorite-actions';
import { getFavoriteItems } from '../redux/selectors/favorites';
import { selectDrink } from '../redux/actions/drinks-actions';
import { Title, SimpleHtml } from '@shoutem/ui';
import {
  getSelectedDrinkId,
  getSelectedDrink,
} from '../redux/selectors/drinks';
import Loader from '../components/loader';
import Text from '../components/text';
import useDataLoaded from '../hooks/data-loaded';

const paddingVertical = 10;
const paddingHorizontal = 40;

const DrinkScreen = ({ navigation }) => {
  const [dataIsLoaded] = useDataLoaded(['drinks']);

  const selectedId = useSelector(state => getSelectedDrinkId(state));
  const drink = useSelector(state => getSelectedDrink(state));
  const favorites = useSelector(state => getFavoriteItems(state));
  const ingredients = useSelector(state => getIngredientsForDrink(state));

  const dispatch = useDispatch();

  if (!dataIsLoaded) {
    return <Loader />;
  }
  if (selectedId !== navigation.getParam('id')) {
    dispatch(selectDrink(navigation.getParam('id')));
  }

  // return (
  //   <ScrollView>
  //     <View style={{ backgroundColor: 'red', flex: 1, padding: 20 }}></View>
  //     <View style={{ backgroundColor: 'green', flexGrow: 1, padding: 20 }}>
  //       <View style={{ backgroundColor: 'yellow', minHeight: 400 }}>
  //         <Text>Inner</Text>
  //       </View>
  //     </View>
  //     <View style={{ backgroundColor: 'purple', flex: 1, padding: 20 }}>
  //       <View style={{ backgroundColor: 'yellow', minHeight: 400 }}>
  //         <Text>Inner</Text>
  //       </View>
  //     </View>
  //   </ScrollView>
  // );
  return (
    <ScrollView>
      {drink && (
        <React.Fragment>
          <View style={styles.topContainer}>
            <ImageBackground
              source={{ uri: drink.image }}
              style={{
                width: '100%',
                height: '90%',
                flex: 1,
                justifyContent: 'space-between',
              }}
              imageStyle={{
                resizeMode: 'cover',
                alignSelf: 'flex-end',
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  maxHeight: 50,
                  marginTop: 10,
                  flexDirection: 'row',
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    left: 20,
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    // padding: 20,
                    borderRadius: 100,
                    height: 52,
                    width: 52,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Icon
                    name='chevron-left'
                    type='font-awesome'
                    iconStyle={{ color: '#fff' }}
                  />
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  position: 'relative',
                  alignItems: 'center',
                  maxHeight: '20%',
                  flexDirection: 'row',
                }}
              >
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'white',
                    maxWidth: '30%',
                    flexDirection: 'row',
                    marginHorizontal: 20,
                    borderRadius: 20,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 5,
                    },
                    shadowOpacity: 0.34,
                    shadowRadius: 6.27,
                    elevation: 10,
                  }}
                >
                  <Text style={{ marginRight: 10 }}>4.5</Text>
                  <Icon name='star' type='font-awesome' color='#FFC700' />
                </View>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    alignItems: 'flex-end',
                    paddingHorizontal: 20,
                  }}
                >
                  <Icon
                    raised
                    name={
                      (favorites || []).indexOf(drink.id) > -1
                        ? 'favorite'
                        : 'favorite-border'
                    }
                    color='#f50'
                    onPress={() => {
                      dispatch(addFavorite(drink.id));
                    }}
                  />
                </View>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.contentContainer}>
            <Text
              style={{
                fontSize: 20,
                paddingHorizontal,
                paddingVertical,
              }}
            >
              {drink.title}
            </Text>
            {drink.description && (
              <View
                style={{
                  flexGrow: 1,
                  paddingHorizontal,
                  paddingVertical: 0,
                }}
              >
                <SimpleHtml
                  style={{
                    margin: 0,
                    padding: 0,
                  }}
                  body={drink.description}
                  customTagStyles={{
                    p: { marginBottom: 10, lineHeight: 22 },
                  }}
                />
              </View>
            )}

            {ingredients && (
              <View
                style={{
                  flex: 1,
                  paddingHorizontal,
                  paddingVertical,
                }}
              >
                <Text>Ingredients</Text>
                {ingredients.map((item, index) => {
                  return (
                    <ListItem
                      key={index}
                      leftAvatar={{
                        source: {
                          uri: item.ingredient.image,
                        },
                        title: item.ingredient.title[0],
                      }}
                      title={item.ingredient.title}
                      subtitle={item.amount}
                      bottomDivider
                    />
                  );
                })}
              </View>
            )}
          </View>
        </React.Fragment>
      )}
    </ScrollView>
  );
};

export default DrinkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  imageView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer: {
    flex: 1,
    minHeight: 250,
  },
  contentContainer: {
    flex: 1,
  },
});

// TODO: remove below
// useEffect(() => {
//   const drinkId = navigation.getParam('id');
//   const docRef = firestore.collection('drinks').doc(drinkId);

//   docRef
//     .get()
//     .then(async doc => {
//       const data = doc.data();

//       if (data.ingredients && data.ingredients.length) {
//         data.ingredients = await Promise.all(
//           data.ingredients.map(item => {
//             return item.ingredient.get().then(ingredient => {
//               const ingredientData = ingredient.data();
//               return {
//                 amount: item.amount,
//                 ingredient: {
//                   id: ingredient.id,
//                   ...ingredientData,
//                 },
//               };
//             });
//           })
//         );
//       }

//       setDrink({
//         id: drinkId,
//         ...data,
//       });

//       if (favorites && favorites.indexOf(drinkId) > -1) {
//         setIsFavorite(true);
//       }
//     })
//     .catch(e => {
//       console.warn('Unable to fetch drink with ID: ' + drinkId);
//     });
// }, []);

// useEffect(() => {
//   if (!drink || !drink.id) {
//     return;
//   }
//   // context.favorites.isFavorite(drink.id).then(status => {
//   //   setIsFavorite(status);
//   // });
// }, [drink]);
