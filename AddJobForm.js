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

export default class AddJobForm extends Component {
  static get defaultProps() {
    return {
      title: 'Add Job Form'
    };
  }
  static propTypes = {
    title: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this._goToJobList = this._goToJobList.bind(this);
    this.state = {
      company_name:'',
      company_depart:'',
      position_title:'',
      app_URL:''
    }
  }

  _goToJobList() {
     fetch("https://hitch.herokuapp.com/api/addjob", {
      method: 'POST',
      headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
      body: JSON.stringify({ 
        user_email: 'tian@test.com', //REMEMBER TO CHANGE
        company_name: this.state.company_name,
        company_depart: this.state.company_depart,  
        position_title: this.state.position_title,
        app_URL: this.state.app_URL
      })
    })
      .then((response) => response.json())
      .then((responseData) => {
        if(responseData.result == "success"){
          this.props.navigator.pop()        
        }else{
          AlertIOS.alert(
            "Add job failed"
          )
        }
      }) 
      .done(); 
  
    //this.props.navigator.pop();
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
            onChangeText={(company_name) => this.setState({company_name})}/>
          </View>

          <View style={styles.textInput}>
            <TextInput style={{height: 40,width: 300}} placeholder=" Department "
            onChangeText={(company_depart) => this.setState({company_depart})}/>
          </View>

          <View style={styles.textInput}>
            <TextInput style={{height: 40,width: 300}} placeholder="Job Title "
            onChangeText={(position_title) => this.setState({position_title})}/>
          </View>

           <View style={styles.textInput}>
            <TextInput style={{height: 40,width: 300}} placeholder=" URL to apply "
            onChangeText={(app_URL) => this.setState({app_URL})}/>
          </View>


        </View>

        <View style={{height: 200}}>
        </View>
        <View style={{height: 120, justifyContent: 'flex-start',alignItems:'center'}}>
          <View style={styles.textInput}>
            <TouchableHighlight onPress={this._goToJobList}>
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
    borderBottomLeftRadius:5,
    borderTopRightRadius:5,
    borderTopLeftRadius:5,
    borderBottomRightRadius:5,
  },
  button: {
    height: 40,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: 'azure',
  },
});