import React from 'react';
import { 
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';

import { DeckSwiper } from 'native-base';
import { Stitch, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";

export default class RandomScreen extends React.Component {

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
          .aggregate({ status: "For Sale" }, { $sample: { size: 100 } })  // Commented this lineout to
                                                                             // see if it's the problem
          // .find({ status: "For Sale" }, { sort: { listing_id: -1 }, limit: 20 })
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
        console.log("HII")
        return(
            <View style={styles.itemContainer}>
                <View style={styles.infoContainer}>
                    <Text style={styles.artistText}>{item.artist}</Text>
                    <Text style={styles.titleText}>{item.title}</Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image source={{uri: item.image_url}} style={styles.image}/>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
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
                        <Text style={styles.buttonText}>See Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                        /* TODO: Add to Cart */
                        }}
                    >
                        <Text style={styles.buttonText}>+ Add to Cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    
    render() {
        console.log(this.state.records)
        return(
            <View style={styles.container}>
                <DeckSwiper
                    dataSource = {[this.state.records]}
                    // dataSource= {[  /* TODO: get random */
                    //     {key: 'Devin'},
                    //     {key: 'Jackson'},
                    //     {key: 'James'},
                    //     {key: 'Joel'},
                    //     {key: 'John'},
                    //     {key: 'Jillian'},
                    //     {key: 'Jimmy'},
                    //     {key: 'Julie'},
                    // ]}                   
                    renderItem={this.renderItem}
                >   
                </DeckSwiper>
            </View>
        );
    }
}

RandomScreen.navigationOptions = {
    title: 'Random',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5EEED',
        paddingTop: 55,
        paddingHorizontal: 10,
    },
    itemContainer: {
        flex: 1,
        backgroundColor: '#ACB3B2',
    },
    infoContainer: {
        paddingVertical: 10,
        paddingLeft: 15,
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
})