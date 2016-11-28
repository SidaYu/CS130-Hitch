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
import Store from 'react-native-simple-store';
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
    loaded: false,
  }

  _getData() {
        fetch("https://hitch.herokuapp.com/api/getTimeStamp?event_id=2", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            loaded: true,
            status: responseData.status,
            event_id: responseData.timeStamps.event_id,
          })
        })
        .done();
    }

	render() {
    Store.save('json', {status: "fail"})
    if (this.state.loaded == false)
    {
      this._getData();
    }
		return (
      <View style={{flex:1, flexDirection: 'column', backgroundColor: 'red'}} marginTop={200}>
        <Text>{this.state.status}  {this.state.event_id}</Text>
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
