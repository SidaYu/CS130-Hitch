import React, { Component, PropTypes } from 'react';
import SignUpScene from './SignUpScene';
import SignInScene from './SignInScene';
import JobList from './JobList';
import JobDetail from './JobDetail'
import {
  AppRegistry,
  NavigatorIOS,
} from 'react-native';

class AwesomeProject extends Component {
  render() {
    const routes = [
      {component: JobList, title: 'Job List',navigationBarHidden: true, backButtonTitle: "Back"},
    ];
    return (
      <NavigatorIOS initialRoute={routes[0]} style={{flex: 1}}/>
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
