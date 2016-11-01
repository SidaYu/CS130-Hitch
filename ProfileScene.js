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

export default class Profile extends Component {
  static get defaultProps() {
    return {
      title: 'Profile'
    };
  }

  constructor(props) {
    super(props);
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
  }
	render() {
		return (
      <View style={{flex:1, flexDirection: 'column',backgroundColor: 'powderblue'}}>
        <View style={{height: 500, justifyContent: 'center',alignItems:'center'}}>
          <Text>Your profile</Text>
        </View>
      </View>
		)
	};
}
