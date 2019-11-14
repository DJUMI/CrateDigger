import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native';

import { SearchBar } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import SearchResultsList from '../components/SearchResultsList';

export default class SearchScreen extends React.Component {
    render() {
        const { navigation, data } = this.props;


        return (
            <View style={styles.container2}>
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <View style={styles.searchsectioncontainer}>
                        <TextInput
                            returnKeyType="next"
                            placeholder="album name"
                            placeholderTextColor="#636e72"
                            onSubmitEditing={() => this.albumInput.focus()}
                            style={styles.input}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={() => {
                            /* TODO: populate search results */
                        }}>
                        <Text style={styles.buttonText}>Search</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>

                <ScrollView>
                    <SearchResultsList
                        data={[
                            { key: 'Devin' },
                            { key: 'Jackson' },
                            { key: 'James' },
                            { key: 'Joel' },
                            { key: 'John' },
                            { key: 'Jillian' },
                            { key: 'Jimmy' },
                            { key: 'Julie' },
                        ]} />
                </ScrollView>
            </View>
        );
    }
}

SearchScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: "flex-start",
        backgroundColor: '#E5EEED',
    },
    container2: {
        justifyContent: 'space-between',
    },
    headerContainer: {

        height: 30,
    },
    headerText: {
        fontSize: 20,
    },
    input: {
        flex: 1,
        backgroundColor: '#bdc3c7',
        color: '#2d3436',
        fontSize: 20,
    },
    searchsectioncontainer: {
        height: 40,

    },
    buttonContainer: {
        height: 35,

        marginVertical: 10,
        backgroundColor: '#7f8c8d',
        alignItems: "center",
        justifyContent: "center",

    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 15
    }
})