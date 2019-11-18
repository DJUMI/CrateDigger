import React from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

import { Stitch, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";
import { Button, Text } from 'native-base';
import Drawer from 'react-native-drawer';
import { SearchBar, Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';

import FilterDrawer from '../components/FilterDrawer';

let darkBlue = '#0b121c';
let nearWhite = '#fafafa';

class SearchScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: global.cart,
            currentUserId: undefined,
            client: undefined,
            drawerDisabled: false,
            drawerOpen: false,
            isLoadingComplete: false,
            query: '',
            mPrice: 100,
            records: undefined,
            tasks: undefined,
        };
        this.loadClient = this.loadClient.bind(this);
    }

    componentDidMount() {
        this.loadClient();
    }

    onRefresh() {
        this.setState({ isLoadingComplete: false });
        if (Stitch.hasAppClient("crate-digger-stitch-sikln")) {
            const app = Stitch.getAppClient("crate-digger-stitch-sikln");
            this.loadData(app);
        } else {
            Stitch.initializeAppClient("crate-digger-stitch-sikln")
                .then(app => this.loadData(app))
                .catch(err => console.error(err));
        }
    }

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
        const { query, mPrice } = this.state;

        const db = mongoClient.db("crate-digger");
        const records = db.collection("music-0");

        records
            .find({
                $and: [{
                    $or: [{ label: { $regex: query, '$options': 'i' } },
                    { artist: { $regex: query, '$options': 'i' } },
                    { title: { $regex: query, '$options': 'i' } }]
                },
                { price: { $lte: mPrice } }]
            },
                {
                    sort: { listing_id: -1 },
                    limit: 100
                })
            .asArray()
            .then(records => {
                this.setState({ records });
                this.setState({ isLoadingComplete: true });
                this.setState({ isSearching: false });
            })
            .catch(err => {
                console.warn(err);
            });
    }

    handleSearch = text => {
        this.setState({ query: text });
    };

    handleSubmit = () => {
        
        this.onRefresh();
    };

    closeDrawer = () => {
        this._drawer.close();
    };

    openDrawer = () => {
        this._drawer.open();
    };

    renderItem = ({ item }) => {
        const { navigation } = this.props;

        return (
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => {
                    navigation.navigate('Details', {
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
        const { query, records, isLoadingComplete, isSearching } = this.state;
        if (isLoadingComplete) {
            //no search results
            if (!records.length) {
                return (
                    <View style={styles.container}>
                        <Drawer
                            ref={(ref) => this._drawer = ref}
                            type="displace"
                            content={
                                <FilterDrawer closeDrawer={this.closeDrawer} />
                            }
                            acceptDoubleTap
                            onOpen={() => {
                                console.log('onopen')
                                this.setState({ drawerOpen: true })
                            }}
                            onClose={() => {
                                console.log('onclose')
                                this.setState({ drawerOpen: false })
                            }}
                            captureGestures={false}
                            tweenDuration={100}
                            panThreshold={0.08}
                            disabled={this.state.drawerDisabled}
                            openDrawerOffset={(viewport) => {
                                return 100
                            }}
                            closedDrawerOffset={() => 0}
                            panOpenMask={0.2}
                            negotiatePan
                        >
                            <View style={styles.headerContainer}>
                                <SearchBar
                                    placeholder="Search title, artist, or label..."
                                    round
                                    darkTheme
                                    onChangeText={this.handleSearch}
                                    value={query}
                                    containerStyle={styles.searchBarContainer}
                                    onSubmitEditing={() => this.handleSubmit()}
                                />

                                <View style={styles.buttonContainer}>
                                    <Button
                                        style={styles.filterButton}
                                        onPress={() => { this._drawer.open() }}
                                    >
                                        <Text style={styles.filterButtonText}>Filter</Text>
                                    </Button>
                                </View>
                            </View>

                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>
                                    Sorry there are no items that match your search.
                                </Text>
                            </View>
                        </Drawer>
                    </View>
                );
            } else {
                //display results
                return (
                    <View style={styles.container}>
                        <Drawer
                            ref={(ref) => this._drawer = ref}
                            type="displace"
                            content={
                                <FilterDrawer closeDrawer={this.closeDrawer} />
                            }
                            acceptDoubleTap
                            onOpen={() => {
                                console.log('onopen')
                                this.setState({ drawerOpen: true })
                            }}
                            onClose={() => {
                                console.log('onclose')
                                this.setState({ drawerOpen: false })
                            }}
                            captureGestures={false}
                            tweenDuration={100}
                            panThreshold={0.08}
                            disabled={this.state.drawerDisabled}
                            openDrawerOffset={(viewport) => {
                                return 100
                            }}
                            closedDrawerOffset={() => 0}
                            panOpenMask={0.2}
                            negotiatePan
                        >
                            <View style={styles.headerContainer}>
                                <SearchBar
                                    placeholder="Search title, artist, or label..."
                                    round
                                    darkTheme
                                    onChangeText={this.handleSearch}
                                    value={query}
                                    containerStyle={styles.searchBarContainer}
                                    onSubmitEditing={() => this.handleSubmit()}
                                />

                                <View style={styles.buttonContainer}>
                                    <Button
                                        style={styles.filterButton}
                                        onPress={() => { this._drawer.open() }}
                                    >
                                        <Text style={styles.filterButtonText}>Filter</Text>
                                    </Button>
                                </View>
                            </View>

                            <ScrollView>
                                <FlatList
                                    data={records}
                                    renderItem={this.renderItem}
                                />
                            </ScrollView>
                        </Drawer>
                    </View>
                );
            }
        } else {
            //loading
            return (
                <View style={styles.container}>
                    <Drawer
                        ref={(ref) => this._drawer = ref}
                        type="displace"
                        content={
                            <FilterDrawer closeDrawer={this.closeDrawer} />
                        }
                        acceptDoubleTap
                        onOpen={() => {
                            console.log('onopen')
                            this.setState({ drawerOpen: true })
                        }}
                        onClose={() => {
                            console.log('onclose')
                            this.setState({ drawerOpen: false })
                        }}
                        captureGestures={false}
                        tweenDuration={100}
                        panThreshold={0.08}
                        disabled={this.state.drawerDisabled}
                        openDrawerOffset={(viewport) => {
                            return 100
                        }}
                        closedDrawerOffset={() => 0}
                        panOpenMask={0.2}
                        negotiatePan
                    >
                        <View style={styles.headerContainer}>
                            <SearchBar
                                placeholder="Search title, artist, or label..."
                                round
                                darkTheme
                                onChangeText={this.handleSearch}
                                value={query}
                                containerStyle={styles.searchBarContainer}
                                onSubmitEditing={() => this.handleSubmit()}
                            />

                            <View style={styles.buttonContainer}>
                                <Button
                                    style={styles.filterButton}
                                    onPress={() => { this._drawer.open() }}
                                >
                                    <Text style={styles.filterButtonText}>Filter</Text>
                                </Button>
                            </View>
                        </View>

                        <View style={styles.activityContainer}>
                            <ActivityIndicator />
                        </View>
                    </Drawer>
                </View>
            );
        }
    }
}

SearchScreen.navigationOptions = {
    header: null,
};

export default withNavigation(SearchScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: darkBlue,
    },
    searchBarContainer: {
        paddingTop: 25,
    },
    searchBar: {
        backgroundColor: darkBlue,
    },
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
    emptyContainer: {
        alignContent: 'center',
        paddingTop: 40,
    },
    emptyText: {
        fontSize: 15,
        color: nearWhite,
        alignSelf: 'center',
    },
    headerContainer: {
        paddingTop: 25,
        flexDirection: 'row',
    },
    searchBarContainer: {
        flex: 4,
        borderRadius: 7,
    },
    drawerContainer: {
        backgroundColor: darkBlue,
    },
    buttonContainer: {
        flex: 1,
        paddingHorizontal: 5,
        justifyContent: 'center',
    },
    filterButton: {
        borderWidth: 1,
        borderColor: nearWhite,
        backgroundColor: darkBlue,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 2
    },
    filterButtonText: {
        fontSize: 15,
    },
    activityContainer: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        paddingTop: 85,
    },
});