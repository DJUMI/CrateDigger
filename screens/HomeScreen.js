import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';

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
    return (
      <View style={styles.container}>
        <ScrollView style={styles.contentContainer}>
          <View style={styles.logoContainer}>
            <Image source={require("../assets/images/logo.jpg")} style={styles.imageContainer}/>
          </View>

          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>What's New</Text>
          </View>

          <View style={styles.listContainer}>
            <HomeList query={'Whats New'} />
          </View>

          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>Staff Picks</Text>
          </View>

          <View style={styles.listContainer}>
            <HomeList query={'Staff Picks'} />
          </View>   
        </ScrollView>
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
