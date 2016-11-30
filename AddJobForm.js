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


//Add from github package
import { FormLabel, FormInput } from 'react-native-elements';
//end

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
      app_URL:'',
      selectedTab: 'moreTab'
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
       <View style={{marginTop: 70, flex:1,backgroundColor: 'lightgrey'}}>
    
        <TabBarIOS
           unselectedTintColor="yellow"
           tintColor="white"
           barTintColor="darkslateblue">
        <TabBarIOS.Item
          title="search Tab"
          systemIcon="search"
          selected={this.state.selectedTab === 'searchTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'searchTab',
            });
          }}>
          <Text> </Text>
        </TabBarIOS.Item>

        <TabBarIOS.Item
          systemIcon="more"
          title="More"
          selected={this.state.selectedTab === 'moreTab'}
          onPress={() => {
              this.props.navigator.push({
                  component: AddJobForm,
                  title: 'Add Job Form',
                });

          }}>
          <Text> </Text>
        </TabBarIOS.Item>
        </TabBarIOS>

          <View style={{height: 80, justifyContent: 'center',alignItems:'center'}}> 
        </View>
        <FormLabel>Company Name</FormLabel>
        <FormInput onChangeText={(company_name) => this.setState({company_name})}/>


        <FormLabel>Department Name</FormLabel>
        <FormInput onChangeText={(company_depart) => this.setState({company_depart})}/>

         <FormLabel>Job Title</FormLabel>
         <FormInput onChangeText={(position_title) => this.setState({position_title})}/>

          <FormLabel>Company Website</FormLabel>
         <FormInput onChangeText={(app_URL) => this.setState({app_URL})}/>

       
        <View style={{height: 200}}>
        </View>
        <View style={{height: 120, justifyContent: 'flex-start',alignItems:'center'}}>
          <View style={styles.textInput}>
            <TouchableHighlight onPress={this._goToJobList}>
              <Text> Add Job </Text>
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
    backgroundColor:'white',
    borderBottomLeftRadius:5,
    borderTopRightRadius:5,
    borderTopLeftRadius:5,
    borderBottomRightRadius:5,
  },
  button: {
    height: 40,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: 'white',
  },
});