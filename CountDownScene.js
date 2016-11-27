import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  NavigatorIOS,
  TabBarIOS,
  Text,
  Image,
  TextInput,
  View
} from 'react-native';

import HomePageScene from './HomePageScene';
import CalendarScene from './CalendarScene';
import Settings from './SettingsScene';
import JobList from './JobList';

export default class CountDownScene extends Component {
  static get defaultProps() {
    return {
      title: 'Count Down'
    };
  }
  static propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }


  state = {
      selectedTab: 'thirdTab',
  };

	render() {
		return (
      <View style={{flex:1, flexDirection: 'column', backgroundColor: 'lightgrey'}}>
        <View style={{height: 200, justifyContent: 'center',alignItems:'center'}}>
        </View>
        <View style={{height: 420, flexDirection:'column', justifyContent: 'space-between',alignItems:'center', backgroundColor:'lightgrey'}}>
        </View>
        <View style={{flex:1, flexDirection: 'column', backgroundColor:'skyblue'}}>
          <TabBarIOS
          unselectedTintColor="azure"
          tintColor="white"
          barTintColor="gainsboro"
          backgroundColor = "azure">
          <TabBarIOS.Item
            systemIcon="bookmarks"
            selected={this.state.selectedTab === 'firstTab'}
            onPress={() => {
              this.props.navigator.replace({
                  component: HomePageScene,
                  title: 'Home Page',
                  passProps: {
                    email: this.props.email,
                    password: this.props.password
                  }
                });
            }}>
            <Text>Home</Text>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            systemIcon="recents"
            selected={this.state.selectedTab === 'secondTab'}
            onPress={() => {
              this.props.navigator.replace({
                  component: CalendarScene,
                  title: 'Calendar',
                  passProps: {
                    email: this.props.email,
                    password: this.props.password
                  }
                });
            }}>
            <Text>Home</Text>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            systemIcon="downloads"
            selected={this.state.selectedTab === 'thirdTab'}
            onPress={() => {
              this.props.navigator.replace({
                  component: CountDown,
                  title: 'Count Down ',
                  passProps: {
                    email: this.props.email,
                    password: this.props.password
                  }
                });
            }}>
            <Text>Home</Text>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            systemIcon="bookmarks"
            selected={this.state.selectedTab === 'jobListTab'}
            onPress={() => {
              this.props.navigator.push({
                  component: JobList,
                  title: 'Job List',
                  passProps: {
                    email: this.props.email,
                    password: this.props.password
                  }
                });
            }}>
            <Text>Home</Text>
          </TabBarIOS.Item>
        </TabBarIOS>
        </View>
      </View>
		)
	};
}
