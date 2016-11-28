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
  AlertIOS,
  Image,
  TabBarIOS,
  TextInput,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class HomePageScene extends React.Component {
  static propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this._goToChangePassword = this._goToChangePassword.bind(this);
    this.state = {
      currentPassword:'',
      selectedTab: 'firstTab',
      newPassword: '',
      newPassword2: '',
    };
  }

  _goToChangePassword() {
    if(this.state.currentPassword != this.props.password){
      AlertIOS.alert(
        "Error",
        "Your current password is incorrect"
      )
    }else if(this.state.newPassword != this.state.newPassword2){
      AlertIOS.alert(
        "Error",
        "Your new passwords are not consistent"
      )
    }else{
      fetch("https://hitch.herokuapp.com/api/changePW", {
        method: 'POST',
        headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
        body: JSON.stringify({
          email: this.props.email, oldpassword: this.props.password, newpassword: this.state.newPassword,
        })
      })
        .then((response) => response.json())
        .then((responseData) => {
          // AlertIOS.alert(
          //   "You have successfully changed your password!",
          //   responseData.result
          // )
          if(responseData.result == 'success'){
            AlertIOS.alert(
              "Success",
              "You have successfully changed your password!"
            )
            // this.props.navigator.replace({
            //   component: HomePageScene,
            //   title: 'Home Page',
            //   navigationBarHidden: true,
            //   passProps: {
            //     email: this.state.email,
            //     password: this.state.password
            //   }
            // })
          }else{
            AlertIOS.alert(
              "Error",
              responseData.result
            )
          }
        })
        .done();
    }
  }

  render() {
    return (
      <View style={{flex:1, flexDirection: 'column', backgroundColor: 'lightgrey'}}>
        <View style={{height: 200, justifyContent: 'center',alignItems:'center'}}>
        </View>
        <View style={{height: 420, flexDirection:'column', justifyContent: 'space-between',alignItems:'center', backgroundColor:'lightgrey'}}>
          <View style={styles.textInput}>
            <TextInput style={{height: 35,width: 300}} placeholder=" Verify Your Current Password"
            onChangeText={(currentPassword) => this.setState({currentPassword})} autoCapitalize="none"/>
          </View>
          <View style={styles.textInput}>
            <TextInput style={{height: 35,width: 300}} placeholder=" Please enter your new password"
            onChangeText={(newPassword) => this.setState({newPassword})} autoCapitalize="none"/>
          </View>
          <View style={styles.textInput}>
            <TextInput style={{height: 35,width: 300}} placeholder=" Please enter your new password again"
            onChangeText={(newPassword2) => this.setState({newPassword2})} autoCapitalize="none"/>
          </View>
          <View style={styles.button}>
            <TouchableHighlight onPress={this._goToChangePassword}>
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
          <Icon.TabBarItemIOS
            iconName="home"
            title="Home"
            selected={this.state.selectedTab === 'firstTab'}
            iconColor={"grey"}
            selectedIconColor={'#1F2F3C'}
            renderAsOriginal={true}
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
          </Icon.TabBarItemIOS>
          <Icon.TabBarItemIOS
            iconName="calendar"
            title="Calendar"
            selected={this.state.selectedTab === 'secondTab'}
            iconColor={"grey"}
            selectedIconColor={'#1F2F3C'}
            renderAsOriginal={true}
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
          </Icon.TabBarItemIOS>
          <Icon.TabBarItemIOS
            iconName="list"
            title="MyJobs"
            selected={this.state.selectedTab === 'thirdTab'}
            iconColor={"grey"}
            selectedIconColor={'#1F2F3C'}
            renderAsOriginal={true}
            onPress={() => {
              this.props.navigator.replace({
                  component: CountDown,
                  title: 'Count Down ',
                  navigationBarHidden:true,
                  passProps: {
                    email: this.props.email,
                    password: this.props.password
                  }
                });
            }}>
            <Text>Home</Text>
          </Icon.TabBarItemIOS>
          <Icon.TabBarItemIOS
            iconName="user"
            title="Profile"
            selected={this.state.selectedTab === 'jobListTab'}
            iconColor={"grey"}
            selectedIconColor={'#1F2F3C'}
            renderAsOriginal={true}
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
          </Icon.TabBarItemIOS>
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
