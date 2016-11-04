import React, { Component, PropTypes } from 'react';

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
  render() {
    return (
      <ScrollView style={styles.list}>
        <View style={styles.line}/>
        <View style={styles.group}>
          {this._renderRow('Your Profile', () => {
            this.props.navigator.push({
              title: 'Profile Page',
              component: Profile,
            });
          })}
          {this._renderRow('Application Jobs', () => {
            this.props.navigator.push({
              title: 'Application Jobs',
              component: Calendar,
            });
          })}
          {this._renderRow('Job Calendar', () => {
            this.props.navigator.push({
              title: 'Calendar',
              component: Calendar,
            });
          })}
          {this._renderRow('Count Down', () => {
            this.props.navigator.push({
              title: 'Count Down',
              component: CountDown,
            });
          })}
          {this._renderRow('About Us', () => {
            this.props.navigator.push({
              title: 'About Us',
              component: AboutUs,
            });
          })}
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
});