import React, { Component, PropTypes } from 'react';
import SignUpScene from './SignUpScene';
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

export default class SignInScene extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this._goToCreateAccount = this._goToCreateAccount.bind(this);
    this._goToHomePage = this._goToHomePage.bind(this);
    this.state = {
      email: '',
      password:''
    };
  }

  _goToCreateAccount() {
    this.props.navigator.push({
      component: SignUpScene,
      title: 'Sign Up',
    });
  }

  _goToHomePage() {
    fetch("https://hitch.herokuapp.com/api/login", {
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
        if(responseData.result){
          this.props.navigator.push({
            component: HomePageScene,
            title: 'Home Page',
          })
        }else{
          AlertIOS.alert(
            "Login failed",
            "Account doesn't exist or your password doesn't match your account."
          )
        }
      })
      .done();
  }

  render() {
    return (
      <View style={{flex:1, flexDirection: 'column',backgroundColor: 'powderblue'}}>
        <View style={{height: 260, justifyContent: 'center',alignItems:'center'}}>
        	<Image
          source={require('./logo.png')} style={{height:80, width: 80}}/>
        </View>
        <View style={{height: 90, justifyContent: 'space-between',alignItems:'right', alignItems:'center'}}>
          <View style={styles.textInput}>
          	<TextInput style={{height: 40,width: 300}} placeholder=" Email"
          	onChangeText={(email) => this.setState({email})} autoCapitalize="none"/>
          </View>
          <View style={styles.textInput}>
          	<TextInput style={{height: 40,width: 300}} placeholder=" Password"
          	onChangeText={(password) => this.setState({password})} autoCapitalize="none"/>
          </View>
        </View>
        <View style={{height: 20}}>
        	<Text style={styles.forgetPassWord}>Forget Password?</Text>
        </View>
        <View style={{height: 120, justifyContent: 'center',alignItems:'center'}}>
          <TouchableHighlight onPress={this._goToHomePage}>
          	<Text>Sign In</Text>
          </TouchableHighlight>
        </View>
        <View style={{height: 180, justifyContent: 'center', alignItems:'center'}}>
          <TouchableHighlight onPress={this._goToCreateAccount}>
          	<Text style={styles.button}>Create Account</Text>
          </TouchableHighlight>
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
  },
  logo: {
  	width: 50,
  	height: 50,
  }
});
