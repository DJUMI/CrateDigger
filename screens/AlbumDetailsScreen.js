import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';

import { withNavigation } from 'react-navigation';
import MoreFromArtistList from '../components/MoreFromArtistList';
import MoreFromLabelList from '../components/MoreFromLabelList';

let sameartist;
let samelabel;
let sameid;

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
      cart: [],
    };
    //this.loadClient = this.loadClient.bind(this);
  }
  componentDidMount () {
    const {navigation} = this.props;
    navigation.addListener ('willFocus', () =>
      this.setState({needRefresh: true})
    );
    }

  needRefresh() {
    this.setState({
      needRefresh: true,
    });
    this.render();
    console.log("okaybutt");
  }

  cancelRefresh() {
    this.setState({
      needRefresh: false,
    });
  }

  render() {
    const { navigation } = this.props;
    const { id, title, artist, label, format, price, image_url } = {
      id: navigation.getParam('id'),
      title: navigation.getParam('title'),
      artist: navigation.getParam('artist'),
      label: navigation.getParam('label'),
      format: navigation.getParam('format'),
      price: navigation.getParam('price'),
      image_url: navigation.getParam('image_url'),
    };

    sameartist = artist;
    samelabel = label;
    sameid = id;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.albumInfoContainer}>
          <Text style={styles.artistText}>{artist}</Text>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.labelText}>{label}</Text>
          <Text style={styles.labelText}>{format}</Text>
          <Text style={styles.labelText}>${parseFloat(Math.round(price * 100) / 100).toFixed(2)}</Text>
          <View style={styles.imageContainer}>
            <Image source={{ uri: image_url }} style={{ width: 175, height: 175, borderRadius: 15 }} />
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            /* TODO: Add to Cart */
            //this.state.cart.push(item);
            //console.log(cart);
          }}
        >
          <Text style={styles.buttonText}>+ Add to Cart</Text>
        </TouchableOpacity>

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
