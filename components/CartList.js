import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';

class CartList extends Component {
<<<<<<< Updated upstream
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
=======
  state = {
    isLoadingComplete: true,
  }
>>>>>>> Stashed changes

    componentDidMount = async () => {
        this.setState({ isLoadingComplete: true });
    }

    renderItem = ({ item }) => {
        const { data } = this.props;
        return (
            <View style={styles.itemContainer}>
                <View style={styles.infoContainer}>
<<<<<<< Updated upstream
                    <Image source={{ uri: item.image_url }} style={styles.imageContainer}/* TODO *//>
                    <View style={styles.itemTitleContainer}>
                        <Text style={styles.itemOtherText}>{item.artist}</Text>
                        <Text style={styles.itemTitleText}>{item.title}</Text>
                        <Text style={styles.itemOtherText}>{item.format}</Text>
=======
                    <Image source={require('../assets/images/vinyl.jpg')} style={styles.imageContainer}/* TODO *//>
                    <View style={styles.itemTitleContainer}>
                        <Text style={styles.itemOtherText}/* TODO */>Artist Name</Text>
                        <Text style={styles.itemTitleText}/* TODO */>Item Title</Text>
                        <Text style={styles.itemOtherText}/* TODO */>Format</Text>
>>>>>>> Stashed changes
                    </View>
                </View>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                        /* TODO: minus 1 to cart if 0 reload */
                        }}
                    >
                        <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>
                    <View style={styles.numContainer}>
                        <Text style={styles.numText}/* TODO: display number of items in cart*/>1</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                        /* TODO: add 1 to cart if not enough inventory give warning */
                        }}
                    >
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.priceContainer}>
                <View style={styles.numContainer}>
                        
<<<<<<< Updated upstream
                        <Text style={styles.numText}>${parseFloat(Math.round(item.price * 100) / 100).toFixed(2)}</Text>
=======
                        <Text style={styles.numText}/* TODO */>$12.99</Text>
>>>>>>> Stashed changes
                    </View>
                </View>
            </View>
        
        );
    }   

render() {
<<<<<<< Updated upstream
    const { cart } = this.state;
    return (
        <View style={styles.container}>
            <FlatList
            data={cart}
            renderItem={this.renderItem}
            keyExtractor={(item, listing_id) => listing_id.toString()}
=======
    const { data } = this.props;
    return (
        <View style={styles.container}>
            <FlatList
            data={data}
            renderItem={this.renderItem}
>>>>>>> Stashed changes
            />
        </View>
    );
}

}

export default CartList;

const styles = StyleSheet.create({
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
        borderRadius: 15,
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
        fontSize: 10,
        padding: 1,
      },
      itemTitleText: {
        fontSize: 15,
        padding: 1,
      },
      button: {
        padding: 15,
      },
      buttonText: {
        fontSize: 25,
      },
      numContainer: {
          backgroundColor: 'white',
          padding: 3,
          borderWidth: .5,
          borderRadius: 2,
      },
      numText: {
        fontSize: 20,
      },
})