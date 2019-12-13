import React from 'react';
import { 
  Platform, 
  StatusBar, 
  StyleSheet, 
  View 
} from 'react-native';

import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Stitch, AnonymousCredential } from "mongodb-stitch-react-native-sdk";  

import AppNavigator from './navigation/AppNavigator';
import './global';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserId: undefined,
      client: undefined,
      fontLoaded: false,
      isLoadingComplete: false,
      cart: global.cart,
    };
    this._loadClient = this._loadClient.bind(this);
  }

  componentDidMount() {
    this._loadClient();
  }

  render() {
    if (!this.state.fontLoaded && !this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
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
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/vinylstock.jpg'),
        require('./assets/images/logo.png'),
      ]),
      Font.loadAsync({
        ...Icon.Ionicons.font,
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
        Roboto: require('./assets/fonts/Roboto.ttf'),
        Roboto_medium: require("./assets/fonts/Roboto_medium.ttf"),
      })
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

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
    backgroundColor: "#fff"
  }
});