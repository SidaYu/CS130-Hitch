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


import NavigationBar from 'react-native-navbar';

import Comment from './Comment'
import AddJobForm from './AddJobForm';
import AddJobFormAuto from './AddJobFormAuto';
import Google from './Google';
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
        <View style={{flex:1}}>
        <Button
          backgroundColor = 'lightblue'
          raised
          large
          icon={{name: 'cached'}}
          title='Add Comment!' 
          onPress = {() => this.fetchData()}/>
        </View>
      </View>

    );
  }
}

