import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Text,
  Image,
  TextInput,
  View,
  NavigatorIOS,
} from 'react-native';
import {
  Button, List, ListItem
} from 'react-native-elements'

export default class Google extends Component {
//   static get defaultProps() {
//     return {
//       title: 'Google Application Process'
//     };
//   }
//   static propTypes = {
//     title: PropTypes.string.isRequired,
//     navigator: PropTypes.object.isRequired,
//   }

// constructor(props) {
//     super(props);
//     this.state = {
//     };
//   }

  render() {
    return (
    <View style = {{        justifyContent: 'center',
        alignItems: 'center',}}>
      <Text style = {{margin: 100}}>Hello world!</Text>
     </View>
    );
  }
}