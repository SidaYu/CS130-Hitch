import React, { Component } from 'react';
import {NavigatorIOS, ListView, StyleSheet, AppRegistry, Text, Image, View} from 'react-native';


import JobList from './JobList'

class AwesomeProject extends Component {
 
 render() {
    const routes = [
      {component: JobList, title: 'Job List', navigationBarHidden: true},
    ];
    return (
      <NavigatorIOS initialRoute={routes[0]} style={{flex: 1}}/>
    );
  }

}



AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);