import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Text,
  Image,
  TextInput,
  View,
  TabBarIOS,
  NavigatorIOS,
  Dimensions,
  ScrollView
} from 'react-native';

import CalendarScene from './CalendarScene';
import HomePageScene from './HomePageScene';
import JobList from './JobList';
import Comment from './Comment';
import {
  FormLabel,
  FormInput,
  Button,
  List,
  ListItem
} from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';
import NavigationBar from 'react-native-navbar';
import EventScene from './Event';
// import AddJobForm from './AddJobForm';
// import Google from './Google';
// import DynamicList from './DynamicList'
import LinearGradient from 'react-native-linear-gradient';

var REQUEST_URL = 'https://hitch.herokuapp.com/api/getUndoTimeStamp?user_email=tian@test.com'


export default class CountDownScene extends Component {
  static get defaultProps() {
    return {
      title: 'Job List'
    };
  }
  static propTypes = {
    title: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this._goToSpecificEvent = this._goToSpecificEvent.bind(this);
    this.state = {
        jobs: null,
        searched_jobs: null,
      loaded: false,
      search:false,
      rowToDelete : null,
      add_comment_id: -1,
      date: new Date(),
      selectedTab: 'firstTab',
    };
  }

  _goToDifferent(){
    this.setState({search: false});
    var a = 1;
  }

  _goToSpecificEvent(id) {
    this.props.navigator.push({
      component: EventScene,
      title: 'Application Process',
      passProps: {
        event_id: id,
      }
    });
  }

  _onAfterRemovingElement() {
    this.setState({
      rowToDelete : null,
      dataSource  : this.state.dataSource.cloneWithRows(this._data)
      });
  }




  fetchData() {
    fetch(REQUEST_URL, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          jobs:responseData.res.timeStamp_list,
          loaded: true,
        });
      })
      .done();

  }


  componentDidMount() {
    this.fetchData();
  }


  _parseDate(dateString) {
    var monthtoDay = {
      "Jan" : 0,
      "Feb" : 1,
      "Mar" : 2,
      "Apr" : 3,
      "May" : 4,
      "Jun" : 5,
      "Jul" : 6,
      "Aug" : 7,
      "Sep" : 8,
      "Oct" : 9,
      "Nov" : 10,
      "Dec" : 11
    };

    var eventDate = parseInt( dateString.substring(5,7) );
    var eventMonth = monthtoDay[ dateString.substring(8,11) ];
    var eventYear = parseInt( dateString.substring(12,17) );
    return new Date(eventYear, eventMonth, eventDate);
  }

  _getDiffDays(dateString) {
    var eventDateObj = this._parseDate(dateString);
    var oneDay = 24*60*60*1000;
    var diffDays = Math.ceil(Math.abs(eventDateObj.getTime() - this.state.date.getTime())/oneDay);
    return diffDays;
  }

  _dateFormat() {
    var monthNames = ["Janunary", "Februrary", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"];
    var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return dayNames[this.state.date.getDay()] + ',\n' +
           this.state.date.getDate() + "th " + monthNames[this.state.date.getMonth()];
    // return "day: " + new Date().getDay() + "date: " + new Date().getDate() + "month: " + this.state.date.getMonth();
  }

  render() {


    if (!this.state.loaded) {
      return this.renderLoadingView();
    }



    this.fetchData();


      return (
      <View style={{flex:1, flexDirection: 'column'}}>
        <View style={{height:620}}>
        <LinearGradient colors={['#928DAB','#408AC7']}
                        style={styles.linearGradient}>
          <View style={{height: 40, justifyContent: 'center',alignItems:'center'}}>
          </View>
          <View>
            <Text style={{color: '#eeeae5', fontSize: 40, textAlign: 'left', backgroundColor: 'rgba(0,0,0,0)',
                      paddingTop: 20, paddingBottom: 10, paddingLeft: Dimensions.get('window').width/20}}>
              {this._dateFormat()}
            </Text>
          </View>
          <ScrollView style={styles.container}
          automaticallyAdjustContentInsets={false}
          >
          <List>
            {
              this.state.jobs.map((l, i) => (

          <ListItem
            key={i}
            title={this._getDiffDays(l.deadline) + ' Days left'}
            titleStyle={{fontSize: 22, color: '#eeeae5'}}
            subtitleStyle={{fontSize: 15, color: 'white'}}
            subtitle = {l.description}
            leftIcon={{name: 'clock-o', type: 'font-awesome', color: '#eeeae5'}}
            containerStyle={{backgroundColor: 'transparent'}}
            onPress = {()=>this._goToSpecificEvent(l.id)}
          />
          ))
            }
          </List>
          </ScrollView>
          </LinearGradient>
        </View>
        <View style={{flex:1, flexDirection: 'column', backgroundColor:'skyblue'}}>
        <TabBarIOS
       unselectedTintColor="black"
          tintColor="mediumseagreen"
          barTintColor="white"
          backgroundColor = "azure">
        <Icon.TabBarItemIOS
          iconName="clock-o"
          title="CountDown"
          selected={this.state.selectedTab === 'firstTab'}
          iconColor={"mediumseagreen"}
          renderAsOriginal={true}
          >
          <Text>Home</Text>
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
          <Text>Home</Text>
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
                passProps: {
                  email: this.props.email,
                  password: this.props.password
                }
              });
          }}>
          <Text>Home</Text>
        </Icon.TabBarItemIOS>

         <Icon.TabBarItemIOS
            iconName="file-o"
            title="Notes"
            selected={this.state.selectedTab === 'fourthTab'}
            iconColor={"black"}
            renderAsOriginal={true}
            onPress={() => {
              this.props.navigator.replace({
                  component: Comment,
                  title: 'Notes',
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
          <Text>Home</Text>
        </Icon.TabBarItemIOS>
      </TabBarIOS>
        </View>

      </View>
    );
            };

  renderLoadingView() {
    return (
      <Text>
      Loading companies...
      </Text>
      );
    }
  }




var styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0)',
    height: 620,
  },
  linearGradient: {
    height: 620,
    width: Dimensions.get('window').width
  }
});
