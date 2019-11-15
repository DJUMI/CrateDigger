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

let darkBlue = '#0b121c';
let nearWhite = '#fafafa';
let seaGreen = '#009F93';

class RecommendScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUserId: undefined,
            client: undefined,
            records: undefined,
            refreshing: false,
            isLoadingComplete: false,
            cart: global.cart,
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

    render() {
        const { isLoadingComplete } = this.state;
        const { cart } = this.state;
        const { navigation } = this.props;
        if (isLoadingComplete) {
            return (
                <View style={styles.container}>

                    <DeckSwiper
                        dataSource={this.state.records}
                        renderItem={item =>
                            <View style={styles.itemContainer}>
                                <View style={styles.infoContainer}>
                                    <Text
                                        style={styles.artistText}
                                        numberOfLines={1}
                                    >
                                        {item.artist}
                                    </Text>

                                    <Text
                                        style={styles.titleText}
                                        numberOfLines={1}
                                    >
                                        {item.title}
                                    </Text>
                                </View>

                                <View style={styles.imageContainer}>
                                    <Image source={{ uri: item.image_url }} style={styles.image} />
                                </View>

                                <View style={styles.buttonContainer}>
                                    <Button
                                        rounded
                                        style={styles.button}
                                        onPress={() => {
                                            navigation.navigate('Details', {
                                                item: item,
                                                id: item.listing_id,
                                                title: item.title,
                                                artist: item.artist,
                                                label: item.label,
                                                format: item.format,
                                                styles2: item.styles2,
                                                price: item.price,
                                                image_url: item.image_url,
                                                video_url: item.video_url,
                                            });
                                        }}
                                    >
                                        <Text style={styles.buttonText}>See Details</Text>
                                    </Button>

                                    <Button
                                        rounded
                                        style={styles.button}
                                        onPress={() => {
                                            cart.push(item);
                                            Alert.alert('Added!')
                                            console.log(cart)
                                        }}
                                    >
                                        <Text style={styles.buttonText}>+ Add to Cart</Text>
                                    </Button>
                                </View>
                            </View>
                        }
                    />
                </View>

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

RecommendScreen.navigationOptions = {
    header: null,
};

export default withNavigation(RecommendScreen);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkBlue,
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
      height: 70,
    },
    artistText: {
      fontSize: 20,
      color: darkBlue,
    },
    titleText: {
      fontSize: 25,
      color: darkBlue,
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
    activityContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });