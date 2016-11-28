import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  TouchableHighlight,
  NavigatorIOS,
  Text,
  Image,
  TextInput,
  View,
  ScrollView,

} from 'react-native';

import {
  Button, List, ListItem, CheckBox, SearchBar, Icon, Tabs, Tab,
} from 'react-native-elements'

import AddJobForm from './AddJobForm';

export default class CountDownScene extends Component {
  static get defaultProps() {
    return {
      title: 'GlassDoor Related'
    };
  }
  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      company_name:'',
      company_depart:'',
      position_title:'',
      app_URL:'',
      selectedTab:'searchTab',
      responseData : require('./auto-company.json'),
    }
  }

  addJobAutoHelp()
  {
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
    }


  addJobAuto(l)
  {
    var data = this.state.responseData.jobs.job_list;
    for (var i = 0; i < data.length; i++)
    {
      if (data[i].company_name == l)
      {
          this.setState({company_name: l});
          this.setState({company_depart: data[i].company_depart});
          this.setState({position_title: data[i].position_title});
          this.setState({app_URL: data[i].app_URL});          
          this.addJobAutoHelp();
      }
    }
  }
 
	
  render() {
		return (
      <View style={{flex:1, flexDirection: 'column',backgroundColor: 'lightgrey'}}>
       
    <View style={{height: 65, justifyContent: 'center',alignItems:'center'}}>
        </View>
       
      <SearchBar
      onChangeText={(l) => this.addJobAuto(l)}
      placeholder='Add job by typing company name...' />

              <View style={{height: 120, justifyContent: 'flex-start',alignItems:'center'}}>
          <View style={styles.textInput}>
            <TouchableHighlight onPress={this._goToJobList}>
              <Text> Add Job </Text>
            </TouchableHighlight>
          </View>
        </View>
        
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
          systemIcon="top-rated"
          selected={this.state.selectedTab === 'ratingTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'ratingTab',
            });

          }}>
          <Text> </Text>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="more"
          title="More"
          selected={this.state.selectedTab === 'moreTab'}
          onPress={() => {
              this.props.navigator.replace({
                  component: AddJobForm,
                  title: 'Add Job Form',
                });

          }}>
          <Text> </Text>
        </TabBarIOS.Item>
        </TabBarIOS>
      </View>

		)
	};
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