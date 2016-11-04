import React, { Component, PropTypes } from 'react';
import SignUpScene from './SignUpScene';
import HomePageScene from './HomePageScene';
import Video from 'react-native-video';
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

  state = {
   rate: 1,
   volume: 1,
   muted: false,
   resizeMode: 'contain',
   duration: 0.0,
   currentTime: 0.0,
   controls: false,
   paused: true,
   skin: 'custom'
 };

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
            passProps: {
              email: this.state.email,
              password: this.state.password
            }
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
        <View style={{height: 680, width: 380,flex:1, flexDirection: 'column',backgroundColor: 'powderblue',alignItems:'center'}}>
          <Image
          source={require('./pics/bcg.png')} style={{height:680,width:380}}>
            <View style={{height: 300, justifyContent: 'center',alignItems:'center'}}>
            </View>
            <View style={{height: 130, justifyContent: 'space-between',alignItems:'center'}}>
              <View style={styles.textInput}>
              	<TextInput style={{height: 35,width: 300}} placeholder=" Email"
              	onChangeText={(email) => this.setState({email})} autoCapitalize="none"/>
              </View>
              <View style={styles.textInput}>
              	<TextInput style={{height: 35,width: 300}} placeholder=" Password"
              	onChangeText={(password) => this.setState({password})} autoCapitalize="none" secureTextEntry={true}/>
              </View>
            </View>
            <View style={{height: 200, justifyContent: 'center',alignItems:'center'}}>
              <View style={styles.button}>
                <TouchableHighlight onPress={this._goToHomePage}>
                	<Text>Sign In</Text>
                </TouchableHighlight>
              </View>
              <View style={{height:60}}/>
              <View style={styles.button}>
                <TouchableHighlight onPress={this._goToCreateAccount}>
                	<Text>Create Account</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Image>
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
    padding:10,

  },
  forgetPassWord: {
  	fontFamily: 'Cochin',
  	fontStyle: 'normal',
  	paddingLeft: 40,
  	paddingTop: 10,
  },
  button: {
    backgroundColor:'azure',
    borderBottomLeftRadius:20,
    borderTopRightRadius:20,
    borderTopLeftRadius:20,
    borderBottomRightRadius:20,
    padding: 10,
  },
  logo: {
  	width: 50,
  	height: 50,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }
});
