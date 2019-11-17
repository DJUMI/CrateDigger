import React from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { Linking } from 'expo';
import { Button, Text } from 'native-base';
import { withNavigation } from 'react-navigation';

import MoreFromArtistList from '../components/MoreFromArtistList';
import MoreFromLabelList from '../components/MoreFromLabelList';

let sameartist;
let sameid;
let samelabel;
let darkBlue = '#0b121c';
let nearWhite = '#fafafa';
let seaGreen = '#009F93';

class AlbumDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: global.cart,
    };
  }

  render() {
    const { navigation } = this.props;
    const { item, listing_id, release_id, title, artist, label, format, genre, price, image_url, video_url } = {
      item: navigation.getParam('item'),
      listing_id: navigation.getParam('listing_id'),
      release_id: navigation.getParam('release_id'),
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
    sameid = release_id;
    samelabel = label;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.albumInfoContainer}>
          <View style={styles.albumInfoTextContainer}>
            <Text style={styles.infoText}>{artist}</Text>

            <Text style={styles.titleText}>{title}</Text>

            <Text style={styles.infoText}>{label}</Text>

            <Text style={styles.infoText}>{format}</Text>

            <Text style={styles.infoText}>${parseFloat(Math.round(price * 100) / 100).toFixed(2)}</Text>

            <Text style={styles.infoText}>{genre}</Text>
          </View>

          <View style={styles.imageContainer}>
            {image_url ?
              <Image
                source={{ uri: image_url }}
                style={styles.image}
              /> :
              <Image
                source={require('../assets/images/vinylstock.jpg')}
                style={styles.image}
              />
            }
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            rounded
            style={styles.button}
            onPress={() => {
              this.state.cart.push(item);
              Alert.alert('Added!')
            }}
          >
            <Text style={styles.buttonText}>+ Add to Cart</Text>
          </Button>

          {video_url ?
            <Button
              rounded
              style={styles.button}
              onPress={() => {
                Linking.openURL(video_url)
              }}
            >
              <Text style={styles.buttonText}>Listen</Text>
            </Button> :

            <Button
              disabled
              rounded
              style={styles.buttonDisabled}
              onPress={() => {
                Linking.openURL(video_url)
              }}
            >
              <Text style={styles.buttonDisabledText}>Listen</Text>
            </Button>
          }

        </View>


        <View style={styles.listHeader}>
          <Text style={styles.listHeaderText}>More from this artist</Text>
        </View>

        <View style={styles.listContainer}>
          <MoreFromArtistList
            key={navigation.getParam('key')}
          />
        </View>

        <View style={styles.listHeader}>
          <Text style={styles.listHeaderText}>More from this Label</Text>
        </View>

        <View style={styles.listContainer}>
          <MoreFromLabelList
            key={navigation.getParam('key')}
          />
        </View>
        <View style={styles.footer}>
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

const styles = StyleSheet.create({
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
  image: {
    width: 175, 
    height: 175, 
    borderRadius: 2   
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingBottom:15,
    paddingTop: 10,
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
  buttonDisabled: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: darkBlue,
    width: 140,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonDisabledText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
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
