import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stitch, AnonymousCredential } from "mongodb-stitch-react-native-sdk";  

let darkBlue = '#0b121c';
let nearWhite = '#fafafa';

import AppNavigator from './navigation/AppNavigator';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserId: undefined,
      client: undefined,
      isLoadingComplete: false
    };
    this._loadClient = this._loadClient.bind(this);
  }

  componentDidMount() {
    this._loadClient();
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar backgroundColor="blue" barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        ...Icon.Ionicons.font,
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  // _loadClient() {
  //   Stitch.initializeDefaultAppClient("crate-digger-stitch-sikln").then(client => {
  //     this.setState({ client });
  //     this.state.client.auth
  //       .loginWithCredential(new AnonymousCredential())
  //       .then(user => {
  //         console.log(`Successfully logged in as user ${user.id}`);
  //         this.setState({ currentUserId: user.id });
  //         this.setState({ currentUserId: client.auth.user.id });
  //       })
  //       .catch(err => {
  //         console.log(`Failed to log in anonymously: ${err}`);
  //         this.setState({ currentUserId: undefined });
  //       });
  //   });
  // }
  _loadClient() {
    Stitch.initializeDefaultAppClient("crate-digger-stitch-sikln")
    .then(client => {
      client.auth
        .loginWithCredential(new AnonymousCredential())
        .then(user => {
          console.log(`Successfully logged in as user ${user.id}`);
          this.setState({
            currentUserId: user.id,
            currentUserId: client.auth.user.id,
            client,
          });
        })
        .catch(err => {
          console.log(`Failed to log in anonymously: ${err}`);
          this.setState({
            currentUserId: undefined,
            client,
          });
        });
    })
    .catch(err => {
      console.error(err)
    });
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkBlue,
  }
});
