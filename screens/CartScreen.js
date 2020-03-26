import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import { withNavigation } from 'react-navigation';
import { Button, Text } from 'native-base';

import CartList from '../components/CartList';

let darkBlue = '#0b121c';
let nearWhite = '#fafafa';

class CartScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            total: global.total
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.itemContainer}>
                        <Text style={styles.headerText}>Item</Text>
                    </View>

                    <View style={styles.quantityContainer}>
                        <Text style={styles.headerText}>Quantity</Text>
                    </View>

                    <View style={styles.priceContainer}>
                        <Text style={styles.headerText}>Price</Text>
                    </View>
                </View>

                <CartList />
            </View>
        );
    }
}

CartScreen.navigationOptions = {
    header: null,
};

export default withNavigation(CartScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: darkBlue,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 5,
        borderBottomColor: nearWhite,
        borderBottomWidth: 1,
    },
    itemContainer: {
        flex: 2,
        paddingLeft: 5,
    },
    quantityContainer: {
        flex: 1,
        alignItems: 'center',
    },
    priceContainer: {
        flex: 1,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 15,
        color: nearWhite
    },
})