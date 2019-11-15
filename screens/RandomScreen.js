import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { withNavigation } from 'react-navigation';
import { DeckSwiper, Button, Text } from 'native-base';
import { Stitch, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";
import ActionSheet from 'react-native-actionsheet';

let darkBlue = '#0b121c';
let nearWhite = '#fafafa';
let seaGreen = '#009F93';
let genres = ['House', 'Techno', 'Hip-hop', 'Electro', 'Drum n Bass', 'Disco', 'None', 'Cancel'];

class RandomScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUserId: undefined,
      client: undefined,
      records: undefined,
      refreshing: false,
      isLoadingComplete: false,
      cart: global.cart,
      genre: null,
      recommended: false,
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
      .aggregate([{ $match: { status: "For Sale" } }, { $sample: { size: 100 } }])
      .asArray()
      .then(records => {
        this.setState({ records });
        this.setState({ isLoadingComplete: true });
      })
      .catch(err => {
        console.warn(err);
      });
  }

  showActionSheet = () => {
    this.ActionSheet.show()
  }

  render() {
    const { isLoadingComplete } = this.state;
    const { cart } = this.state;
    const { navigation } = this.props;
    if (isLoadingComplete) {
      return (
        <View style={styles2.container}>
          <DeckSwiper
            dataSource={this.state.records}
            renderItem={item =>
              <View style={styles2.itemContainer}>
                <View style={styles2.infoContainer}>
                  <Text
                    style={styles2.artistText}
                    numberOfLines={1}
                  >
                    {item.artist}
                  </Text>

                  <Text
                    style={styles2.titleText}
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>
                </View>

                <View style={styles2.imageContainer}>
                  <Image source={{ uri: item.image_url }} style={styles2.image} />
                </View>

                <View style={styles2.buttonContainer}>
                  <Button
                    rounded
                    style={styles2.button}
                    onPress={() => {
                      navigation.navigate('Details', {
                        item: item,
                        id: item.listing_id,
                        title: item.title,
                        artist: item.artist,
                        label: item.label,
                        format: item.format,
                        styles: item.styles,
                        price: item.price,
                        image_url: item.image_url,
                        video_url: item.video_url,
                      });
                    }}
                  >
                    <Text style={styles2.buttonText}>See Details</Text>
                  </Button>

                  <Button
                    rounded
                    style={styles2.button}
                    onPress={() => {
                      cart.push(item);
                      Alert.alert('Added!')
                      console.log(cart)
                    }}
                  >
                    <Text style={styles2.buttonText}>+ Add to Cart</Text>
                  </Button>
                </View>
              </View>
            }
          />
          <View style={styles2.filterButtonContainer}>
            <Button
              style={styles2.genreButton}
              onPress={this.showActionSheet}
            >
              <Text style={styles2.filterButtonText}>Genre</Text>
            </Button>
            
            <ActionSheet
              ref={o => this.ActionSheet = o}
              options={genres}
              cancelButtonIndex={7}
              destructiveButtonIndex={6}
              style={styles2.actionSheet}
              onPress={(index) => { 
                if(index==6) this.setState({genre: null})
                else this.setState({genre: genres[index]})
              }}
            />

            <Button
              style={
                this.state.recommended
                        ? styles2.recommendedButtonOn
                        : styles2.recommendedButton
                
              }
              onPress={() => {
                this.setState({recommended: !this.state.recommended})
              }}
            >
              <Text style={styles2.filterButtonText}>Recommended</Text>
            </Button>
          </View>
        </View>
      );
    }
    else {
      return (
        <View style={styles2.container}>
          <View style={styles2.activityContainer}>
            <ActivityIndicator />
          </View>
        </View>
      );
    }
  }
}

RandomScreen.navigationOptions = {
  header: null,
};

export default withNavigation(RandomScreen);

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5EEED',
    paddingTop: 90,
    paddingHorizontal: 10,
  },
  itemContainer: {
    flex: 1,
    backgroundColor: '#ACB3B2',
  },
  infoContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderLeftWidth: .5,
    borderTopWidth: .5,
    borderRightWidth: .5,
    borderColor: '#727776',
    height: 70,
  },
  artistText: {
    fontSize: 20,
  },
  titleText: {
    fontSize: 25,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
    height: 300,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: .5,
    borderBottomWidth: .5,
    borderRightWidth: .5,
    borderColor: '#727776',
    height: 70,
  },
  button: {
    borderWidth: 1,
    borderColor: '#800909',
    backgroundColor: '#DF3561',
    margin: 15,
    width: 130,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingTop: 2,
  },
  buttonText: {
    flex: 1,
    fontSize: 15,
  },
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})*/

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkBlue,
    paddingTop: 90,
    paddingHorizontal: 10,
  },
  itemContainer: {
    flex: 1,
    backgroundColor: darkBlue,
  },
  infoContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    height: 70,
  },
  artistText: {
    fontSize: 20,
    color: nearWhite,
  },
  titleText: {
    fontSize: 25,
    color: nearWhite,
  },
  imageContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  image: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
    height: 300,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  button: {
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
  filterButtonContainer: {
    paddingVertical: 60,
    marginTop: 450,
    flexDirection: 'row',
    paddingHorizontal: 40,
    justifyContent: 'space-between',
  },
  genreButton: {
    borderWidth: 1,
    borderColor: nearWhite,
    backgroundColor: darkBlue,
    width: 100,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  recommendedButton: {
    borderWidth: 1,
    borderColor: nearWhite,
    backgroundColor: darkBlue,
    width: 135,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  recommendedButtonOn: {
    borderWidth: 1,
    borderColor: nearWhite,
    backgroundColor: seaGreen,
    width: 135,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  filterButtonText: {
    fontSize: 15,
    color: nearWhite,
  },
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});