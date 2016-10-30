import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  NavigatorIOS,
  Text,
  Image,
  TextInput,
  View
} from 'react-native';

var t = require('tcomb-form-native');
var Form = t.form.Form;

// here we are: define your domain model
var Event = t.struct({
  EventName: t.String,              // a required string
  Date: t.String,
  Location: t.maybe(t.String),
  Notes: t.maybe(t.String),
  NotifyMe: t.Boolean        // a boolean
});

var options = {};

export default class CalendarScene extends Component {
  static get defaultProps() {
    return {
      title: 'Calendar'
    };
  }

  onPress() {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    // save to database
    
    if (value) { // if validation fails, value will be null
      console.log(value); // value here is an instance of Person
    } else {
      console.log('this is a null');
    }
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  render() {
    return (
      <View style={styles.container} >

      <Form
      ref="form"
      type={Event}
      options={options}
      />

      <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>


      <TouchableHighlight
      underlayColor='#99d9f4' style={styles.button} >
      <Text style={styles.buttonText}> Prev </Text>
      </TouchableHighlight>


      <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
      <Text style={styles.buttonText}> Save </Text>
      </TouchableHighlight>

      <TouchableHighlight
      underlayColor='#99d9f4' style={styles.button} >
      <Text style={styles.buttonText}> Next </Text>
      </TouchableHighlight>
      </View>

      </View>
      )
    };
  }


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
