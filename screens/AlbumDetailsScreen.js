import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { withNavigation } from 'react-navigation';
import { Linking } from 'expo';
import { Button, Text } from 'native-base';

import MoreFromArtistList from '../components/MoreFromArtistList';
import MoreFromLabelList from '../components/MoreFromLabelList';
import HomeList from '../components/HomeList';

let sameartist;
let samelabel;
let sameid;
let darkBlue = '#0b121c';
let nearWhite = '#fafafa';
let seaGreen = '#009F93';


class AlbumDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserId: undefined,
      client: undefined,
      records: undefined,
      refreshing: false,
      isLoadingComplete: false,
      needRefresh: false,
      cart: global.cart,
    };
  }

  render() {
    const { navigation } = this.props;
    const { item, id, title, artist, label, format, genre, price, image_url, video_url } = {
      item: navigation.getParam('item'),
      id: navigation.getParam('id'),
      title: navigation.getParam('title'),
      artist: navigation.getParam('artist'),
      label: navigation.getParam('label'),
      format: navigation.getParam('format'),
      genre: navigation.getParam('styles'),
      price: navigation.getParam('price'),
      image_url: navigation.getParam('image_url'),
      video_url: navigation.getParam('video_url'),
    };

    sameartist = artist;
    samelabel = label;
    sameid = id;

    return (
      <ScrollView style={styles2.container}>
        <View style={styles2.albumInfoContainer}>
          <View style={styles2.albumInfoTextContainer}>
            <Text style={styles2.infoText}>{artist}</Text>

            <Text style={styles2.titleText}>{title}</Text>

            <Text style={styles2.infoText}>{label}</Text>

            <Text style={styles2.infoText}>{format}</Text>

            <Text style={styles2.infoText}>${parseFloat(Math.round(price * 100) / 100).toFixed(2)}</Text>

            <Text style={styles2.infoText}>{genre}</Text>
          </View>

          <View style={styles2.imageContainer}>
            <Image source={{ uri: image_url }} style={{ width: 175, height: 175, borderRadius: 2 }} />
          </View>
        </View>

        <View style={styles2.buttonContainer}>
          <Button 
            rounded
            style={styles2.button}
            onPress={() => {
              this.state.cart.push(item);
              Alert.alert('Added!')
              console.log(this.state.cart)
            }}
          >
            <Text style={styles2.buttonText}>+ Add to Cart</Text>
          </Button>

          <Button
            rounded
            style={styles2.button}
            onPress={() => {
              Linking.openURL(video_url)
            }}
          >
            <Text style={styles2.buttonText}>Listen</Text>
          </Button>
        </View>


        <View style={styles2.listHeader}>
          <Text style={styles2.listHeaderText}>More from this artist</Text>
        </View>

        <View style={styles2.listContainer}>
          <MoreFromArtistList
            key={navigation.getParam('key')}
          />
        </View>

        <View style={styles2.listHeader}>
          <Text style={styles2.listHeaderText}>More from this Label</Text>
        </View>

        <View style={styles2.listContainer}>
          <MoreFromLabelList
            key={navigation.getParam('key')}
          />
        </View>
        <View style={styles2.footer}>
        </View>
      </ScrollView>
    );
  }
}

export { sameartist, samelabel, sameid };

AlbumDetailsScreen.navigationOptions = {
  header: null,
};

export default withNavigation(AlbumDetailsScreen);

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5EEED',
  },
  albumInfoContainer: {
    margin: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
  },
  albumInfoTextContainer: {
    flex: 1,
    paddingRight: 2,
  },
  infoText: {
    fontSize: 17,
  },
  titleText: {
    fontSize: 22,
  },
  infoText: {
    fontSize: 17,
  },
  imageContainer: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
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
}); */

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkBlue,
  },
  albumInfoContainer: {
    margin: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
  },
  albumInfoTextContainer: {
    flex: 1,
    paddingRight: 3,
  },
  infoText: {
    fontSize: 17,
    color: nearWhite,
  },
  titleText: {
    fontSize: 22,
    color: nearWhite,
  },
  imageContainer: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
  },
  button: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: seaGreen,
    width: 140,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: nearWhite,
  },
  listHeader: {
    alignItems: 'center',
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
  footer: {
    height: 50,
  },
});
