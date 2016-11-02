import React, { Component, PropTypes } from 'react';
import ProgressBar from './ProgressBar';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  NavigatorIOS,
  Text,
  Image,
  TextInput,
  View,
  AlertIOS
} from 'react-native';

var t = require('tcomb-form-native');
var Form = t.form.Form;

// define your domain model
var Event = t.struct({
  Date: t.Date,
  EventName: t.String,              // a required string
  Location: t.maybe(t.String),
  Notes: t.maybe(t.String),
  NotifyMe: t.Boolean,
  Finished: t.Boolean
});

var options = {};

var CalenderScene = React.createClass({
  // constructor
  getInitialState() {
    return {
      value: {
      }
    };
  },

  // CREATE NEW ITE
  onPress:function () {
    var value = this.refs.form.getValue();
    fetch("https://hitch.herokuapp.com/api/addTimeStamp", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "job_id": this.props.job_id, 
        "description": value.EventName, 
        "deadline": value.Date, 
        "status": value.Finished
      })
    })
    .done();
  },

  onChange(value) {
    this.setState({value});
  },

  render: function() {
    return (
      <View style={styles.container} >

      <Form
      ref="form"
      type={Event}
      value={this.state.value}
      onChange={this.onChange}
      />

      <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
      <Text style={styles.buttonText}> Save </Text>
      </TouchableHighlight>

      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  customWrapperStyle: {
    backgroundColor: '#bbdddd',
  },
  emptyPage: {
    flex: 1,
    paddingTop: 64,
  },
  emptyPageText: {
    margin: 10,
  },
  list: {
    backgroundColor: '#eeeeee',
    marginTop: 10,
  },
  group: {
    backgroundColor: 'white',
  },
  groupSpace: {
    height: 15,
  },
  line: {
    backgroundColor: '#bbbbbb',
    height: StyleSheet.hairlineWidth,
  },
  row: {
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#bbbbbb',
    marginLeft: 15,
  },
  rowNote: {
    fontSize: 17,
  },
  rowText: {
    fontSize: 17,
    fontWeight: '500',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'center'
  },
});

export default CalenderScene;