import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Menu from './components/menu';
import Content from './components/content';
import Footer from './components/footer';
import MyDrinksScreen from './screens/my-drinks';
import AllDrinksScreen from './screens/all-drinks';
import Tabs from './components/tabs';
import HomeScreen from './screens/home';
import AboutScreen from './screens/about';
import DrinkScreen from './screens/drink';

// const App = props => {
//   return (
//     <View style={styles.container}>
//       <Menu />
//       <Content />
//       <Footer />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'stretch',
//     flexDirection: 'column',
//     justifyContent: 'center',
//   },
// });

// export default App;

const RootStack = createStackNavigator({
  Home: { screen: Tabs },
  Drink: { screen: DrinkScreen },
  About: { screen: AboutScreen },
});

export default createAppContainer(RootStack);
