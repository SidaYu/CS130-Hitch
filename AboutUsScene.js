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

export default class AboutUs extends Component {
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
          <Text style={styles.font}>Hi {this.props.email}</Text>
          <Text style={styles.font}>Thank you for choosing us!</Text>
          <Text style={styles.font}>We are Triple Nine Team!</Text>
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
