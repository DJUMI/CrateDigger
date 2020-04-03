import React from 'react';
import { createAppContainer } from 'react-navigation';

import tabNavigator from './src/MainTabNavigator';

const App = createAppContainer(tabNavigator);

export default () => {
  return (
    <App />
  );
}