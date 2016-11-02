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

export default class Settings extends Component {
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
      <View style={{flex:1, flexDirection: 'column'}}>
        <Image source={require('./pics/settingsbcg.png')} style={{height:680,width:380}}>
        </Image>
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
