import React from 'react';
import { StyleSheet, View, ImageBackground, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite } from '../redux/actions/favorite-actions';
import { getFavoriteItems } from '../redux/selectors/favorites';
import { selectDrink } from '../redux/actions/drinks-actions';
import { getSelectedDrinkId } from '../redux/selectors/drinks';
import Loader from '../components/loader';
import Text from '../components/text';
import useDataLoaded from '../hooks/data-loaded';
import BottomAd from '../components/bottom-ad';
import useDrink from '../hooks/use-drink';

const paddingVertical = 10;
const paddingHorizontal = 40;

type Props = { navigation: any };
const DrinkWrapper: React.FC<Props> = ({ navigation, children }) => {
  const [dataIsLoaded] = useDataLoaded(['drinks']);

  const selectedId = useSelector(state => getSelectedDrinkId(state));
  const favorites = useSelector(state => getFavoriteItems(state));

  const { drink } = useDrink();

  const dispatch = useDispatch();

  if (!dataIsLoaded) {
    return <Loader />;
  }
  if (selectedId !== navigation.getParam('id')) {
    dispatch(selectDrink(navigation.getParam('id')));
  }

  return (
    <React.Fragment>
      <ScrollView style={{ flex: 1 }}>
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
                      borderRadius: 100,
                      height: 52,
                      width: 52,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onTouchStart={() => {
                      navigation.goBack(null);
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
              {children}
            </View>
          </React.Fragment>
        )}
      </ScrollView>
      <View
        style={{
          flex: 1,
          maxHeight: '10%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <BottomAd />
      </View>
    </React.Fragment>
  );
};

export default DrinkWrapper;

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
