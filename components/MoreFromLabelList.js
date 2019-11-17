import React, { Component } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Stitch, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";
import { withNavigation } from 'react-navigation';

import { samelabel, sameid } from '../screens/AlbumDetailsScreen';

let nearWhite = '#fafafa';

class MoreFromLabelList extends Component {
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

    records
      .find({ $and: [{ label: samelabel }, { release_id: { $ne: sameid } }] }, { sort: { listing_id: -1 }, limit: 20 })
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
          navigation.push('Details', {
            item: item,
            listing_id: item.listing_id,
            release_id: item.release_id,
            title: item.title,
            artist: item.artist,
            label: item.label,
            format: item.format,
            styles: item.styles,
            price: item.price,
            image_url: item.image_url,
            video_url: item.video_url,
            key: item.listing_id,
          })

        }}
      >
        <View style={styles.itemInfoContainer}>
          {item.image_url ?
            <Image
              source={{ uri: item.image_url }}
              style={styles.imageContainer}
            /> :
            <Image
              source={require('../assets/images/vinylstock.jpg')}
              style={styles.imageContainer}
            />
          }

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
              Nothing else from this label
            </Text>
          </View>
        );
      }
      return (
        <FlatList
          data={this.state.records}
          horizontal
          renderItem={this.renderItem}
        />
      );
    }
    else {
      return (
        <View style={styles.container}>
          <View style={styles.activityContainer}>
            <ActivityIndicator />
          </View>
        </View>
      );
    }
  }
}

export default withNavigation(MoreFromLabelList);

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
    alignItems: 'center',
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

