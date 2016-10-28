import React, { Component, PropTypes } from 'react';
import SignUpScene from './SignUpScene';
import SignInScene from './SignInScene';
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  Text,
  Image,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

class AwesomeProject extends Component {
  render() {
    const routes = [
      {component: SignInScene, title: 'Sign In',},
    ];
    return (
      <NavigatorIOS initialRoute={routes[0]} style={{flex: 1}}/>
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
