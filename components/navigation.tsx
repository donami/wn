import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Tabs from './tabs';
import AboutScreen from '../screens/about';
import HeaderScreen from '../screens/header';
import SearchScreen from '../screens/search';
import SettingsScreen from '../screens/settings';
import DrinkBottomNavigator from '../screens/drink';

const RootStack = createStackNavigator(
  {
    Home: {
      screen: Tabs,
      navigationOptions: ({ navigation }) => ({
        header: props => {
          return <HeaderScreen />;
        },
      }),
    },
    Drink: {
      screen: DrinkBottomNavigator,
      navigationOptions: {
        header: null,
      },
    },
    About: { screen: AboutScreen },
    Search: { screen: SearchScreen },
  },
  {
    headerMode: 'screen',
  }
);

const DrawerNavigation = createDrawerNavigator({
  Home: RootStack,
  Settings: {
    screen: SettingsScreen,
  },
});

export default createAppContainer(DrawerNavigation);
