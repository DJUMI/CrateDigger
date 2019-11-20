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
import Accordion from 'react-native-collapsible/Accordion';
import { ButtonGroup, CheckBox, Icon, SearchBar, Slider } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';

let darkBlue = '#0b121c';
let darkGray = '#393e42';
let lightGray = '#43484d';
let nearWhite = '#fafafa';
let seaGreen = '#009F93';

class SearchScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSections: [],
            cart: global.cart,
            checkedFormats: {
                '7"': false,
                '10"': false,
                '12"': false,
                'LP': false,
                'CD': false,
                'Cass': false,
            },
            checkedSort: 0,
            currentUserId: undefined,
            client: undefined,
            formatQuery: [],
            isLoadingComplete: false,
            query: '',
            records: undefined,
            sortQuery: { listing_id: -1 },
            tasks: undefined,
            value: 100,
        };
        this.loadClient = this.loadClient.bind(this);
        this.updateSort = this.updateSort.bind(this);
        this.updateFormat = this.updateFormat.bind(this);
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
        console.log("loadData start")
        const mongoClient = appClient.getServiceClient(
            RemoteMongoClient.factory,
            "mongodb-atlas"
        );
        const { query, value, formatQuery, sortQuery } = this.state;

        const db = mongoClient.db("crate-digger");
        const records = db.collection("music-0");

        records
            .find({
                $and: [{
                    $or: [{ label: { $regex: query, '$options': 'i' } },
                    { artist: { $regex: query, '$options': 'i' } },
                    { title: { $regex: query, '$options': 'i' } }]
                },
                { price: { $lte: value } },
                /* $or: [{format: 'LP'},
                    {format: '12\"'}
                ]},*/
            ]
            },
                {
                    sort: sortQuery, limit: 100,
                })
            .asArray()
            .then(records => {
                this.setState({ records });
                console.log("loadData end")
                this.setState({ isLoadingComplete: true });
                this.setState({ isSearching: false });
            })
            .catch(err => {
                console.warn(err);
            });
    }

    //this needs work
    handleApply = () => {
        console.log("handleApply start");
        this.getSortQuery();
        this.setState({activeSections: []});
        //console.log("handleApply: ",this.state.formatQuery);
    };

    handleClear = () => {
        this.setState({
            checkedFormats: {
                '7"': false,
                '10"': false,
                '12"': false,
                'LP': false,
                'CD': false,
                'Cass': false,
            }, checkedSort: 0,
            value: 100
        });
        this.handleApply();
    };

    handleSearch = text => {
        this.setState({ query: text });
    };

    handleSubmit = () => {
        this.onRefresh();
    };

    updateSections = activeSections => {
        this.setState({ activeSections });
    };

    //sort filters
    getSortQuery() {
        console.log("getSortQuery start");
        const { checkedSort } = this.state;
        console.log("checkedSort: ", this.state.checkedSort);
        if(!checkedSort) {
            this.setState({ sortQuery: { listing_id: -1 }});
        } else if (checkedSort == 1) { 
            this.setState({ sortQuery: { price: -1 }});
        } else {
            this.setState({ sortQuery: { release_id: -1 }});
        }
        console.log("sortQuery: ", this.state.sortQuery);
        this.getFormatQuery();
    }

    updateSort(index) {
        this.setState({ checkedSort: index });
    }

    renderSort() {
        const { checkedSort } = this.state;

        return(
            <View style={styles.checkBoxContainer}>
                <CheckBox
                    checkedColor={nearWhite}
                    checked={checkedSort == 0}
                    containerStyle={styles.checkBox}
                    iconRight
                    onPress={() => this.updateSort(0)}
                    right
                    textStyle={styles.checkBoxText}
                    title='Newest'
                    uncheckedColor={nearWhite}
                />

                <CheckBox
                    checkedColor={nearWhite}
                    checked={checkedSort == 1}
                    containerStyle={styles.checkBox}
                    iconRight
                    onPress={() => this.updateSort(1)}
                    right
                    textStyle={styles.checkBoxText}
                    title='Price'
                    uncheckedColor={nearWhite}
                />

                <CheckBox
                    checkedColor={nearWhite}
                    checked={checkedSort == 2}
                    containerStyle={styles.checkBox}
                    iconRight
                    onPress={() => this.updateSort(2)}
                    right
                    textStyle={styles.checkBoxText}
                    title='Release Date'
                    uncheckedColor={nearWhite}
                />
            </View>
        );
    }

    //this needs work
    getFormatQuery() {
        console.log("getFormatQuery start");
        console.log("sortQuery from getFormatQuery(): ", this.state.sortQuery);
        this.setState({formatQuery: []})
        const { checkedFormats, formatQuery } = this.state;
        for (let e in checkedFormats) {
            if (checkedFormats[e]) {
                formatQuery.push(['filter', e]);
            }
        }
        console.log("getFormatQuery: ",this.state.formatQuery);
        this.onRefresh();
    }
    updateFormat(index) {

    }

    //format filters
    renderFormatFilters(formats) {
       
        const checkedFormats = formats;
        return checkedFormats.map((format, i) => {
            return (
                <CheckBox
                    key={i}
                    checkedColor={nearWhite}
                    checked={this.state.checkedFormats[format]}
                    containerStyle={styles.checkBox}
                    iconRight
                    onPress={() => {
                        const val = !this.state.checkedFormats[format];
                        const name = format;
                        let updatedFormats = Object.assign({}, this.state.checkedFormats, { [name]: val })
                        this.setState({ checkedFormats: updatedFormats })
                    }}
                    right
                    textStyle={styles.checkBoxText}
                    title={format}
                    uncheckedColor={nearWhite}
                />
            )
        })
    }
    
    //header with search bar and drop down menu
    renderHeader = (content, index, isActive) => {
        if (isActive) {
            return (
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>{this.state.records.length.toLocaleString()} Results</Text>

                    <View style={styles.iconContainer}>
                        <Icon
                            name='chevron-thin-up'
                            type='entypo'
                            color={nearWhite}
                        />
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>{this.state.records.length.toLocaleString()} Results</Text>

                    <View style={styles.iconContainer}>
                        <Icon
                            name='md-reorder'
                            type='ionicon'
                            color={nearWhite}
                        />

                        <Text style={styles.headerText}>Filter</Text>
                    </View>
                </View>
            );
        }
    }

    renderContent = section => {
        return (
            <View style={styles.filterContentContainer}>
                <Text style={styles.filterText}>Sort By</Text>

                {this.renderSort()}

                <Text style={styles.filterText}>Format</Text>

                <View style={styles.checkBoxContainer}>
                    {this.renderFormatFilters(['7"', '10"', '12"'])}
                </View>
                <View style={styles.checkBoxContainer}>
                    {this.renderFormatFilters(['LP', 'CD', 'Cass'])}
                </View>

                <View style={styles.filterHeaderContainer}>
                    <Text style={styles.filterText}>Max Price</Text>
                    {this.state.value == 100 ? <Text style={styles.priceText}>100+</Text> : <Text style={styles.priceText}>{this.state.value}</Text>}
                </View>

                <View style={styles.sliderContainer}>
                    <Slider
                        minimumValue={1}
                        maximumValue={100}
                        minimumTrackTintColor={seaGreen}
                        step={1}
                        thumbTintColor={seaGreen}
                        value={this.state.value}
                        onValueChange={value => this.setState({ value })}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        rounded
                        style={styles.button}
                        onPress={this.handleApply}
                    >
                        <Text style={styles.buttonText}>Apply</Text>
                    </Button>

                    <Button
                        rounded
                        style={styles.button}
                        onPress={this.handleClear}
                    >
                        <Text style={styles.buttonText}>Clear</Text>
                    </Button>
                </View>
            </View>
        );
    }

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
        const { query, records, isLoadingComplete } = this.state;

        if (isLoadingComplete) {
            //no search results
            if (!records.length) {
                return (
                    <View style={styles.container}>
                        <SearchBar
                            placeholder="Search title, artist, or label..."
                            placeholderTextColor={nearWhite}
                            round
                            onChangeText={this.handleSearch}
                            value={query}
                            onSubmitEditing={this.handleSubmit}
                        />

                        <Accordion
                            activeSections={this.state.activeSections}
                            containerStyle={styles.accordionContainer}
                            sections={['0']}
                            renderHeader={this.renderHeader}
                            renderContent={this.renderContent}
                            onChange={this.updateSections}
                        />

                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>
                                Sorry there are no items that match your search.
                                </Text>
                        </View>
                    </View>
                );
            } else {
                //display results
                return (
                    <View style={styles.container}>

                        <SearchBar
                            placeholder="Search title, artist, or label..."
                            placeholderTextColor={nearWhite}
                            round
                            onChangeText={this.handleSearch}
                            value={query}
                            onSubmitEditing={this.handleSubmit}
                            containerStyle={styles.searchBarContainer}
                        />

                        <Accordion
                            activeSections={this.state.activeSections}
                            containerStyle={styles.accordionContainer}
                            sections={['0']}
                            renderHeader={this.renderHeader}
                            renderContent={this.renderContent}
                            onChange={this.updateSections}
                        />

                        <ScrollView>
                            <FlatList
                                data={records}
                                renderItem={this.renderItem}
                            />
                        </ScrollView>
                    </View>
                );
            }
        } else {
            //loading
            return (
                <View style={styles.container}>
                    <SearchBar
                        placeholder="Search title, artist, or label..."
                        placeholderTextColor={nearWhite}
                        round
                        onChangeText={this.handleSearch}
                        value={query}
                        onSubmitEditing={this.handleSubmit}
                    />

                    <View style={styles.activityContainer}>
                        <ActivityIndicator />
                    </View>
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
        paddingTop: 25,
    },
    searchBarContainer: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: lightGray,
    },
    accordionContainer: {
        backgroundColor: darkGray,
        borderRadius: 0,
        margin: 0,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: lightGray,
        paddingBottom: 5,
        paddingTop: 10,
        paddingRight: 10,
    },
    headerText: {
        color: nearWhite,
        fontSize: 17,
        paddingLeft: 10,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    filterContentContainer: {
        backgroundColor: darkGray,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    filterText: {
        color: nearWhite,
    },
    checkBoxContainer: {
        flexDirection: "row",
        paddingTop: 10,
        paddingBottom: 10,
    },
    checkBox: {
        flex: 1,
        padding: 0,
        borderWidth: 0,
        backgroundColor: darkGray,
    },
    checkBoxText: {
        color: nearWhite,
        fontSize: 15,
        fontWeight: 'normal',
    },
    filterHeaderContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 15,
    },
    priceText: {
        color: nearWhite,
    },
    sliderContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    buttonContainer: {
        alignItems: 'center',
        paddingTop: 30,
    },
    button: {
        backgroundColor: seaGreen,
        width: 140,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
    },
    buttonText: {
        fontWeight: 'bold',
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
});