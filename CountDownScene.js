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

export default class CountDownScene extends Component {
  static get defaultProps() {
    return {
      title: 'Calendar'
    };
  }
  static propTypes = {
    title: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }
	render() {
		return (
      <View style={{flex:1, flexDirection: 'column',backgroundColor: 'powderblue'}}>
        <View style={{height: 500, justifyContent: 'center',alignItems:'center'}}>
          <Text>Count Down</Text>
        </View>
      </View>
		)
	};
}
