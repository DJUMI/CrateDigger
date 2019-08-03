import React from 'react';
import { 
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';

import HomeList from '../components/HomeList';

export default function AlbumDetailsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.albumInfoContainer}>
        <Text style={styles.artistText}/* TODO */>Artist Name</Text>
        <Text style={styles.titleText}/* TODO */>Release Name</Text>
        <Text style={styles.labelText}/* TODO */>Label Name Year</Text>
        <Text style={styles.labelText}/* TODO */>Format</Text>
        <View style={styles.imageContainer}>
          <Image source={require('../assets/images/vinyl.jpg')} style={{width: 175, height: 175, borderRadius: 15}}/* TODO *//>
        </View>
      </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            /* TODO: Add to Cart */
          }}
        >
          <Text style={styles.buttonText}>+ Add to Cart</Text>
        </TouchableOpacity>

      <View style={styles.listHeader}>
          <Text style={styles.listHeaderText}>More from this artist</Text>
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
          <Text style={styles.listHeaderText}>More from this Label</Text>
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
        <View style={styles.footer}>
        </View>
    </ScrollView>
  );
}

AlbumDetailsScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#E5EEED',
  },
  albumInfoContainer: {
    margin: 5,
    paddingLeft: 10,
  },
  artistText: {
    fontSize: 20,
  },
  titleText: {
    fontSize: 25,
  },
  labelText: {
    fontSize: 20,
  },
  imageContainer: {
    //paddingVertical: 5,
  },
  button: {
    borderWidth: 1,
    borderColor: '#800909',
    backgroundColor: '#DF3561',
    marginBottom: 5,
    marginLeft: 40,
    width: 120,
    height: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    flex: 1,
    fontSize: 15,
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
  footer: {
    height: 50,
    backgroundColor: '#E5EEED',
  },
});
