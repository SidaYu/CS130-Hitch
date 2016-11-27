import React, { Component, PropTypes } from 'react';
import CalendarScene from './CalendarScene';
import CountDown from './CountDownScene';
import Settings from './SettingsScene';
import JobList from './JobList';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  NavigatorIOS,
  Text,
  Image,
  TabBarIOS,
  TextInput,
  View
} from 'react-native';


export default class HomePageScene extends React.Component {
  static propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password:''
    };
  }


  state = {
      selectedTab: 'firstTab',
  };

  render() {
    return (
      <View style={{flex:1, flexDirection: 'column', backgroundColor: 'lightgrey'}}>
        <View style={{height: 200, justifyContent: 'center',alignItems:'center'}}>
        </View>
        <View style={{height: 420, flexDirection:'column', justifyContent: 'space-between',alignItems:'center', backgroundColor:'lightgrey'}}>
          <View style={styles.textInput}>
            <TextInput style={{height: 35,width: 300}} placeholder=" Verify Your Current Password"
            onChangeText={(email) => this.setState({email})} autoCapitalize="none"/>
          </View>
          <View style={styles.textInput}>
            <TextInput style={{height: 35,width: 300}} placeholder=" Input yout new password"
            onChangeText={(email) => this.setState({email})} autoCapitalize="none"/>
          </View>
          <View style={styles.textInput}>
            <TextInput style={{height: 35,width: 300}} placeholder=" Input yout new password"
            onChangeText={(email) => this.setState({email})} autoCapitalize="none"/>
          </View>
          <View style={styles.button}>
            <TouchableHighlight onPress={this._goToCreateAccount}>
              <Text>Change Password</Text>
            </TouchableHighlight>
          </View>
          <View style={{height: 140, justifyContent: 'center',alignItems:'center', backgroundColor:'azure'}}>
          </View>
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
                  navigationBarHidden: true,
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
                  navigationBarHidden: true,
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
                  navigationBarHidden: true,
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
                  navigationBarHidden: true,
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
    );
  }


}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor:'azure',
    borderBottomLeftRadius:20,
    borderTopRightRadius:20,
    borderTopLeftRadius:20,
    borderBottomRightRadius:20,
    padding:10,
  },
  button: {
    backgroundColor:'azure',
    borderBottomLeftRadius:20,
    borderTopRightRadius:20,
    borderTopLeftRadius:20,
    borderBottomRightRadius:20,
    padding: 10,
  },
});
