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

  renderHeader = () => {
    return (
      <SearchBar
      placeholder="Type here..."
      round
      lightTheme
      /* TODO: implement search*/
      />
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
            <Text style={styles.itemOtherText}/* TODO */>Artist Name</Text>
            <Text style={styles.itemTitleText}/* TODO */>Item Title</Text>
            <Text style={styles.itemOtherText}/* TODO */>Label Name Year</Text>
            <Text style={styles.itemOtherText}/* TODO */>Format</Text>
          </View>
          <View style={styles.arrowContainer}>      
            <Icon 
              name='chevron-thin-right'
              type='entypo'
              size= '40'
              color= '#727776' /> 
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
          ListHeaderComponent={this.renderHeader}
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
    backgroundColor: '#E5EEED',
    paddingVertical: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#727776',
  },
  imageContainer: {
    borderRadius: 15,
    width: 90,
    height: 90,
    marginLeft: 5,
  },
  itemTitleContainer: {
    height: 90,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 5,
  },
  itemOtherText: {
    fontSize: 15,
    padding: 1,
  },
  itemTitleText: {
    fontSize: 20,
    padding: 1,
  },
  arrowContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 90,
  },
})