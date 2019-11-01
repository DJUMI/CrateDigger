import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';

export default class SearchScreen extends React.Component {
    render() {
        const { navigation, data } = this.props;
        return(
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Search by Album</Text>
                </View>
                <View style={styles.searchsectioncontainer}>
                    <TextInput
                    returnKeyType="next"
                    placeholder="album name"
                    placeholderTextColor="#636e72"
                    onSubmitEditing={()=> this.albumInput.focus()}
                    style={styles.input}
                    />
                </View>
                    
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Search by Artist</Text>
                </View>
                <View style={styles.searchsectioncontainer}>
                    <TextInput
                    returnKeyType="next"
                    placeholder="artist name"
                    placeholderTextColor="#636e72"
                    onSubmitEditing={()=>this.artistInput.focus()}
                    ref={(input)=>this.albumInput=input}
                    style={styles.input}
                    />

                </View>
                    
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Search by Label</Text>
                </View>
                <View style={styles.searchsectioncontainer}>
                    <TextInput
                    returnKeyType="search"
                    placeholder="label name"
                    placeholderTextColor="#636e72"
                    ref={(input)=>this.artistInput=input}
                    style={styles.input}
                    />
                </View>
                
                <TouchableOpacity 
                style={styles.buttonContainer}
                onPress={() => {
                    /* TODO: Navigate to the Details route with params */
                    navigation.navigate('SearchResults', {/* props go here */});
                  }}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>
                
            </KeyboardAvoidingView>
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
        paddingLeft:10,
        paddingRight:10,
        justifyContent:"flex-start",
        backgroundColor: '#E5EEED',
    },
    headerContainer: {
        
        height:30,
    },
    headerText: {
        fontSize: 20,
    },
    input:{
       flex:1,
        backgroundColor:'#bdc3c7',
        color:'#2d3436',
        fontSize:20,
    },
    searchsectioncontainer:{
        height:40,
       
    },
    buttonContainer:{
       height:35,
      
       marginTop:10,
       backgroundColor:'#7f8c8d',
       alignItems:"center",
       justifyContent:"center",
       
    },
   buttonText:{
       color:'#FFFFFF',
       fontSize:15
   }
})