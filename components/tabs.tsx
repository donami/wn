import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import AllDrinksScreen from '../screens/all-drinks';
import MyDrinksScreen from '../screens/my-drinks';

const Tabs = createMaterialTopTabNavigator({
  MyDrinks: {
    screen: MyDrinksScreen,
    navigationOptions: {
      title: 'My Drinks',
    },
  },
  AllDrinks: {
    screen: AllDrinksScreen,
    navigationOptions: {
      title: 'All Drinks',
    },
  },
});

export default Tabs;
