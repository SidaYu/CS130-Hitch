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

export default class Calendar extends Component {
  static get defaultProps() {
    return {
      title: 'Comments'
    };
  }
  static propTypes = {
    title: PropTypes.string.isRequired,
  }
	render() {
		return (
      <Text>Hello world!</Text>
		)
	};
}