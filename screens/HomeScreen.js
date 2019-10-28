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

  // componentDidMount() {
  //   this._loadClient();
  // }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    const stitchAppClient = Stitch.defaultAppClient;
    const mongoClient = stitchAppClient.getServiceClient(
      RemoteMongoClient.factory,
      "mongodb-atlas"
    );
    const db = mongoClient.db("crate-dgger");
    const tasks = db.collection("music-0");
    tasks
      .find({ status:"Draft" }, { sort: { listed: -1 } })
      .asArray()
      .then(docs => {
        this.setState({ tasks: docs });
        this.setState({ refreshing: false });
      })
      .catch(err => {
        console.warn(err);
      });
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

          // return (
          //   <View style={styles.container}
          //   style={{ ...styles.container }}
          //   renderItem={this._renderItem}
          //     //  renderSectionHeader={this._renderSectionHeader}
          //     // stickySectionHeadersEnabled={true}
          //    keyExtractor={(item, index) => index}
          //    sections={sections}
          //     // refreshControl={
          //     //   <RefreshControl
          //     //     refreshing={this.state.refreshing}
          //     //     onRefresh={this._onRefresh}
          //     //   />
          //     // }
              

          //   />
          //   // <SectionList
            
          //   //   style={{ ...styles.container }}
          //   //   renderItem={this._renderItem}
          //   //   //renderSectionHeader={this._renderSectionHeader}
          //   //   // stickySectionHeadersEnabled={true}
          //   //   keyExtractor={(item, index) => index}
          //   //   sections={sections}
          //   //   refreshControl={
          //   //     <RefreshControl
          //   //       refreshing={this.state.refreshing}
          //   //       onRefresh={this._onRefresh}
          //   //     />
          //   //   }
              
          //   // />
          // );

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
              // data={[
              //   {key: 'Devin'},
              //   {key: 'Jackson'},
              //   {key: 'James'},
              //   {key: 'Joel'},
              //   {key: 'John'},
              //   {key: 'Jillian'},
              //   {key: 'Jimmy'},
              //   {key: 'Julie'},
              // ]}
              data={this.renderItem}
            />
          </View>
          
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>What's Hot</Text>
          </View>
  
          <View style={styles.listContainer}/* TODO LATER: return list of most sold records in past month*/>
            <HomeList
              data={[
                {key: 'Devin'},
                {key: 'Jackson'},
                {key: 'James'},
                {key: 'Joel'},
                {key: 'John'},
                {key: 'Jillian'},
                {key: 'Jimmy'},
                {key: 'Julie'},
              ]}
            />
          </View>
            
  
  
        </View>
      </View>
    );
  }

  _loadClient() {
    const stitchAppClient = Stitch.defaultAppClient;
    const mongoClient = stitchAppClient.getServiceClient(
      RemoteMongoClient.factory,
      "mongodb-atlas"
    );
    const db = mongoClient.db("crate-digger");
    const tasks = db.collection("music-0");
    tasks
      .find({ status: "Draft" }, { sort: { listed: -1 } })
      .asArray()
      .then(docs => {
        this.setState({ tasks: docs });
      })
      .catch(err => {
        console.warn(err);
      });
  }

  // _renderItem = ({ item }) => {
  //   return (
  //     <SectionContent>
  //       <Swipeout
  //         autoClose={true}
  //         backgroundColor="none"
  //       >
  //         <View style={styles.listContainer}>
  //           {item.title != "No listings" && item.title != "Loading..." ? (
  //             <View>
  //               <Text style={styles.listContainer}>
  //                 {item.title}
  //               </Text>
  //               <Text style={styles.listContainer}>
  //                 {item.artist}
  //               </Text>
  //               <Text style={styles.listContainer}>
  //                 ${item.price}
  //               </Text>
  //               <Text style={styles.listContainer}>
  //                 {item.listed}
  //               </Text>
  //             </View>
  //           ) : item.title == "No listings" ? (
  //             <AntDesign
  //               name={Platform.OS == "ios" ? "smileo" : "smileo"}
  //               size={30}
  //               style={{
  //                 textAlign: "center",
  //                 color: "lightgray",
  //                 marginTop: 25
  //               }}
  //             />
  //           ) : (
  //             <Text />
  //           )}
  //         </View>
  //         <Text style={styles.sectionContentText}>
  //           {item.title != "No listings" ? item.description : ""}
  //         </Text>
  //       </Swipeout>
  //     </SectionContent>
  //   );
  // };
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
