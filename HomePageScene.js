import React, { Component, PropTypes } from 'react';
import Calendar from './CalendarScene';
import CountDown from './CountDownScene';
import AboutUs from './AboutUsScene';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  NavigatorIOS,
  Text,
  TextInput,
  View
} from 'react-native';


export default class HomePageScene extends React.Component {
  static propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }

  render() {
    return (
      <ScrollView style={styles.list}>
        <View style={styles.line}/>
        <View style={styles.group}>
          {this._renderRow('Application Jobs', () => {
            this.props.navigator.push({
              title: 'Application Jobs',
              component: Calendar,
              passProps: {
                email: this.props.email,
                password: this.props.password
              }
            });
          })}
          <View style={{height:10}}/>
          {this._renderRow('Job Calendar', () => {
            this.props.navigator.push({
              title: 'Calendar',
              component: Calendar,
              passProps: {
                email: this.props.email,
                password: this.props.password
              }
            });
          })}
          <View style={{height:10}}/>
          {this._renderRow('Count Down', () => {
            this.props.navigator.push({
              title: 'Count Down',
              component: CountDown,
              passProps: {
                email: this.props.email,
                password: this.props.password
              }
            });
          })}
          <View style={{height:10}}/>
          {this._renderRow('About Us', () => {
            this.props.navigator.push({
              title: 'About Us',
              component: AboutUs,
              passProps: {
                email: this.props.email,
                password: this.props.password
              }
            });
          })}
          <View style={{height:10}}/>
          {this._renderRow('Log Out', () => {
            this.props.navigator.popToTop();
          })}
        </View>
        <View style={styles.line}/>
      </ScrollView>
    );
  }

  _renderRow = (title: string, onPress: Function) => {
    return (
      <View style={styles.textInput}>
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
    backgroundColor: 'powderblue',
    marginTop: 5,
  },
  group: {
    backgroundColor: 'powderblue',
    alignItems:'center',
    justifyContent: 'center',
    height: 350,
  },
  groupSpace: {
    height: 15,
  },
  line: {
    backgroundColor: 'powderblue',
    height: StyleSheet.hairlineWidth,
  },
  row: {
    backgroundColor: 'azure',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomLeftRadius:20,
    borderTopRightRadius:20,
    borderTopLeftRadius:20,
    borderBottomRightRadius:20,
    width: 300,
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
  textInput: {
    backgroundColor:'azure',
    borderBottomLeftRadius:20,
    borderTopRightRadius:20,
    borderTopLeftRadius:20,
    borderBottomRightRadius:20,
  },
});
