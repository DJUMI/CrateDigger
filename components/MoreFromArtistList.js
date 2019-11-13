import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import { withNavigation } from 'react-navigation';
import { Stitch, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";

import { sameartist, sameid } from '../screens/AlbumDetailsScreen';

class MoreFromArtistList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserId: undefined,
      client: undefined,
      records: undefined,
      refreshing: false,
      isLoadingComplete: false,
    };
    this.loadClient = this.loadClient.bind(this);
  }

  componentDidMount() {
    this.loadClient();
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    if (Stitch.hasAppClient("crate-digger-stitch-sikln")) {
      const app = Stitch.getAppClient("crate-digger-stitch-sikln");
      this.loadData(app);
    } else {
      Stitch.initializeAppClient("crate-digger-stitch-sikln")
      .then(app => this.loadData(app))
      .catch(err => console.error(err));
    }
  };

  loadClient() {
    if (Stitch.hasAppClient("crate-digger-stitch-sikln")) {
      const app = Stitch.getAppClient("crate-digger-stitch-sikln");
      this.loadData(app);
    } else {
      Stitch.initializeAppClient("crate-digger-stitch-sikln")
      .then(app => this.loadData(app))
      .catch(err => console.error(err));
    }
  }

  loadData(appClient) {
    const mongoClient = appClient.getServiceClient(
      RemoteMongoClient.factory,
      "mongodb-atlas"
    );
    const db = mongoClient.db("crate-digger");
    const records = db.collection("music-0");
    const { id, artist } = this.props;
    records
      .find({ $and: [ {artist: sameartist }, {listing_id: {$ne: sameid}}] }, { sort: { listing_id: -1 }, limit: 20 })
      .asArray()
      .then(records => {
        this.setState({ records });
        this.setState({ isLoadingComplete: true });
      })
      .catch(err => {
        console.warn(err);
      });
  }

  renderItem = ({ item }) => {
    const { navigation } = this.props;
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          navigation.navigate('Details', {
            item: item,
            id: item.listing_id,
            title: item.title,
            artist: item.artist,
            label: item.label,
            format: item.format,
            price: item.price,
            image_url: item.image_url,
            key: Math.random () * 10000
          })
        }}
      >
        <View style={styles.itemInfoContainer}>
          <Image source={{uri:item.image_url}} style={styles.imageContainer}/>
          <View style={styles.itemTitleContainer}>
            <Text 
              style={styles.itemTitleText} 
              numberOfLines={1}
            >
              {item.title}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { isLoadingComplete } = this.state;
    if (isLoadingComplete) {
      if (this.state.records.length == 0) {
        return (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Nothing else from this artist
            </Text>
          </View>
        );
      }
      return (
        <FlatList
          data={this.state.records}
          horizontal
          renderItem={this.renderItem}
          keyExtractor={(item, listing_id) => listing_id.toString()}
        />  
      );
    }
    else {
      return (
        <View style={styles.container}>
          <View style={styles.activityContainer}>
            <ActivityIndicator/>
          </View>
        </View>
      );
    }
  }
}

export default withNavigation(MoreFromArtistList);

const styles = StyleSheet.create({
  itemContainer: {
   flex: 1,
   paddingTop: 5,
   alignItems: 'center',
   justifyContent: 'center',
  },
  itemInfoContainer: {
    alignItems: 'center',
    marginRight: 15,
  },
  imageContainer: {
    borderRadius: 15,
    width: 150,
    height: 150,
  },
  itemTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    padding: 5,
  },
  itemTitleText: {
    fontSize: 20,
  },
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: 85,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 15,
  },
})

