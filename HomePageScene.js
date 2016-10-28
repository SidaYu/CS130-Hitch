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

class NavigatorBar extends Component {
	render() {
		return (
			<Text>Hi</Text>
		)
	}

	_renderTab = (title: string, onPress: Function) => {
    return (
      <View>
        <TouchableHighlight onPress={onPress}>
          <View style={styles.row}>
            <Text style={styles.rowText}>
              {title}
            </Text>
          </View>
        </TouchableHighlight>
        <View style={styles.separator} />
      </View>
    );
  };
}

export default class HomePageScene extends Component {
	static title = '<HomePageScene>';
  	static description = 'iOS navigation capabilities';
  	static external = true;
  	render() {
	    const {onExampleExit} = this.props;
	    return (
	      <Text>HomePageScene</Text>
	    );
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#bbbbbb',
    marginLeft: 15,
  },
  rowText: {
    fontSize: 17,
    fontWeight: '500',
  },
});
