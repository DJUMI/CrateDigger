import React from 'react';
import { Platform } from 'react-native';

import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import AlbumDetailsScreen from '../screens/AlbumDetailsScreen';
import CartScreen from '../screens/CartScreen';
import DigScreen from '../screens/DigScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import TabBarIcon from '../components/TabBarIcon';

let darkBlue = '#0b121c';
let seaGreen = '#009F93';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: AlbumDetailsScreen,
  },
  {
    defaultNavigationOptions: {
      headerTitle: '',
      headerBackTitleVisible: 'Back',
      headerStyle: {
        backgroundColor: darkBlue,
        borderBottomWidth: 0,
      },
      headerTintColor: seaGreen,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }, config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'} />
  ),
};

HomeStack.path = '';

const SearchStack = createStackNavigator(
  {
    Search: SearchScreen,
    Details: AlbumDetailsScreen,
  },{
    defaultNavigationOptions: {
      headerTitle: '',
      headerBackTitleVisible: 'Back',
      headerStyle: {
        backgroundColor: darkBlue,
        borderBottomWidth: 0,
      },
      headerTintColor: seaGreen,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
  config
);

SearchStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'} />
  ),
};

SearchStack.path = '';

const DigStack = createStackNavigator(
  {
    Dig: DigScreen,
    Details: AlbumDetailsScreen,
  },
  {
    defaultNavigationOptions: {
      headerTitle: '',
      headerBackTitleVisible: 'Back',
      headerStyle: {
        backgroundColor: darkBlue,
        borderBottomWidth: 0,
      },
      headerTintColor: seaGreen,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
  config
);

DigStack.navigationOptions = {
  tabBarLabel: 'Dig',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-disc' : 'md-disc'} />
  ),
};

DigStack.path = '';

const CartStack = createStackNavigator(
  {
    Cart: CartScreen,
    Details: AlbumDetailsScreen,
  },
  {
    defaultNavigationOptions: {
      headerTitle: '',
      headerBackTitleVisible: 'Back',
      headerStyle: {
        backgroundColor: darkBlue,
        borderBottomWidth: 0,
      },
      headerTintColor: seaGreen,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
  config
);

CartStack.navigationOptions = {
  tabBarLabel: 'Cart',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'} />
  ),
};

CartStack.path = '';

const AlbumDetailsStack = createStackNavigator(
  {
    Details: AlbumDetailsScreen,
  }
);

AlbumDetailsStack.path = '';

AlbumDetailsScreen.navigationOptions = {
  title: 'Details'
};

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  SearchStack,
  DigStack,
  CartStack,
}, {
  tabBarOptions: {
    activeTintColor: seaGreen,
    activeIconColor: seaGreen,
    style: { backgroundColor: darkBlue }
  },
});

tabNavigator.path = '';

export default tabNavigator;