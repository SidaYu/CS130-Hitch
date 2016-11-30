import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Text,
  Image,
  TextInput,
  View,
  NavigatorIOS,
  ScrollView,
  AlertIOS,
  Linking
} from 'react-native';
import {
  Button, List, ListItem, CheckBox, SearchBar, Icon, Tabs, Tab,
} from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';




import NavigationBar from 'react-native-navbar';

import Comment from './Comment'
import AddJobForm from './AddJobForm';
import AddJobFormAuto from './AddJobFormAuto';
import DynamicList from './DynamicList'
import JobList from './JobList';

var REQUEST_URL = 'http://api.glassdoor.com/api/api.htm?t.p=108386&t.k=gOGr6axYbOq&userip=172.91.91.28&useragent=Mozilla/5.0%2520(Macintosh;%2520Intel%2520Mac%2520OS%2520X%252010_11_6)%2520AppleWebKit/537.36%2520(KHTML,%2520like%2520Gecko)%2520Chrome/54.0.2840.98%2520Safari/537.36&format=json&v=1&action=employers&q=software%2527'
var Swipeout = require('react-native-swipeout')

var styles = StyleSheet.create({
  background:
  {
    flex:1, 
  },
  container: {
    padding: 3,
    marginBottom: 8,
    backgroundColor: 'white'
  },
  listView: {
    paddingTop: 20,
  },
  company: {
    color: 'dimgrey',
    fontSize: 16,
    marginBottom: 8,
  },
  position: {
    textAlign: 'center',
    color: 'lightslategray',
    fontSize: 14
  },
  line:{
    borderBottomWidth: 1,
    borderBottomColor: 'silver',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginBottom:4,
  }
});
export default class JobDetail extends Component {
  static get defaultProps() {
    return {
      title: 'Job Detail'
    };
  }
  static propTypes = {
    title: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired,
  }

constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }


fetchData() {
     fetch("https://hitch.herokuapp.com/api/addjob", {
      method: 'POST',
      headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
      body: JSON.stringify({ 
        user_email: 'tian@test.com', //REMEMBER TO CHANGE
        company_name: this.props.m_n,
        company_depart: "",  
        position_title: "Software Development Test",
        app_URL: this.props.m_w,
      })
    })
      .then((response) => response.json())
      .then((responseData) => {
        if(responseData.result == "success")
        {
          AlertIOS.alert(
            'Add job succeeded',
            null,
            (() => this.popHelp()),
          );
        }
        else
        {
          AlertIOS.alert("Add job failed")
        }
      })
      .done(); 
  }

  helpFind()
  {
    var data = this.props.employers;
    var id = this.props.job_id;

    for (var i = 0; i < data.length; i++)
    {
        if (data[i].id == id)
        {
          this.setState({
            company: data[i].name,
            overallRating : data[i].overallRating,
            careerRating : data[i].careerOpportunitiesRating,
            review : data[i].featuredReview.pros,
            website : data[i].website,
          });
        }
    }    
  }

  popHelp(){
    this.props.navigator.pop()
  }



  render() 
  {
    return (
      <View style={{padding:20, marginTop: 50, flex: 1, backgroundColor: 'lightsteelblue'}}>
        <View style={{flex:10, justifyContent: 'space-around', paddingBottom: 30}}>

        <View style = {styles.container}>
        <Text style = {styles.company}>Company</Text>
        <Text style = {styles.position}>{this.props.m_n}</Text>
        </View>

        <View style = {styles.container}>
        <Text style = {styles.company}>Website</Text>
        <Text  onPress={() => Linking.openURL(this.props.m_w).catch(err => console.error('An error occurred', err))} style = {styles.position}>{this.props.m_w}</Text>
        

        </View>

        <View style = {styles.container}>
        <Text style = {styles.company}>Overall Rating</Text>
        <Text style = {styles.position}>{this.props.m_o}</Text>
        </View>

        <View style = {styles.container}>
        <Text style = {styles.company}>Career Opportunities Rating</Text>
        <Text style = {styles.position}>{this.props.m_c}</Text>
        </View> 

        <View style = {styles.container}>
        <Text style = {styles.company}>Review</Text>
        <Text style = {styles.position}>{this.props.m_r}</Text>
        </View>

        </View>

        <View alignItems={'center'}>
          <LinearGradient 
            colors={['#4c669f', '#3b5998', '#192f6a']} 
            style={styles.linearGradient}
            width={300}>

        <Button
        large
        iconRight
        icon={{name: 'pencil-square-o', type: 'font-awesome', color: 'white'}}
        title='Add Job!'
        fontSize={24}
        color='white'
        backgroundColor='transparent'
        onPress={()=>this.fetchData()}
        borderRadius={10}/>

         </LinearGradient>
        </View>
      </View>

    );
  }
}

