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
import ShoppingListScreen from '../screens/shopping-list';
// import { Easing, Animated } from 'react-native';

// const transitionConfig = () => {
//   return {
//     transitionSpec: {
//       duration: 400, // how long the transition will take
//       easing: Easing.bounce, // easing function to use (https://facebook.github.io/react-native/docs/easing.html)
//       timing: Animated.timing, // the type of animation to use (timing, spring, decay)
//       useNativeDriver: true, // delegate all the animation related work to the native layer
//     },
//     screenInterpolator: sceneProps => {
//       // next: add code for customizing the transition animation
//     },
//   };
// };

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
    // transitionConfig,
    headerMode: 'screen',
  }
);

const DrawerNavigation = createDrawerNavigator({
  Home: RootStack,
  Settings: {
    screen: SettingsScreen,
  },
  ShoppingList: {
    screen: ShoppingListScreen,
    navigationOptions: () => ({ title: 'Shopping List' }),
  },
});

export default createAppContainer(DrawerNavigation);
