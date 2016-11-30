import React, { Component, PropTypes } from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';

import SignUpScene from './SignUpScene';
import HomePageScene from './HomePageScene';
import CountDown from './CountDownScene';
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

import {
  Button
} from 'react-native-elements'

import LinearGradient from 'react-native-linear-gradient';


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
      password:'',
      loaded: false,
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
            component: CountDown,
            title: 'Count Down',
            navigationBarHidden: true,
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
        <View style={{height: 680, width: 380,flex:1, flexDirection: 'column',backgroundColor: 'lightsteelblue',alignItems:'center'}}>
          <View style={{height:680,width:380}}>
            <View style={{height: 60, justifyContent: 'center',alignItems:'center'}}>
            </View>
            <View style={{height: 360, justifyContent: 'space-between', alignItems: 'center'}}>
              <Image style={{width: 240, height: 150}} source={require('./pics/logo1.jpg')}/>
              <Fumi style={{width:350}} label={'Email'} iconClass={FontAwesomeIcon} iconName={'envelope-o'} onChangeText={(email) => this.setState({email})} iconColor={'#f95a26'} autoCapitalize="none"/>
              <Fumi style={{width:350}} label={'Password'} iconClass={FontAwesomeIcon} iconName={'key'} onChangeText={(password) => this.setState({password})} iconColor={'#ac83c4'} autoCapitalize="none" secureTextEntry={true}/>
            </View>
            <View style={{height:50}}/>
            <View style={{height: 60, justifyContent: 'space-between',alignItems:'center'}}>
              <View>
                <LinearGradient
                  colors={['#4c669d', '#3b5998', '#192f6a']}
                  style={styles.linearGradient}
                  width={200}>
                  <Button
                  large
                  iconRight
                  icon={{name: 'pencil-square-o', type: 'font-awesome', color: 'white'}}
                  title='Sign In'
                  fontSize={14}
                  color='lightgrey'
                  backgroundColor='transparent'
                  onPress={this._goToHomePage}
                  borderRadius={10}/>
                </LinearGradient>
              </View>
              <View style={{height:20}}/>
              <View>
                <LinearGradient
                  colors={['#4c669f', '#3b5998', '#192f6a']}
                  style={styles.linearGradient}
                  width={200}>
                  <Button
                  large
                  iconRight
                  icon={{name: 'pencil-square-o', type: 'font-awesome', color: 'white'}}
                  title='Create Account'
                  fontSize={14}
                  color='lightgrey'
                  backgroundColor='transparent'
                  onPress={this._goToCreateAccount}
                  borderRadius={10}/>
                </LinearGradient>
              </View>
            </View>
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
    padding:10,
  },
  default: {
    height: 26,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    flex: 1,
    fontSize: 13,
    padding: 4,
    backgroundColor: 'skyblue',
  },
  forgetPassWord: {
  	fontFamily: 'Cochin',
  	fontStyle: 'normal',
  	paddingLeft: 40,
  	paddingTop: 10,
  },
  button: {
    backgroundColor:'white',
    borderBottomLeftRadius:5,
    borderTopRightRadius:5,
    borderTopLeftRadius:5,
    borderBottomRightRadius:5,
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
  },
  linearGradient: {
    flex: 1,
    height: 20,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10
  },
});
