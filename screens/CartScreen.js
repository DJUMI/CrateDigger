import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import CartList from '../components/CartList';

<<<<<<< Updated upstream

export default class CartScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUserId: undefined,
            client: undefined,
            tasks: undefined,
            refreshing: false,
            search: "",
            cart: [],
        };
    }
=======
>>>>>>> Stashed changes

export default class CartScreen extends React.Component {
    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.headerText}>Item</Text>
                    </View>
                    <View style={styles.quantityContainer}>
                        <Text style={styles.headerText}>Quantity</Text>  
                    </View>
                    <View style={styles.priceContainer}>
                        <Text style={styles.headerText}>Price</Text>
                    </View>
                </View>
                <CartList
                    data={[
<<<<<<< Updated upstream
                        { key: 'Devin' },
                        { key: 'Jackson' },
                        { key: 'James' },
                        { key: 'Joel' },
                        { key: 'John' },
                        { key: 'Jillian' },
                        { key: 'Jimmy' },
                        { key: 'Julie' },
=======
                      {key: 'Devin'},
                      {key: 'Jackson'},
                      {key: 'James'},
                      {key: 'Joel'},
                      {key: 'John'},
                      {key: 'Jillian'},
                      {key: 'Jimmy'},
                      {key: 'Julie'},
>>>>>>> Stashed changes
                    ]}
                />
            </View>
        
        );
    }
    
}

CartScreen.navigationOptions = {
    header: null,
<<<<<<< Updated upstream
};
=======
  };
>>>>>>> Stashed changes

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 30,
      backgroundColor: '#E5EEED',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 5,
        borderBottomColor: '#727776',
        borderBottomWidth: 1,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 5,
        borderBottomColor: '#727776',
        borderBottomWidth: 1,
    },
    infoContainer: {
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
    },
  })