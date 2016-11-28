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

  state = {
    jsonData : null,
  }

  _getData() {
        return fetch("https://hitch.herokuapp.com/api/getAllJobs?user_email=tian@test.com", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then((response) => response.json())
        .then((responseData) => {
            return responseData;
        })
        .done();
    }

	render() {
    var json = this._getData();
		return (
      <View style={{flex:1, flexDirection: 'column'}} marginTop={200}>
        <Text>{console.warn(json)}</Text>
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
