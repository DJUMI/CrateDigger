import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Picker,
} from 'react-native';

import { SearchBar, CheckBox } from 'react-native-elements';

export default function SearchScreen() {
    return(
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Search by Release</Text>
            </View>
            <SearchBar
                placeholder="Type here..."
                round
                lightTheme
                /* TODO: implement search by release name */
            />
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Search by Artist</Text>
            </View>
            <SearchBar
                placeholder="Type here..."
                round
                lightTheme
                /* TODO: implement search by artist name */
            />
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Search by Label</Text>
            </View>
            <SearchBar
                placeholder="Type here..."
                round
                lightTheme
                /* TODO: implement search by label name */
            />
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Search by Price</Text>
            </View>
            <SearchBar
                placeholder="Type here..."
                round
                lightTheme
                /* TODO: implement search by price */
            />
        </View>
    );
}

SearchScreen.navigationOptions = {
    header: null,
  };
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
    },
    headerContainer: {
        paddingLeft: 15,
        paddingVertical: 10,
    },
    headerText: {
        fontSize: 20,
    },
    
})