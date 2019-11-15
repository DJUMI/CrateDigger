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

let darkBlue = '#0b121c';
let nearWhite = '#fafafa';

export default class SearchScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUserId: undefined,
            client: undefined,
            tasks: undefined,
            refreshing: false,
            search: "",
            cart: global.cart,
        };
    }
    render() {
        const { navigation, data } = this.props;
        const { search } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.searchBarContainer}>
                    <SearchBar
                        placeholder="Type here..."
                        round
                        darkTheme
                        onChangeText={this.updateSearch}
                        value={search}
                        style={styles.searchBar}
                        onChangeText={search => this.setState({ search })}
                        value={this.state.search}
                        //onSubmitEditing={() => this.handleSubmit()}
                    />
                </View>
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
        backgroundColor: darkBlue,
    },
    searchBarContainer: {
        paddingTop: 25,
    },
    searchBar: {
        backgroundColor: darkBlue,
    },

})