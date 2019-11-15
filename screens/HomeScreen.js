import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';

import { SearchBar } from 'react-native-elements';

import StaffPicksList from '../components/StaffPicksList';
import WhatsNewList from '../components/WhatsNewList';
import HomeList from '../components/HomeList';

let darkBlue = '#0b121c';
let nearWhite = '#fafafa';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserId: undefined,
      client: undefined,
      tasks: undefined,
      refreshing: false,
      search: "",
      cart: global.cart,
    };
  }
  

  updateSearch = search => {
    this.setState({ search });
  }

  render() {
    const { search } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles2.container}>
        <ScrollView style={styles2.contentContainer}>
          <View style={styles2.logoContainer}>
            <Image source={require("../assets/images/logo.jpg")} style={styles2.imageContainer}/>
          </View>

          <View style={styles2.listHeader}>
            <Text style={styles2.listHeaderText}>What's New</Text>
          </View>

          <View style={styles2.listContainer}>
            <HomeList query={'Whats New'} />
          </View>

          <View style={styles2.listHeader}>
            <Text style={styles2.listHeaderText}>Staff Picks</Text>
          </View>

          <View style={styles2.listContainer}>
            <HomeList query={'Staff Picks'} />
          </View>

          <View style={styles2.listHeader}>
            <Text style={styles2.listHeaderText}>New House</Text>
          </View>

          <View style={styles2.listContainer}>
            <HomeList query={'New House'} />
          </View>

          <View style={styles2.listHeader}>
            <Text style={styles2.listHeaderText}>New Techno</Text>
          </View>

          <View style={styles2.listContainer}>
            <HomeList query={'New Techno'} />
          </View>

          <View style={styles2.listHeader}>
            <Text style={styles2.listHeaderText}>New Hip-Hop</Text>
          </View>

          <View style={styles2.listContainer}>
            <HomeList query={'New Hip-Hop'} />
          </View>

          <View style={styles2.listHeader}>
            <Text style={styles2.listHeaderText}>New Electro</Text>
          </View>

          <View style={styles2.listContainer}>
            <HomeList query={'New Electro'} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};
/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5EEED',
    justifyContent: 'flex-end',
  },
  contentContainer: {
    paddingTop: 30,
    
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
*/

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkBlue,
    justifyContent: 'flex-end',
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: 25,
  },
  imageContainer: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  contentContainer: {
  },
  listHeader: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  listHeaderText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: nearWhite,
  },
  listContainer: {
    height: 195,
    paddingTop: 5,
    marginBottom: 10,
  },
});
