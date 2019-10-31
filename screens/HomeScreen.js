import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import StaffPicksList from '../components/StaffPicksList';
import WhatsNewList from '../components/WhatsNewList';

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUserId: undefined,
      client: undefined,
      tasks: undefined,
      refreshing: false,
      search: "",
    };
  }

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

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
            onChangeText={this.updateSearch}
            value={search}
            style={styles.input}
            onChangeText={search => this.setState({ search })}
            value={this.state.search}
            onSubmitEditing={() => this.handleSubmit()}
          />
          
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>What's New</Text>
          </View>
  
          <View style={styles.listContainer}/* TODO Later : return list of newest releases */>
            <WhatsNewList/>
          </View>
          
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>Staff Picks</Text>
          </View>
  
          <View style={styles.listContainer}/* TODO LATER: return list of most sold records in past month*/>
            <StaffPicksList/>
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
  sectionContentContainer: {
    paddingHorizontal: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "lightgray"
  },
  sectionContentText: {
    color: "black",
    fontSize: 15,
    paddingBottom: 10,
    paddingHorizontal: 10,
    textAlign: "left"
  },
});
