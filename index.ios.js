/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import JobList from './JobList';
import AddJobForm from './AddJobForm';

import {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class AwesomeProject extends Component {

 render() {
    const routes = [
     {component: JobList, title: 'Job List',},
     //{component: AddJobForm, title: 'Add Job Form',},
    ];
    return (
      <NavigatorIOS initialRoute={routes[0]} style={{flex: 1}}/>
    );
  }

}

/*const styles = StyleSheet.create({
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
}); */

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
