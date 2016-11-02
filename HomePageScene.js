import React, { Component, PropTypes } from 'react';
import Calendar from './CalendarScene';
import CountDown from './CountDownScene';
import Settings from './SettingsScene';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  NavigatorIOS,
  Text,
  Image,
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
      <ScrollView>
        <Image source={require('./pics/homepagebg.jpg')} style={{height:680,width:380}}>
          <View style={styles.line}/>
          <View style={{height:90}}/>
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
            <View style={{height:45}}/>
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
            <View style={{height:45}}/>
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
            <View style={{height:45}}/>
            {this._renderRow('Settings', () => {
              this.props.navigator.push({
                title: 'Settings',
                component: Settings,
                passProps: {
                  email: this.props.email,
                  password: this.props.password
                }
              });
            })}
            <View style={{height:45}}/>
            {this._renderRow('Log Out', () => {
              this.props.navigator.popToTop();
            })}
          </View>
          <View style={styles.line}/>
        </Image>
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
  group: {
    alignItems:'center',
    justifyContent: 'center',
    height: 350,
  },
  groupSpace: {
    height: 15,
  },
  line: {
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
