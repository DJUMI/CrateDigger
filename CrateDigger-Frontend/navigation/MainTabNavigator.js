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

let darkBlue = '#0b121c';
let nearWhite = '#fafafa';
let seaGreen = '#009F93';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: AlbumDetailsScreen,
    SearchResults: SearchResultsScreen,
  },
  config
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
    SearchResults: SearchResultsScreen,
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

const RandomStack = createStackNavigator(
  {
    Random: RandomScreen,
    Details: AlbumDetailsScreen,
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
    Details: AlbumDetailsScreen,
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

const CartStack = createStackNavigator(
  {
    Cart: CartScreen,
    Details: AlbumDetailsScreen,
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

AlbumDetailsScreen.navigationOptions = {
  title: 'Details'
};

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

SearchResultsScreen.navigationOptions = {
  title: 'Search Results'
};




const tabNavigator = createBottomTabNavigator({ 
  SearchStack,
  HomeStack,
  
  RandomStack,
  CartStack,
}, {
  tabBarOptions: {
    activeTintColor: seaGreen,
    activeIconColor: seaGreen,
    style: {backgroundColor: darkBlue}
  },
});

tabNavigator.path = '';

export default tabNavigator;