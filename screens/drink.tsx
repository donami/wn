import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Text from '../components/text';
import DrinkWrapper from '../components/drink-wrapper';
import useDrink from '../hooks/use-drink';
import { SimpleHtml } from '@shoutem/ui';
import { View } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';

const paddingVertical = 10;
const paddingHorizontal = 40;

const Drink = createBottomTabNavigator(
  {
    Instructions: {
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => {
          return <Icon type='font-awesome' name='list-ol' color={tintColor} />;
        },
      },
      screen: (props: any) => {
        const { drink } = useDrink();
        return (
          <DrinkWrapper {...props}>
            <View
              style={{
                flexGrow: 1,
                paddingHorizontal,
                paddingVertical: 0,
              }}
            >
              {drink && drink.description && (
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
              )}
            </View>
          </DrinkWrapper>
        );
      },
    },
    Ingredients: {
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => {
          return <Icon type='font-awesome' name='list' color={tintColor} />;
        },
      },
      screen: (props: any) => {
        const { ingredients } = useDrink();

        return (
          <DrinkWrapper {...props}>
            <View
              style={{
                flex: 1,
                paddingHorizontal,
                paddingVertical,
              }}
            >
              <Text>Ingredients</Text>
              {!ingredients ||
                (!ingredients.length && (
                  <Text>There is no ingredients added for this drink.</Text>
                ))}
              {ingredients && !!ingredients.length && (
                <React.Fragment>
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
                </React.Fragment>
              )}
            </View>
          </DrinkWrapper>
        );
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#fff',
      inactiveTintColor: '#fff',
      activeBackgroundColor: '#5D9060',
      inactiveBackgroundColor: '#7FC583',
      labelStyle: {
        fontFamily: 'Montserrat',
        textTransform: 'uppercase',
      },
    },
  }
);

export default Drink;
