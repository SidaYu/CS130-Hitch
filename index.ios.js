import React, { Component, PropTypes } from 'react';
import SignUpScene from './SignUpScene';
import SignInScene from './SignInScene';
import DynamicList from './DynamicList';
import SettingsScene from './SettingsScene';
import {
  AppRegistry,
  NavigatorIOS,
} from 'react-native';

class AwesomeProject extends Component {
  render() {
    const routes = [
      {component: SignInScene, title: 'Sign In',navigationBarHidden: true, backButtonTitle: "Back"},
      {component: DynamicList, title: 'Event'},
      {component: SettingsScene, title: 'Setting'},
    ];
    return (
      <NavigatorIOS initialRoute={routes[1]} style={{flex: 1}}/>
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
