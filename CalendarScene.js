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

export default class CalendarScene extends Component {
  static get defaultProps() {
    return {
      title: 'Calendar'
    };
  }
  static propTypes = {
    title: PropTypes.string.isRequired,
  }
	render() {
		return (
      <View style={{flex:1, flexDirection: 'column',backgroundColor: 'powderblue'}}>
        
        <View style={{height: 500, justifyContent: 'center',alignItems:'center'}}>
          <Text>This is a calendar page</Text>
        </View>
     
        <TouchableHighlight
        underlayColor='#99d9f4' style={styles.button} >
        <Text style={styles.buttonText}>Next</Text>
        </TouchableHighlight>

        <TouchableHighlight
        underlayColor='#99d9f4' style={styles.button} >
        <Text style={styles.buttonText}>Prev</Text>
        </TouchableHighlight>


      </View>
		)
	};
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  customWrapperStyle: {
    backgroundColor: '#bbdddd',
  },
  emptyPage: {
    flex: 1,
    paddingTop: 64,
  },
  emptyPageText: {
    margin: 10,
  },
  list: {
    backgroundColor: '#eeeeee',
    marginTop: 10,
  },
  group: {
    backgroundColor: 'white',
  },
  groupSpace: {
    height: 15,
  },
  line: {
    backgroundColor: '#bbbbbb',
    height: StyleSheet.hairlineWidth,
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
  rowNote: {
    fontSize: 17,
  },
  rowText: {
    fontSize: 17,
    fontWeight: '500',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  button: {
    width: 70,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'center'
  },
});
