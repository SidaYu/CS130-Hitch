import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Text,
  Image,
  TextInput,
  View,
  NavigatorIOS,
  ScrollView,
  AlertIOS,
} from 'react-native';
import {
  Button, List, ListItem, CheckBox, SearchBar, Icon, Tabs, Tab,
} from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';


import NavigationBar from 'react-native-navbar';

import Comment from './Comment'
import AddJobForm from './AddJobForm';
import AddJobFormAuto from './AddJobFormAuto';
import DynamicList from './DynamicList'

var REQUEST_URL = 'https://hitch.herokuapp.com/api/addComment?user_email=tian@test.com'
var Swipeout = require('react-native-swipeout')

export default class AddComment extends Component {
  static get defaultProps() {
    return {
      title: 'Add Comment'
    };
  }
  static propTypes = {
    title: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired,
  }

constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }


fetchData() {
   fetch(REQUEST_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify({ 
        job_id: this.props.add_comment_id,
        comment: this.state.text,
      })
    })
    // .then((response) => response.json())
    .then((response) => console.log(response))
    .then((responseData) => {
    })
    .done();
          AlertIOS.alert(
            'Comment add succeeded!',
            null,
            (() =>this.props.navigator.pop())
          );
  }

  render() 
  {
    return (
      <View style={{padding:20, marginTop: 40, flex: 1}}>
        <View style={{flex:10,}}>
        <TextInput
          maxLength = {500}
          multiline = {true}
          style={{marginTop: 30, height:300, fontSize: 15,}}
          placeholder="Type here to add comment!"
          onChangeText={(text) => this.setState({text})}
        />
        </View>
        <View alignItems={'center'}>
          <LinearGradient 
            colors={['#4c669f', '#3b5998', '#192f6a']} 
            style={styles.linearGradient}
            width={300}>


          <Button
          large
          iconRight
          icon={{name: 'pencil-square-o', type: 'font-awesome', color: 'white'}}
          title='Add Comment!'
          fontSize={24}
          color='white'
          backgroundColor='transparent'
          onPress={() => this._addNewEvent()}
          borderRadius={10}/>
          </LinearGradient>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor:'white',
    borderBottomLeftRadius:5,
    borderTopRightRadius:5,
    borderTopLeftRadius:5,
    borderBottomRightRadius:5,
  },
  button: {
    height: 40,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: 'white',
  },
});

