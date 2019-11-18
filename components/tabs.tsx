import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import AllDrinksScreen from '../screens/all-drinks';
import MyDrinksScreen from '../screens/my-drinks';
import FavoritesScreen from '../screens/favorites';
import { Icon } from 'react-native-elements';

const Tabs = createMaterialTopTabNavigator(
  {
    MyDrinks: {
      screen: MyDrinksScreen,

      navigationOptions: {
        title: 'Home',
        tabBarIcon: () => {
          return (
            <Icon
              type='font-awesome'
              name='home'
              iconStyle={{ color: 'white' }}
            />
          );
        },
      },
    },
    AllDrinks: {
      screen: AllDrinksScreen,
      navigationOptions: {
        title: 'All Drinks',
        tabBarIcon: () => {
          return (
            <Icon
              name='glass-wine'
              type='material-community'
              iconStyle={{ color: 'white' }}
            />
          );
        },
      },
    },
    Favorites: {
      screen: FavoritesScreen,
      navigationOptions: {
        title: 'Favorites',
        tabBarIcon: () => {
          return (
            <Icon
              type='font-awesome'
              name='heart'
              iconStyle={{ color: 'white' }}
            />
          );
        },
      },
    },
  },
  {
    tabBarOptions: {
      showIcon: true,
      // showLabel: false,
      tabStyle: {
        backgroundColor: '#333E43',
      },
      labelStyle: {
        fontFamily: 'Montserrat',
      },
    },
  }
);

export default Tabs;
