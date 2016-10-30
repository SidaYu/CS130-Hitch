import React, { Component, PropTypes } from 'react';
import SignUpScene from './SignUpScene';
import HomePageScene from './HomePageScene';
import SignInScene from './SignInScene';

import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Text,
  Image,
  TextInput,
  View
} from 'react-native';


var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;
var ProgressBar = require('react-native-progress-bar');


var rnsandbox = React.createClass({

  getInitialState() {
    return {
      progress: 0
    };
  },

  render() {

    setTimeout((function() {
      this.setState({ progress: this.state.progress + (0.4 * Math.random())});
    }).bind(this), 1000);

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+Control+Z for dev menu
        </Text>
        <ProgressBar
          fillStyle={{}}
          backgroundStyle={{backgroundColor: '#cccccc', borderRadius: 2}}
          style={{marginTop: 10, width: 300}}
          progress={this.state.progress}
        />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('rnsandbox', () => rnsandbox);