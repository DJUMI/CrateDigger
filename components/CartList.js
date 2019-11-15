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

let darkBlue = '#0b121c';
let nearWhite = '#fafafa';

class CartList extends Component {
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
    }

    componentDidMount = async () => {
        this.setState({ isLoadingComplete: true });
    }

    renderItem = ({ item }) => {
        const { navigation } = this.props;
        //var num_in_cart = 1;
        return (
            <View style={styles.itemContainer}>
                <TouchableOpacity
                    style={styles.infoContainer}
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
                            key: Math.random() * 10000
                        })
                    }}
                >
                    <Image source={{ uri: item.image_url }} style={styles.imageContainer} />

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
                            {item.format}
                        </Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            /* TODO: minus 1 to cart if 0 reload */
                            //num_in_cart--;
                        }}
                    >
                        <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>

                    <View style={styles.numContainer}>
                        <Text style={styles.numText}>1</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            /* TODO: add 1 to cart if not enough inventory give warning */
                            //this.state.cart.push(item);
                            //console.log(this.state.cart)
                            //num_in_cart++;
                        }}
                    >
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.priceContainer}>
                    <View style={styles.numContainer}>
                        <Text style={styles.numText}>${parseFloat(Math.round(item.price * 100) / 100).toFixed(2)}</Text>
                    </View>
                </View>
            </View>

        );
    }

    render() {
        const { cart } = this.state;
        return (
            <View style={styles.container}>
                <FlatList
                    data={cart}
                    renderItem={this.renderItem}
                    keyExtractor={(item, listing_id) => listing_id.toString()}
                />
            </View>
        );
    }

}

export default withNavigation(CartList);

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 5,
        borderBottomColor: nearWhite,
        borderBottomWidth: 1,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 5,
        borderBottomColor: nearWhite,
        borderBottomWidth: 1,
    },
    infoContainer: {
        flex: 2,
        flexDirection: 'row',
    },
    quantityContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 70,
    },
    priceContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 70,
    },
    headerText: {
        fontSize: 15,
    },
    imageContainer: {
        borderRadius: 2,
        width: 70,
        height: 70,
        marginLeft: 5,
    },
    itemTitleContainer: {
        height: 70,
        justifyContent: 'center',
        paddingLeft: 5,
    },
    itemOtherText: {
        fontSize: 13,
        padding: 1,
        width: 115,
        color: nearWhite,
    },
    itemTitleText: {
        fontSize: 15,
        padding: 1,
        width: 115,
        color: nearWhite,
    },
    button: {
        padding: 15,
    },
    buttonText: {
        fontSize: 25,
        color: nearWhite,
    },
    numContainer: {
        backgroundColor: 'white',
        padding: 3,
        borderWidth: .5,
        borderRadius: 2,
    },
    numText: {
        fontSize: 20,
        color: darkBlue,
    },
})