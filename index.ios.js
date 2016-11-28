import React, { Component, PropTypes } from 'react';
import SignUpScene from './SignUpScene';
import SignInScene from './SignInScene';
import SettingsScene from './SettingsScene';
import EventsScene from './EventsScene';
import {
  AppRegistry,
  NavigatorIOS,
} from 'react-native';

class AwesomeProject extends Component {
  render() {
    const routes = [
      {component: SignInScene, title: 'Sign In',navigationBarHidden: true, backButtonTitle: "Back"},
      {component: SettingsScene, title: 'Setting'},
      {component: EventsScene, title: 'Events'},
    ];
    return (
      <NavigatorIOS initialRoute={routes[2]} style={{flex: 1}}/>
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
