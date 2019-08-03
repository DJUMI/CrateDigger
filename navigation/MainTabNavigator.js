import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import AlbumDetailsScreen from '../screens/AlbumDetailsScreen';
import SearchResultsScreen from '../screens/SearchResultsScreen';
import CartScreen from '../screens/CartScreen';
import RandomScreen from '../screens/RandomScreen';
import RecommendScreen from '../screens/RecommendScreen';
import SearchScreen from '../screens/SearchScreen';


const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';

const AlbumDetailsStack = createStackNavigator(
  {
    Details: AlbumDetailsScreen,
  },
  config
);

AlbumDetailsStack.navigationOptions = {
  tabBarLabel: 'Details',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-disc' : 'md-disc'} />
  ),
};

AlbumDetailsStack.path = '';

const SearchResultsStack = createStackNavigator(
  {
    SearchResults: SearchResultsScreen,
  },
  config
);

SearchResultsStack.navigationOptions = {
  tabBarLabel: 'Search Results',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'} />
  ),
};

SearchResultsStack.path = '';

const CartStack = createStackNavigator(
  {
    Cart: CartScreen,
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

const RandomStack = createStackNavigator(
  {
    Random: RandomScreen,
  },
  config
);

RandomStack.navigationOptions = {
  tabBarLabel: 'Dig',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-disc' : 'md-disc'} />
  ),
};

RandomStack.path = '';

const RecommendStack = createStackNavigator(
  {
    Recommed: RecommendScreen,
  },
  config
);

RecommendStack.navigationOptions = {
  tabBarLabel: 'Recommended',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-disc' : 'md-disc'} />
  ),
};

RecommendStack.path = '';

const SearchStack = createStackNavigator(
  {
    Search: SearchScreen,
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

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  SearchStack,
  RandomStack,
  RecommendStack,
  CartStack,
  AlbumDetailsStack,
  SearchResultsStack,
});

tabNavigator.path = '';

export default tabNavigator;
/* TODO: remove details and search results screen */