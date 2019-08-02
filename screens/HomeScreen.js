import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { SearchBar } from 'react-native-elements';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import HomeList from '../components/HomeList';

export default function HomeScreen() {

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>

        <View style={styles.getStartedContainer}>
          <Text style={styles.shopText}>JiggyJamz</Text>
          <Text style={styles.appNameText}>Crate Digger</Text>
        </View>
        
        <SearchBar
          placeholder="Type here..."
          round
          containerStyle={styles.searchBarContainer}
          //lightTheme
        />
        
        <View style={styles.listHeader}>
          <Text style={styles.listHeaderText}>What's New</Text>
        </View>

        <View style={styles.listContainer}>
          <HomeList
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
        
        <View style={styles.listHeader}>
          <Text style={styles.listHeaderText}>What's Hot</Text>
        </View>

        <View style={styles.listContainer2}>
          <HomeList
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
          


      </View>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5bdfd5',
    justifyContent: 'flex-end',
  },
  contentContainer: {
    paddingTop: 30,
    justifyContent: 'flex-end',
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  shopText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  appNameText: {
    fontSize: 20,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  searchBarContainer: {
  },
  listHeader: {
    alignItems: 'center',
    backgroundColor: '#9FB6B4',
    paddingTop: 10,
  },
  listHeaderText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  listContainer: {
    height: 195,
    backgroundColor: '#9FB6B4',
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  listContainer2: {
    height: 195,
    backgroundColor: '#9FB6B4',
  }
});
