import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import HomeList from '../components/HomeList';

let darkBlue = '#0b121c';
let nearWhite = '#fafafa';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.logoContainer}>
            <Image source={require("../assets/images/logo.png")} style={styles.imageContainer} />
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
        
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>New House</Text>
          </View>

          <View style={styles.listContainer}>
            <HomeList query={'New House'} />
          </View>

          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>New Techno</Text>
          </View>

          <View style={styles.listContainer}>
            <HomeList query={'New Techno'} />
          </View>

          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>New Drum n Bass</Text>
          </View>

          <View style={styles.listContainer}>
            <HomeList query={'New Drum n Bass'} />
          </View>

          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>New Acid</Text>
          </View>

          <View style={styles.listContainer}>
            <HomeList query={'New Acid'} />
          </View>

          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>New Hip-Hop</Text>
          </View>

          <View style={styles.listContainer}>
            <HomeList query={'New Hip-Hop'} />
          </View>

          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>New Electro</Text>
          </View>

          <View style={styles.listContainer}>
            <HomeList query={'New Electro'} />
          </View>

          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>New Deep House</Text>
          </View>

          <View style={styles.listContainer}>
            <HomeList query={'New Deep House'} />
          </View>
          
        </ScrollView>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

//suppress some warnings
console.disableYellowBox = true;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkBlue,
    justifyContent: 'flex-end',
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: 35,
  },
  imageContainer: {
    height: 100,
    width: 100,
    borderRadius: 50,
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
