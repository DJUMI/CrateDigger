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

import { Icon } from 'react-native-elements';

import { Stitch, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";

let darkBlue = '#0b121c';
let nearWhite = '#fafafa';

class SearchResultsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserId: undefined,
      client: undefined,
      records: undefined,
      refreshing: false,
      isLoadingComplete: false,
      cart: [],
      searchString: undefined
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

    if (this.props.navigation.state.params != null) {
      searchString = this.props.navigation.state.params; //.trim(); // trim user response (FROM)
    } else {
      searchString = 'Kanye West'
    }
    console.log(this.props.navigation)
    const db = mongoClient.db("crate-digger");
    const records = db.collection("music-0");
    records
      .find({$or: [ {label: { $regex: searchString , '$options' : 'i' }} , 
      {artist: { $regex: searchString , '$options' : 'i'}} , 
      {title: { $regex: searchString, '$options' : 'i' }}] } )
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
    const { navigation, data } = this.props;
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          navigation.navigate('Details', {
            id: item.listing_id,
            title: item.title,
            artist: item.artist,
            label: item.label,
            format: item.format,
            price: item.price,
            image_url: item.image_url,
            key: Math.random() * 10000
          })

        }}
      >
        <View style={styles.itemInfoContainer}>
          <Image source={{uri:item.image_url}} style={styles.imageContainer}/* TODO */ />
          <View style={styles.itemTitleContainer}>
            <Text
              style={styles.itemOtherText}
              numberOfLines={1}
            >
              {item.artist}
            </Text>

            <Text
              style={styles.itemTitleText}
              numberOfLines={1}
            >
              {item.title}
            </Text>

            <Text
              style={styles.itemOtherText}
              numberOfLines={1}
            >
              Label Name Year
            </Text>

            <Text
              style={styles.itemOtherText}
              numberOfLines={1}
            >
              {item.format}
            </Text>
          </View>
          <View style={styles.arrowContainer}>
            <Icon
              name='chevron-thin-right'
              type='entypo'
              size='40'
              color={nearWhite} />
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
              No Results
            </Text>
          </View>
        );
      }
      return (
        <FlatList
          data={this.state.records}
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

export default withNavigation(SearchResultsList);

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
  },
  itemInfoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: darkBlue,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: nearWhite,
  },
  imageContainer: {
    borderRadius: 2,
    width: 90,
    height: 90,
    marginLeft: 5,
    alignSelf: 'center',
  },
  itemTitleContainer: {
    height: 90,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 5,
    width: 240,
  },
  itemOtherText: {
    fontSize: 15,
    padding: 1,
    color: nearWhite,
  },
  itemTitleText: {
    fontSize: 20,
    padding: 1,
    color: nearWhite,
  },
  arrowContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 90,
    marginRight: 5,
  },
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
})