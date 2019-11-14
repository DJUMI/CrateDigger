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

let nearWhite = '#fafafa';

class HomeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserId: undefined,
      client: undefined,
      records: undefined,
      refreshing: false,
      isLoadingComplete: false,
      query: null,
    };
    this.loadClient = this.loadClient.bind(this);
  }

  componentDidMount() {
    this.setQuery();
    this.loadClient();
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    if (Stitch.hasAppClient("crate-digger-stitch-sikln")) {
      const app = Stitch.getAppClient("crate-digger-stitch-sikln");
      this.loadData(app, this.state.query);
    } else {
      Stitch.initializeAppClient("crate-digger-stitch-sikln")
      .then(app => this.loadData(app, this.state.query))
      .catch(err => console.error(err));
    }
  };

  setQuery() {
    const { query } = this.props;
    console.log(query);
    switch(query) {
      case 0:
        this.setState({query: { status: "For Sale" }});
        console.log(this.state.query);
        break;
      case 1:
        this.setState({query: { label: "RCA" }});
        console.log(this.state.query);
        break;
      case 2:
        this.setState({query: { $and: [ {artist: sameartist }, {listing_id: {$ne: sameid}}] }});
        console.log(this.state.query);
        break;
      case 3:
        this.setState({query: { $and: [ {label: samelabel }, {listing_id: {$ne: sameid}}]}});
    }  
  }

  loadClient() {
    if (Stitch.hasAppClient("crate-digger-stitch-sikln")) {
      const app = Stitch.getAppClient("crate-digger-stitch-sikln");
      this.loadData(app, this.state.query);
    } else {
      Stitch.initializeAppClient("crate-digger-stitch-sikln")
      .then(app => this.loadData(app, this.state.query))
      .catch(err => console.error(err));
    }
  }

  loadData(appClient, query) {
    const mongoClient = appClient.getServiceClient(
      RemoteMongoClient.factory,
      "mongodb-atlas"
    );
    const db = mongoClient.db("crate-digger");
    const records = db.collection("music-0");
    const { id, artist } = this.props;
    console.log(this.state.query);
    records
      .find(query, { sort: { listing_id: -1 }, limit: 20 })
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
            styles: item.styles,
            image_url: item.image_url,
            video_url: item.video_url,
            key: Math.random () * 10000
          })
        }}
      >
        <View style={styles.itemInfoContainer}>
          <Image 
            source={{uri: item.image_url}}
            style={styles.imageContainer}
          />
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
      if (!this.state.records.length) {
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
          keyExtractor={(listing_id) => listing_id.toString()}
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

export default withNavigation(HomeList);

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
    borderRadius: 2,
    width: 150,
    height: 150,
  },
  itemTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    paddingHorizontal: 1,
    paddingVertical: 7,
  },
  itemTitleText: {
    fontSize: 15,
    color: nearWhite,
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
    color: nearWhite,
  },
})