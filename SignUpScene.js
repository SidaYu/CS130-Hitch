import React, { Component, PropTypes } from 'react';
import HomePageScene from './HomePageScene';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Text,
  Image,
  TextInput,
  AlertIOS,
  View
} from 'react-native';

export default class SignUpScene extends Component {
  static get defaultProps() {
    return {
      title: 'Sign Up'
    };
  }

  constructor(props) {
    super(props);
    this._goToHomePage = this._goToHomePage.bind(this);
    this.state = {
      email: '',
      password:''
    };
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  _goToHomePage() {
    fetch("https://hitch.herokuapp.com/api/register", {
      method: 'POST',
      headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
      body: JSON.stringify({
        email: this.state.email, password: this.state.password
      })
    })
      .then((response) => response.json())
      .then((responseData) => {
        if(responseData.result == "this user is already registered"){
          AlertIOS.alert(
            "Login failed",
            "This user is already registered."
          )
        }else{
          this.props.navigator.push({
            component: HomePageScene,
            title: 'Home Page',
            passProps: {
              email: this.state.email,
              password: this.state.password
            }
          })
        }
      })
      .done();
  }

  render() {
    return (
      <View style={{flex:1, flexDirection: 'column',backgroundColor: 'powderblue'}}>
        <View style={{height: 100, justifyContent: 'center',alignItems:'center'}}>
          <Text>Create Account</Text>
        </View>
        <View style={{height: 90, justifyContent: 'space-between',alignItems:'right', alignItems:'center'}}>
          <View style={styles.textInput}>
            <TextInput style={{height: 40,width: 300}} placeholder=" Email"
            onChangeText={(email) => this.setState({email})}  autoCapitalize="none"/>
          </View>
          <View style={styles.textInput}>
            <TextInput style={{height: 40,width: 300}} placeholder=" Password"
            onChangeText={(password) => this.setState({password})} autoCapitalize="none"/>
          </View>
        </View>
        <View style={{height: 200}}>
        </View>
        <View style={{height: 120, justifyContent: 'center',alignItems:'center'}}>
          <View style={styles.textInput}>
            <TouchableHighlight onPress={this._goToHomePage}>
              <Text>Create Account</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={{height: 140, justifyContent: 'center', alignItems:'center'}}>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor:'azure',
    borderBottomLeftRadius:20,
    borderTopRightRadius:20,
    borderTopLeftRadius:20,
    borderBottomRightRadius:20,
  },
  forgetPassWord: {
    fontFamily: 'Cochin',
    fontStyle: 'normal',
    paddingLeft: 40,
    paddingTop: 10,
  },
  button: {
    height: 20,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: 'azure',
  },
});
