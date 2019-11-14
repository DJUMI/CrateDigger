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

import { SearchBar, Icon } from 'react-native-elements';
let darkBlue = '#0b121c';
let nearWhite = '#fafafa';

class SearchResultsList extends Component {
  state = {
    isLoadingComplete: true,
  }

  componentDidMount = async () => {
    this.setState(
      {
        isLoadingComplete: true,
      },
    );
  }

  renderItem = ({ item }) => {
    const { navigation, data } = this.props;
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          /* TODO: Navigate to the Details route with params */
          navigation.navigate('Details', {/* props go here */});
        }}
      >
        <View style={styles.itemInfoContainer}>
          <Image source={require('../assets/images/vinyl.jpg')} style={styles.imageContainer}/* TODO *//>
          <View style={styles.itemTitleContainer}>
            <Text 
              style={styles.itemOtherText}
              numberOfLines={1}
            >
              Artist Name
            </Text>

            <Text 
              style={styles.itemTitleText}
              numberOfLines={1}
            >
              Item Title
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
              Format
            </Text>
          </View>
          <View style={styles.arrowContainer}>      
            <Icon 
              name='chevron-thin-right'
              type='entypo'
              size= '40'
              color= {nearWhite} /> 
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { isLoadingComplete } = this.state;
    const { data } = this.props;
    if (isLoadingComplete) {
      return (
        <FlatList
          data={data}
          renderItem={this.renderItem}
          keyExtractor={(item, listing_id) => listing_id.toString()}
        />  
      );
    }
  }
}

export default withNavigation(SearchResultsList);

const styles = StyleSheet.create({
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
})