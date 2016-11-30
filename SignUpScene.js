import React, { Component, PropTypes } from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';

import HomePageScene from './HomePageScene';
import CountDown from './CountDownScene';
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
      password:'',
      loaded: false
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
            "Account Creation Failed",
            "This user is already registered."
          )
        }else{
          this.props.navigator.push({
            component: CountDown,
            title: 'Count Down',
            navigationBarHidden: true,
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
      <View style={{backgroundColor:'lightsteelblue'}}>
        <View style={{flex:1, flexDirection: 'column', backgroundColor:'lightsteelblue'}}>
          <View style={{height: 220, justifyContent: 'center',alignItems:'center', backgroundColor:'lightsteelblue'}}>
          </View>
          <View style={{height: 180, justifyContent: 'space-between', alignItems: 'center', backgroundColor:'lightsteelblue'}}>
            <Fumi style={{width:350}} label={'Email'} iconClass={FontAwesomeIcon} iconName={'envelope-o'} onChangeText={(email) => this.setState({email})} iconColor={'#f95a26'} autoCapitalize="none"/>
            <Fumi style={{width:350}} label={'Password'} iconClass={FontAwesomeIcon} iconName={'key'} onChangeText={(password) => this.setState({password})} iconColor={'#ac83c4'} autoCapitalize="none" secureTextEntry={true}/>
          </View>
          <View style={{height: 80, backgroundColor:'lightsteelblue'}}>
          </View>
          <View style={{height: 60, justifyContent: 'center',alignItems:'center', backgroundColor:'lightsteelblue'}}>
            <View>
              <LinearGradient
                colors={['#4c669d', '#3b5998', '#192f6a']}
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
                onPress={this._goToHomePage}
                borderRadius={10}/>
              </LinearGradient>
            </View>
          </View>
          <View style={{height: 140, justifyContent: 'center', alignItems:'center', backgroundColor:'lightsteelblue'}}>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor:'white',
    borderBottomLeftRadius:5,
    borderTopRightRadius:5,
    borderTopLeftRadius:5,
    borderBottomRightRadius:5,
    padding: 10,
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
  linearGradient: {
    flex: 1,
    height: 20,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10
  },
});
