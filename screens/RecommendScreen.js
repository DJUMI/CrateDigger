import React from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';

import { withNavigation } from 'react-navigation';
import { DeckSwiper } from 'native-base';
import { Stitch, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";

class RecommendScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUserId: undefined,
            client: undefined,
            records: undefined,
            refreshing: false,
            isLoadingComplete: false,
            cart: [],
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
                                    <Text style={styles.artistText}>{item.artist}</Text>
                                    <Text style={styles.titleText}>{item.title}</Text>
                                </View>

                                <View style={styles.imageContainer}>
                                    <Image source={{ uri: item.image_url }} style={styles.image} />
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
                                            this.state.cart.push(item);
                                            console.log(cart);
                                        }}
                                    >
                                        <Text style={styles.buttonText}>+ Add to Cart</Text>
                                    </TouchableOpacity>
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
    title: 'Recommended',
};

export default withNavigation(RecommendScreen);

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
    activityContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})