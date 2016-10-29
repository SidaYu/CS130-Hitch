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
  }

  _goToCreateAccount() {
    this.props.navigator.push({
      component: SignUpScene,
      title: 'Sign Up',
    });
  }

  _goToHomePage() {
    this.props.navigator.push({
      component: HomePageScene,
      title: 'Home Page',
    });
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
          	onChangeText={(text) => this.setState({text})}/>
          </View>
          <View style={styles.textInput}>
          	<TextInput style={{height: 40,width: 300}} placeholder=" Password"
          	onChangeText={(text) => this.setState({text})}/>
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
