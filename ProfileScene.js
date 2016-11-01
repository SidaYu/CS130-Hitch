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
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }

	render() {
		return (
      <View style={{flex:1, flexDirection: 'column',backgroundColor: 'powderblue'}}>
        <View style={{height: 500, justifyContent: 'center',alignItems:'center'}}>
          <Text style={styles.font}>Your email: </Text>
          <Text style={styles.font}>{this.props.email}</Text>
        </View>
      </View>
		)
	};
}

const styles = StyleSheet.create({
  font: {
  	fontFamily: 'Cochin',
  	fontStyle: 'normal',
  	paddingLeft: 40,
  	paddingTop: 10,
    fontSize: 40,
  },
});
