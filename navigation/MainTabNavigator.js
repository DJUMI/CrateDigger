import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import AlbumDetailsScreen from '../screens/AlbumDetailsScreen';
import SearchResultsScreen from '../screens/SearchResultsScreen';

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
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
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
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SearchResultsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  AlbumDetailsStack,
  SearchResultsStack,
});

tabNavigator.path = '';

export default tabNavigator;
