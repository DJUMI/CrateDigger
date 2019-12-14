import React, { PureComponent } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

let darkBlue = '#0b121c';
let nearWhite = '#fafafa';


class SearchItem extends PureComponent {
    render() {
        const { navigation, item } = this.props;
        return (
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => {
                    navigation.navigate('Details', {
                        item: item,
                        listing_id: item.listing_id,
                        release_id: item.release_id,
                        title: item.title,
                        artist: item.artist,
                        label: item.label,
                        format: item.format,
                        styles: item.styles,
                        price: item.price,
                        image_url: item.image_url,
                        video_url: item.video_url,
                    })
                }}
            >
                <View style={styles.itemInfoContainer}>
                    {item.image_url ?
                        <Image
                            source={{ uri: item.image_url }}
                            style={styles.imageContainer}
                        /> :
                        <Image
                            source={require('../assets/images/vinylstock.jpg')}
                            style={styles.imageContainer}
                        />
                    }
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
                            {item.label}
                        </Text>

                        <Text
                            style={styles.itemOtherText}
                            numberOfLines={1}
                        >
                            {item.format}
                        </Text>
                    </View>

                    <View style={styles.arrowContainer}>
                        <Icon
                            name='chevron-thin-right'
                            type='entypo'
                            size={40}
                            color={nearWhite}
                        />
                    </View>
                </View>
            </TouchableOpacity>

        );
    }
}

export default withNavigation(SearchItem);

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
});