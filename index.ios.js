import React, { Component, PropTypes } from 'react';
import SignUpScene from './SignUpScene';
import SignInScene from './SignInScene';
import CalendarScene from './CalendarScene';
import {
  AppRegistry,
  NavigatorIOS,
} from 'react-native';

class AwesomeProject extends Component {
  render() {
    const routes = [
      {component: CalendarScene, title: 'CalendarScene',},
    ];
    return (
      <NavigatorIOS initialRoute={routes[0]} style={{flex: 1}}/>
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
