import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';

import { SearchBar} from 'react-native-elements';

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
      />
    );
  }

  renderItem = ({ item }) => {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    const { data } = this.props;
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          /* Navigate to the Details route with params */
        }}
      >
        <View style={styles.itemInfoContainer}>
          <Image source={pic} style={styles.imageContainer}/>
          <View style={styles.itemTitleContainer}>
            <Text style={styles.itemTitleText}>Item Title</Text>
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
        />  
      );
    }
  }
}

export default SearchResultsList;

const styles = StyleSheet.create({
  itemContainer: {
   flex: 1,
   paddingTop: 5
  },
  itemInfoContainer: {
    alignItems: 'center',
    marginRight: 15,
  },
  imageContainer: {
    borderRadius: 15,
    width: 150,
    height: 150,
  },
  itemTitleContainer: {
    alignItems: 'center',
  },
  itemTitleText: {
    fontSize: 20,
    padding: 5,
  }
})