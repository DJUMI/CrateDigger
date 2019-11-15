import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import { Button, Text } from 'native-base';
import { CheckBox, Slider } from 'react-native-elements';

let darkBlue = '#0b121c';
let nearWhite = '#fafafa';
let seaGreen = '#009F93';

export default class FilterScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedItems: false,
            checked1: false,
            checked2: false,
            checked3: false,
            checked4: false,
            checked5: false,
            checked6: false,
            value: 100,
        };
    }

    render() {
        let { closeDrawer } = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.headerText}>Format</Text>

                <View style={styles.checkBoxContainer}>
                    <CheckBox
                        checkedColor={darkBlue}
                        checked={this.state.checked1}
                        containerStyle={styles.checkBox}
                        iconRight
                        onPress={() => {
                            this.setState({
                                checked1: !this.state.checked1
                            })
                        }}
                        right
                        textStyle={styles.checkBoxText}
                        title='7"'
                        uncheckedColor={darkBlue}
                    />

                    <CheckBox
                        checkedColor={darkBlue}
                        checked={this.state.checked2}
                        containerStyle={styles.checkBox}
                        iconRight
                        onPress={() => {
                            this.setState({
                                checked2: !this.state.checked2
                            })
                        }}
                        right
                        textStyle={styles.checkBoxText}
                        title='10"'
                        uncheckedColor={darkBlue}
                    />

                    <CheckBox
                        checkedColor={darkBlue}
                        checked={this.state.checked3}
                        containerStyle={styles.checkBox}
                        iconRight
                        onPress={() => {
                            this.setState({
                                checked3: !this.state.checked3
                            })
                        }}
                        right
                        textStyle={styles.checkBoxText}
                        title='12"'
                        uncheckedColor={darkBlue}
                    />
                </View>

                <View style={styles.checkBoxContainer}>
                    <CheckBox
                        checkedColor={darkBlue}
                        checked={this.state.checked4}
                        containerStyle={styles.checkBox}
                        iconRight
                        onPress={() => {
                            this.setState({
                                checked4: !this.state.checked4
                            })
                        }}
                        right
                        textStyle={styles.checkBoxText}
                        title='LP'
                        uncheckedColor={darkBlue}
                    />

                    <CheckBox
                        checkedColor={darkBlue}
                        checked={this.state.checked5}
                        containerStyle={styles.checkBox}
                        iconRight
                        onPress={() => {
                            this.setState({
                                checked5: !this.state.checked5
                            })
                        }}
                        right
                        textStyle={styles.checkBoxText}
                        title='CD'
                        uncheckedColor={darkBlue}
                    />

                    <CheckBox
                        checkedColor={darkBlue}
                        checked={this.state.checked6}
                        containerStyle={styles.checkBox}
                        iconRight
                        onPress={() => {
                            this.setState({
                                checked6: !this.state.checked6
                            })
                        }}
                        right
                        textStyle={styles.checkBoxText}
                        title='Cass'
                        uncheckedColor={darkBlue}
                    />
                </View>

                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Max Price</Text>
                    {this.state.value == 100 ? <Text style={styles.priceText}>100+</Text> : <Text style={styles.priceText}>{this.state.value}</Text>}
                </View>

                <View style={styles.sliderContainer}>
                    <Slider
                        minimumValue={1}
                        maximumValue={100}
                        minimumTrackTintColor={seaGreen}
                        step={1}
                        thumbTintColor={seaGreen}
                        value={this.state.value}
                        onValueChange={value => this.setState({ value })}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        rounded
                        style={styles.button}
                        onPress={closeDrawer}
                    >
                        <Text style={styles.buttonText}>Apply</Text>
                    </Button>

                    <Button
                        rounded
                        style={styles.button}
                        onPress={closeDrawer}
                    >
                        <Text style={styles.buttonText}>Clear</Text>
                    </Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingLeft: 10,
        backgroundColor: nearWhite,
        alignContent: 'center',
    },
    headerText: {
        color: darkBlue,
        fontWeight: 'bold',
    },
    checkBoxContainer: {
        flexDirection: "row",
        paddingTop: 10,
        paddingBottom: 10,
    },
    checkBox: {
        flex: 1,
        padding: 0,
        borderWidth: 0,
    },
    checkBoxText: {
        color: darkBlue,
        fontSize: 15,
    },
    headerContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 15,
    },
    priceText: {
        fontWeight: 'bold',
    },
    sliderContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    buttonContainer: {
        alignItems: 'center',
        paddingTop: 30,
    },
    button: {
        backgroundColor: seaGreen,
        width: 140,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
    },
    buttonText: {
        fontWeight: 'bold',
    }

})