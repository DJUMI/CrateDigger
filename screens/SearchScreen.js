import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button
} from 'react-native';
import SearchResultsList from '../components/SearchResultsList';
import { SearchBar } from 'react-native-elements';
import Drawer from 'react-native-drawer'
import FilterScreen from './FilterScreen';
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
      state={
        drawerOpen: false,
        drawerDisabled: false,
      };
    updateSearch = search => {
        this.setState({ search });
      }
      closeDrawer = () => {
        this._drawer.close()
      };
      openDrawer = () => {
        this._drawer.open()
      };
      
    render() {
        const { navigation, data } = this.props;
        const { search } = this.state;
       return(
          <Drawer
          ref={(ref) => this._drawer = ref}
          type="displace"
          content={
            <FilterScreen closeDrawer={this.closeDrawer} />
          }
          acceptDoubleTap
          styles={{main: {paddingLeft:0}}}
          onOpen={() => {
            console.log('onopen')
            this.setState({drawerOpen: true})
          }}
          onClose={() => {
            console.log('onclose')
            this.setState({drawerOpen: false})
          }}
          captureGestures={false}
          tweenDuration={100}
          panThreshold={0.08}
          disabled={this.state.drawerDisabled}
          openDrawerOffset={(viewport) => {
            return 100
          }}
          closedDrawerOffset={() => 0}
          panOpenMask={0.2}
          negotiatePan
          >
            
            <View style={styles.container}>
                <View style={styles.searchbarcontainer}>
                 <SearchBar containerStyle={{width:330}}
            placeholder="Album, artist, lable..."
            round
            lightTheme
            onChangeText={this.updateSearch}
            value={search}
            style={styles.input}
            onChangeText={search => this.setState({ search })}
            value={this.state.search}
            onSubmitEditing={() => this.handleSubmit()}
          />
               <View style={{flex:1}}>
               <Button
               onPress={() => {this._drawer.open()}}
              title="filter"
               />
                </View> 

               
                </View>
                <View style={styles.searchresultscontainer}>
                    <SearchResultsList
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
            </Drawer>
        );
    }
}

SearchScreen.navigationOptions = {
    header:null,
  };
  
const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop: 50,
        paddingLeft:5,
        paddingRight:5,
        justifyContent:"flex-start",
        backgroundColor: '#E5EEED',
    },
   
    
    searchbarcontainer:{
        height:60,
        flexDirection:'row',

       
    },
    buttonContainer:{
       height:35,
      
       marginTop:10,
       backgroundColor:'#7f8c8d',
       alignItems:"center",
       justifyContent:"center",
       
    },
    animatedBox: {
        flex: 1,
        backgroundColor: "#38C8EC",
        padding: 10
      },
   buttonText:{
       color:'#FFFFFF',
       fontSize:15
   },
   searchresultscontainer:{
       flex:1,
       paddingTop:5

   }
})
