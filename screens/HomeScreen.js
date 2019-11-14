import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
<<<<<<< Updated upstream
import StaffPicksList from '../components/StaffPicksList';
import WhatsNewList from '../components/WhatsNewList';
=======

import HomeList from '../components/HomeList';
>>>>>>> Stashed changes

export default class HomeScreen extends React.Component {

  render() {
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
            lightTheme
            /* TODO: implement search */
          />
          
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>What's New</Text>
          </View>
  
          <View style={styles.listContainer}/* TODO Later : return list of newest releases */>
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
  
          <View style={styles.listContainer}/* TODO LATER: return list of most sold records in past month*/>
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
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5EEED',
    justifyContent: 'flex-end',
  },
  contentContainer: {
    paddingTop: 30,
    justifyContent: 'flex-end',
  },
  getStartedContainer: {
    alignItems: 'center',
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
    backgroundColor: '#E5EEED',
    paddingVertical: 5,
  },
  listHeaderText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  listContainer: {
    height: 195,
    backgroundColor: '#ACB3B2',
    borderTopWidth: 1,
    borderTopColor: '#727776',
    borderBottomWidth: 1,
    borderBottomColor: '#727776',
    paddingTop: 5,
  },
});
