import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import HomeList from '../components/HomeList';
import { Stitch, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUserId: undefined,
      client: undefined,
      tasks: undefined,
      refreshing: false,
      search: "",
    };
    this._loadClient = this._loadClient.bind(this);
  }

  componentDidMount() {
    this._loadClient();
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });

    if (Stitch.hasAppClient("crate-digger-stitch-sikln")) {
      const app = Stitch.getAppClient("crate-digger-stitch-sikln");
      this._loadData(app);
    } else {
      Stitch.initializeAppClient("crate-digger-stitch-sikln")
      .then(app => this._loadData(app))
      .catch(err => console.error(err));
    }
  };


  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    const sections =
      this.state.tasks == undefined
        ? [{ data: [{ title: "Loading..." }], title: "Loading..." }]
        : this.state.tasks.length > 0
        ? [{ data: this.state.tasks, title: "Current Tasks" }]
        : [
            {
              data: [{ title: "No listings" }],
              title: "No listings"
            }
          ];

    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
  
          <View style={styles.getStartedContainer}>
            <Text style={styles.shopText}>JiggyJamz</Text>
            <Text style={styles.appNameText}>Crate Digger</Text>
          </View>
          
          <SearchBar
            placeholder="Type here..."
            round
            lightTheme
            onChangeText={this.updateSearch}
            value={search}
            // placeholder={'Placeholder'}
            style={styles.input}
            onChangeText={search => this.setState({ search })}
            value={this.state.search}
            onSubmitEditing={() => this.handleSubmit()}
          />
          
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>What's New</Text>
          </View>
  
          <View style={styles.listContainer}/* TODO Later : return list of newest releases */>
            <HomeList
            />
          </View>
          
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>What's Hot</Text>
          </View>
  
          <View style={styles.listContainer}/* TODO LATER: return list of most sold records in past month*/>
            <HomeList
            />
          </View>
            
  
  
        </View>
      </View>
    );
  }

  _loadClient() {
    if (Stitch.hasAppClient("crate-digger-stitch-sikln")) {
      const app = Stitch.getAppClient("crate-digger-stitch-sikln");
      this._loadData(app);
    } else {
      Stitch.initializeAppClient("crate-digger-stitch-sikln")
      .then(app => this._loadData(app))
      .catch(err => console.error(err));
    }
  }

  _loadData(appClient) {
    const mongoClient = appClient.getServiceClient(
      RemoteMongoClient.factory,
      "mongodb-atlas"
    );
    const db = mongoClient.db("crate-digger");
    const records = db.collection("music-0");
    records
      .find({ label: "RCA" })
      .asArray()
      .then(records => {
        this.setState({ records });
      })
      .catch(err => {
        console.warn(err);
      });
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
            <Text style={styles.itemTitleText}>
              {item.title}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5EEED',
    justifyContent: 'flex-end',
  },
  contentContainer: {
    paddingTop: 30,
    justifyContent: 'flex-end',
  },
  getStartedContainer: {
    alignItems: 'center',
  },
  shopText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  appNameText: {
    fontSize: 20,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  searchBarContainer: {
  },
  listHeader: {
    alignItems: 'center',
    backgroundColor: '#E5EEED',
    paddingVertical: 5,
  },
  listHeaderText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  listContainer: {
    height: 195,
    backgroundColor: '#ACB3B2',
    borderTopWidth: 1,
    borderTopColor: '#727776',
    borderBottomWidth: 1,
    borderBottomColor: '#727776',
    paddingTop: 5,
  },
  sectionContentContainer: {
    paddingHorizontal: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "lightgray"
  },
  sectionContentText: {
    color: "black",
    fontSize: 15,
    paddingBottom: 10,
    paddingHorizontal: 10,
    textAlign: "left"
  },
});
