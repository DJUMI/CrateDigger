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
  let pic = {
    uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.albumInfoContainer}>
        <Text style={styles.artistText}>Artist Name</Text>
        <Text style={styles.titleText}>Release Name</Text>
        <Text style={styles.labelText}>Label Name</Text>
        <View style={styles.imageContainer}>
          <Image source={pic} style={{width: 200, height: 200, borderRadius: 15}}/>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          /* Add to Cart */
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
    backgroundColor: '#5bdfd5',
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
    paddingVertical: 5,
  },
  button: {
    borderWidth: 1,
    borderColor: '#800909',
    backgroundColor: 'red',
    marginBottom: 10,
    marginLeft: 15,
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
