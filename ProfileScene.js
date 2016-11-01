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
    this.state = {
      hello: ''
    }
  }

  componentWillMount() {
    fetch("https://hitch.herokuapp.com/api/test")
      .then((response) => response.json())
      .then((responseData) => {
        console.log('a');
        this.setState({hello: responseData.hello});
      })
      .done();
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
  }
	render() {
		return (
      <View style={{flex:1, flexDirection: 'column',backgroundColor: 'powderblue'}}>
        <View style={{height: 500, justifyContent: 'center',alignItems:'center'}}>
          <Text>{this.state.hello}</Text>
        </View>
      </View>
		)
	};
}
