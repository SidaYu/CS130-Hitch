import React, { Component, PropTypes } from 'react';
import JobList from './JobList';
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
        <View style={{height: 100, justifyContent: 'center',alignItems:'center'}}>
          <Text>Add Job</Text>
        </View>

        <View style={{height: 200, justifyContent: 'space-between',alignItems:'right', alignItems:'center'}}>
          
          <View style={styles.textInput}>
            <TextInput style={{height: 40,width: 300}} placeholder=" Company Name "
            onChangeText={(text) => this.setState({text})}/>
          </View>

          <View style={styles.textInput}>
            <TextInput style={{height: 40,width: 300}} placeholder=" Job Type "
            onChangeText={(text) => this.setState({text})}/>
          </View>

          <View style={styles.textInput}>
            <TextInput style={{height: 40,width: 300}} placeholder=" Application Due Day "
            onChangeText={(text) => this.setState({text})}/>
          </View>

           <View style={styles.textInput}>
            <TextInput style={{height: 40,width: 300}} placeholder=" First Interview Time "
            onChangeText={(text) => this.setState({text})}/>
          </View>


        </View>

        <View style={{height: 200}}>
        </View>
        <View style={{height: 120, justifyContent: 'center',alignItems:'center'}}>
          <View style={styles.textInput}>
            <TouchableHighlight onPress={this.props.onForward}>
              <Text>Add Job</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={{height: 200, justifyContent: 'center', alignItems:'center'}}>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor:'azure',
    borderBottomLeftRadius:10,
    borderTopRightRadius:10,
    borderTopLeftRadius:10,
    borderBottomRightRadius:10,
  },
  button: {
    height: 40,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: 'azure',
  },
});