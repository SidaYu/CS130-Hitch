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
  ListView,
  TabBarIOS,
  AlertIOS
} from 'react-native';
import {
  Button, List, ListItem, CheckBox, SearchBar,  Tabs, Tab,
} from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';


import NavigationBar from 'react-native-navbar';
import AddJobForm from './AddJobForm';
import DynamicList from './DynamicList';
import JobList from './JobList';
import CalendarScene from './CalendarScene';
import CountDown from './CountDownScene';
import HomePageScene from './HomePageScene';


var REQUEST_URL = 'https://hitch.herokuapp.com/api/getAllJobs?user_email=tian@test.com';
var customData = require('./question.json')

var styles = StyleSheet.create({
  background:
  {
    flex:1, 
  },
  container: {
    padding: 5,
    marginBottom: 10,
    backgroundColor: 'white'
  },
  listView: {
    paddingTop: 20,
  },
  company: {
    color: 'dimgrey',
    fontSize: 15,
    marginBottom: 8,
    textDecorationLine: 'underline',
  },
  position: {
    textAlign: 'center',
    color: 'lightslategray',
  },
  line:{
    borderBottomWidth: 1,
    borderBottomColor: 'silver',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginBottom:4,
  }
});


export default class Comment extends Component {
  static get defaultProps() {
    return {
      title: 'All Comments'
    };
  }
  static propTypes = {
    title: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired,
  }

constructor(props) {
    super(props);
    this._renderSingleCommentt = this._renderSingleCommentt.bind(this);
    this._deleteItemm = this._deleteItemm.bind(this);

    this.state = {
       dataSource: new ListView.DataSource({
         rowHasChanged: (row1, row2) => row1 !== row2,
       }),
       loaded: false,
       selectedTab: 'fourthTab'
     };
  }


  fetchData() {
    fetch(REQUEST_URL,{
            headers: {
        'Cache-Control': 'no-cache'
      }})
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.user_info.jobs),
          loaded: true,
        });
      })
      .done();
  }


_deleteItemm(id){
      fetch('https://hitch.herokuapp.com/api/deleteComment', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify({
        comment_id: +id,
      })
    })
    // .then((response) => response.json())
    .then((response) => console.log(response))
    .then((responseData) => {
      this.setState({
        });
    })
    .done();
    this.fetchData();
    //this.props.navigator.pop();
    this.render();
  }

  componentDidMount() {
    this.fetchData();
  }


  renderLoadingView() {
    return (
          <Text>
            Loading companies...
          </Text>
    );
  }

  renderSingleComment(comments){
    return comments.map(function(c, i){
      return(
        <View key={i}>
          <Text>{c}</Text>
        </View>
      );
    });
  }

  _renderSingleCommentt(comments){
    AlertIOS.alert(
            "display comment"
          );
    for (var i = 0; i < comments.length; i++)
    {
      return(
        <Text>{comments[i].comment}</Text>
      );
    }
  }



 renderComments(jobs) {
     contents = jobs.comments.map(function(item){
      return(
        <View key = {item.comment} style = {styles.line}> 
          <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',}}>
          <Text style = {styles.position}>{item.comment}</Text>
          <Icon
            name='trash' onPress={()=>this._deleteItemm(item.id)}/>
          </View>
        </View>
      );
    });

    return (
        <View style = {styles.container}>
            <Text style={styles.company}>{jobs.company_name}</Text>
            <View>{contents}</View>

        </View>
    );
  }

  popQuestions()
  {
    AlertIOS.alert(
 'Questions',
 'Keep your app up to date to enjoy the latest features',
 [
   {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
   {text: 'Install', onPress: () => console.log('Install Pressed')},
 ],
);
  }

 render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
        <View style = {{marginTop: 70, backgroundColor: 'lightsteelblue', flex: 1}} >
        <View style = {{height: 500}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderComments}
          style={styles.listView}
        />
        </View>

        <View>
        <Icon name = 'trash' onPress={this.popQuestions} />
        </View>

      <View style={{flex:1, flexDirection: 'column', backgroundColor:'lightsteelblue'}}>
       <TabBarIOS
          unselectedTintColor="black"
          tintColor="mediumseagreen"
          barTintColor="white"
          backgroundColor = "azure">
          <Icon.TabBarItemIOS
            iconName="clock-o"
            title="CountDown"
            selected={this.state.selectedTab === 'firstTab'}
            iconColor={"black"}
            renderAsOriginal={true}
            onPress={() => {
              this.props.navigator.replace({
                  component: CountDown,
                  title: 'Count Down ',
                  navigationBarHidden: true,
                  passProps: {
                    email: this.props.email,
                    password: this.props.password
                  }
                });
            }}>
            <Text></Text>
          </Icon.TabBarItemIOS>
          <Icon.TabBarItemIOS
            iconName="calendar"
            title="Calendar"
            selected={this.state.selectedTab === 'secondTab'}
            iconColor={"black"}
            renderAsOriginal={true}
            onPress={() => {
              this.props.navigator.replace({
                  component: CalendarScene,
                  title: 'Calendar',
                  navigationBarHidden: true,
                  passProps: {
                    email: this.props.email,
                    password: this.props.password
                  }
                });
            }}>
            <Text></Text>
          </Icon.TabBarItemIOS>
          <Icon.TabBarItemIOS
            iconName="list"
            title="MyJobs"
            selected={this.state.selectedTab === 'thirdTab'}
            iconColor={"black"}
            renderAsOriginal={true}
            onPress={() => {
              this.props.navigator.replace({
                  component: JobList,
                  title: 'Job List',
                  navigationBarHidden: true,
                  passProps: {
                    email: this.props.email,
                    password: this.props.password
                  }
                });
            }}>
            <Text></Text>
          </Icon.TabBarItemIOS>
          <Icon.TabBarItemIOS
            iconName="file-o"
            title="Notes"
            selected={this.state.selectedTab === 'fourthTab'}
            iconColor={"mediumseagreen"}
            renderAsOriginal={true}
            >
            <Text></Text>
          </Icon.TabBarItemIOS>

          <Icon.TabBarItemIOS
            iconName="user"
            title="Profile"
            selected={this.state.selectedTab === 'fifthTab'}
            iconColor={"black"}
            renderAsOriginal={true}
            onPress={() => {
              this.props.navigator.replace({
                  component: HomePageScene,
                  title: 'Home Page',
                  navigationBarHidden: true,
                  passProps: {
                    email: this.props.email,
                    password: this.props.password
                  }
                });
            }}>
            <Text></Text>
          </Icon.TabBarItemIOS>
          


          
        </TabBarIOS>
        </View>




        </View>
    );
  }
}