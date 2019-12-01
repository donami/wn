import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import AllDrinksScreen from '../screens/all-drinks';
import MyDrinksScreen from '../screens/my-drinks';
import FavoritesScreen from '../screens/favorites';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Text from './text';

const TabBar = props => {
  const {
    renderIcon,
    getLabelText,
    activeTintColor,
    inactiveTintColor,
    onTabPress,
    onTabLongPress,
    getAccessibilityLabel,
    navigation,
  } = props;

  const { routes, index: activeRouteIndex } = navigation.state;

  return (
    <LinearGradient
      start={[0, 1]}
      end={[1, 0]}
      colors={['#F4C6A1', '#EEA18B', '#E77B77']}
      style={styles.container}
    >
      {routes.map((route, routeIndex) => {
        const isRouteActive = routeIndex === activeRouteIndex;
        const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;

        return (
          <TouchableOpacity
            key={routeIndex}
            style={
              isRouteActive
                ? [styles.tabButton, styles.tabButtonActive]
                : styles.tabButton
            }
            onPress={() => {
              onTabPress({ route });
            }}
            onLongPress={() => {
              onTabLongPress({ route });
            }}
            accessibilityLabel={getAccessibilityLabel({ route })}
          >
            {renderIcon({ route, focused: isRouteActive, tintColor })}

            <Text style={styles.text}>{getLabelText({ route })}</Text>
          </TouchableOpacity>
        );
      })}
    </LinearGradient>
  );
};

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
    tabBarComponent: TabBar,
    tabBarOptions: {
      showIcon: true,
      // showLabel: false,
      tabStyle: {
        backgroundColor: 'transparent',
      },
      labelStyle: {
        fontFamily: 'Montserrat',
      },
    },
  }
);

export default Tabs;

const styles = StyleSheet.create({
  container: { flexDirection: 'row', height: 52, elevation: 2 },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'transparent',
    borderBottomWidth: 2,
    borderStyle: 'solid',
  },
  tabButtonActive: {
    borderBottomColor: '#97C7AC',
  },
  text: { color: 'white', textTransform: 'uppercase' },
});
