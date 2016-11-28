import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  TabBarIOS,
  Text,
  Image,
  DatePickerIOS,
  NavigatorIOS,
  ScrollView,
  AlertIOS,
  Dimensions,
  TextInput,
  View
} from 'react-native';

import HomePageScene from './HomePageScene';
import CalendarScene from './CalendarScene';
import Settings from './SettingsScene';
import JobList from './JobList';

import {
  FormLabel,
  FormInput,
  Button,
  List,
  ListItem
} from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';
import EventScene from './Event';
import LinearGradient from 'react-native-linear-gradient';


export default class CountDownScene extends Component {
  static get defaultProps() {
    return {
      title: 'Count Down'
    };
  }

  static propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }

  state = {
    date: new Date(),
    loaded: false,
    length: 0
  }

  _goEventDetail(id) {
    this.props.navigator.push({
      component: EventScene,
      title: 'EventScene',
      passProps: { event_id: id }
    });
  }

  _dateFormat() {
    var monthNames = ["Janunary", "Februrary", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"];
    var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return dayNames[this.state.date.getDay()] + ',\n' +
           this.state.date.getDate() + "th " + monthNames[this.state.date.getMonth()];
    // return "day: " + new Date().getDay() + "date: " + new Date().getDate() + "month: " + this.state.date.getMonth();
  }

  _fetchData() {
    var URL = 'https://hitch.herokuapp.com/api/getUndoTimeStamp?user_email=tian@test.com';
    return fetch(URL)
      .then((response) => response.json())
      .then((responseJson) => {
        var state = [];
        var len = responseJson.res.timeStamp_list.length;
          state['size'] = len*3;
          for (var i = 0; i < len; i++) {
            state[i] = responseJson.res.timeStamp_list[i].deadline;
          }
          for (var i = len; i < 2*len; i++) {
            state[i] = responseJson.res.timeStamp_list[i-len].description;
          }
          for (var i = 2*len; i < 3*len; i++) {
            state[i] = String(responseJson.res.timeStamp_list[i-2*len].id);
          }

        this.setState(state);
        this.setState({
          loaded : true,
          length : len
        });
        // return events;
      })
      .catch(function(err) {
        // something went wrong
        AlertIOS.alert("failed to get event!", "Please check you network");
      })
      .done();
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

  render() {
    var URL = 'https://hitch.herokuapp.com/api/getTimeStamp?event_id=2';

    var events = [];
    

    if (this.state.loaded == false) {
      this._fetchData();
    }


    for (var i = 0; i < this.state.length; i++) {
      var eventDateString = this.state[i];
      var eventDateObj = this._parseDate(eventDateString);
      
      var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
      var diffDays = Math.ceil(Math.abs(eventDateObj.getTime() - this.state.date.getTime())/oneDay);
      var id = parseInt(this.state[this.state.length*2 + i]);

      // AlertIOS.alert("id", id+ '....');

      events.push(<ListItem key={i}
                      title={id + ' Days left'}
                      titleStyle={{fontSize: 22, color: '#eeeae5'}}
                      subtitle={this.state[i]}
                      subtitleStyle={{fontSize: 15, color: 'white'}}
                      leftIcon={{name: 'clock-o', type: 'font-awesome', color: '#eeeae5'}}
                      containerStyle={{backgroundColor: 'transparent'}}
                      onPress={() => this._goEventDetail(this.props.event_id)}
                      event_id={id} >

                  </ListItem>
                  );
    }


    return (
      <View style={{flex:1, flexDirection: 'column'}}>
        <View style={{height:620}}>
        <LinearGradient colors={['#1F2F3C', '#3D5167', '#5C7894', '#7C9AAF', '#97B2BE']}
                        style={styles.linearGradient}>
          <View style={{height: 60, justifyContent: 'center',alignItems:'center'}}>
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
            {events}
          </List>
          </ScrollView>
          </LinearGradient>
        </View>
        <View style={{flex:1, flexDirection: 'column', backgroundColor:'skyblue'}}>
          <TabBarIOS
          unselectedTintColor="azure"
          tintColor="white"
          barTintColor="gainsboro"
          backgroundColor = "azure">
          <Icon.TabBarItemIOS
            iconName="clock-o"
            title="CountDown"
            selected={this.state.selectedTab === 'firstTab'}
            iconColor={"grey"}
            selectedIconColor={'#1F2F3C'}
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
            <Text>Home</Text>
          </Icon.TabBarItemIOS>
          <Icon.TabBarItemIOS
            iconName="calendar"
            title="Calendar"
            selected={this.state.selectedTab === 'secondTab'}
            iconColor={"grey"}
            selectedIconColor={'#1F2F3C'}
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
            iconColor={"grey"}
            selectedIconColor={'#1F2F3C'}
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
            iconName="user"
            title="Profile"
            selected={this.state.selectedTab === 'fourthTab'}
            iconColor={"grey"}
            selectedIconColor={'#1F2F3C'}
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
    )
  };
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