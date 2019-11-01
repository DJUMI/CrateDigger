import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';

import { withNavigation } from 'react-navigation';

import { Stitch, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";

class HomeList extends Component {
  state = {
    isLoadingComplete: true,
  }

  constructor(props) {
    super(props);
    this.state = {
      currentUserId: undefined,
      client: undefined,
      records: undefined,
      refreshing: false,
      isLoadingComplete: true
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
    records
      .find({ label: "RCA" }, { sort: { listing_id: -1 }, limit: 20 })
      .asArray()
      .then(records => {
        this.setState({ records });
      })
      .catch(err => {
        console.warn(err);
      });
  }

  renderItem = ({ item }) => {
    const { navigation, data } = this.props;
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          navigation.navigate('Details', {
            title: item.title,
            artist: item.artist,
            label: item.label,
            format: item.format,
            price: item.price,
            image_url: item.image_url,
          });
        }}
      >
        <View style={styles.itemInfoContainer}>
          <Image source={{uri:item.image_url}} style={styles.imageContainer}/* TODO *//>
          <View style={styles.itemTitleContainer}>
            <Text 
              style={styles.itemTitleText} 
              numberOfLines='1'
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
   // const { data } = this.props;
    if (isLoadingComplete) {
      return (
        <FlatList
          data={this.state.records}
          horizontal
          renderItem={this.renderItem}
        />  
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
    borderRadius: 15,
    width: 150,
    height: 150,
  },
  itemTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 30,
    padding: 5,
  },
  itemTitleText: {
    fontSize: 20,
  }
})

