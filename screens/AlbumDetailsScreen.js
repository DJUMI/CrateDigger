import React from 'react';
import { 
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';

<<<<<<< Updated upstream
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
      cart: global.cart,
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
=======
import HomeList from '../components/HomeList';
>>>>>>> Stashed changes

export default class AlbumDetailsScreen extends React.Component {
  
  render() {
<<<<<<< Updated upstream
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
=======
    const { navigation, data } = this.props;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.albumInfoContainer}>
          <Text style={styles.artistText}/* TODO */>Artist Name</Text>
          <Text style={styles.titleText}/* TODO */>Release Name</Text>
          <Text style={styles.labelText}/* TODO */>Label Name</Text>
          <Text style={styles.labelText}/* TODO */>Format</Text>
          <Text style={styles.labelText}/* TODO */>Price</Text>
>>>>>>> Stashed changes
          <View style={styles.imageContainer}>
            <Image source={require('../assets/images/vinyl.jpg')} style={{width: 175, height: 175, borderRadius: 15}}/* TODO: Later *//>
          </View>
        </View>
<<<<<<< Updated upstream

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.state.cart.push(item);
            console.log(this.state.cart)
          }}
        >
          <Text style={styles.buttonText}>+ Add to Cart</Text>
        </TouchableOpacity>

=======
  
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              /* TODO: Add to Cart */
            }}
          >
            <Text style={styles.buttonText}>+ Add to Cart</Text>
          </TouchableOpacity>
  
>>>>>>> Stashed changes
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
