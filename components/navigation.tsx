import React from 'react';

import { Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Tabs from './tabs';
import DrinkScreen from '../screens/drink';
import AboutScreen from '../screens/about';
import HeaderScreen from '../screens/header';
import SearchScreen from '../screens/search';
import SettingsScreen from '../screens/settings';

const RootStack = createStackNavigator(
  {
    Home: {
      screen: Tabs,
      navigationOptions: {
        header: () => <HeaderScreen />,
      },
    },
    Drink: { screen: DrinkScreen, navigationOptions: { header: null } },
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
