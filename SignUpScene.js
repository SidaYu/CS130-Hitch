import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Text,
  Image,
  TextInput,
  View
} from 'react-native';

export default class SignUpScene extends Component {
  static get defaultProps() {
    return {
      title: 'Sign Up'
    };
  }
  static propTypes = {
    title: PropTypes.string.isRequired,
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
            onChangeText={(text) => this.setState({text})}/>
          </View>
          <View style={styles.textInput}>
            <TextInput style={{height: 40,width: 300}} placeholder=" Password"
            onChangeText={(text) => this.setState({text})}/>
          </View>
        </View>
        <View style={{height: 200}}>
        </View>
        <View style={{height: 120, justifyContent: 'center',alignItems:'center'}}>
          <View style={styles.textInput}>
            <TouchableHighlight onPress={this.props.onForward}>
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
