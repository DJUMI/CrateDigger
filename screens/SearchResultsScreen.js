import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import SearchResultsList from '../components/SearchResultsList';

export default function SearchResultsScreen() {
  return (
    <View style={styles.container}>
      <SearchResultsList
            data={[
              {key: 'Devin'},
              {key: 'Jackson'},
              {key: 'James'},
              {key: 'Joel'},
              {key: 'John'},
              {key: 'Jillian'},
              {key: 'Jimmy'},
              {key: 'Julie'},
            ]}
      />
    </View>

  );
  
}

SearchResultsScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
})
