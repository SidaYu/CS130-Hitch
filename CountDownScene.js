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

  static defaultProps = {
    date: new Date()
  };

  constructor(props) {
    super(props);
    this.state = {
      date_list:[],
      selectedTab: 'thirdTab',
      date: new Date(),
    };

  }

  _goEventDetail() {
    this.props.navigator.push({
      component: EventScene,
      title: 'EventScene'
    });
  }

  _dateFormat() {
    var monthNames = ["Janunary", "Februrary", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"];
    var dayNames = ["Monday", "Tuesday", "Wednesday", "Thurday", "Friday", "Saturday", "Sunday"];
    return dayNames[this.state.date.getDay()-1] + ',\n' +
           this.state.date.getDate() + "th " + monthNames[this.state.date.getMonth()-1];
  }

	render() {
    var URL = 'https://hitch.herokuapp.com/api/getTimeStamp?event_id=2';

    // url (required), options (optional)

    fetch(URL, {
        method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
        var data = responseJson.data;
        // for (var i in data.res.timeStamp_list) {
        //   this.setState({ data: this.state.data.push(i.deadline) });
        // }
      })
      .catch(function(err) {
        // something went wrong
        AlertIOS.alert("failed to get event!", "......");
      })
      .done();


    var events = [];
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds

    for (var i = 0; i < 5; i++) {
      //var diffDays = Math.round(Math.abs((this.state.time - this.state.time)/(oneDay)));
      events.push(<ListItem key={i}
                      title={'Days left'}
                      titleStyle={{fontSize: 22, color: '#eeeae5'}}
                      subtitle={'this event'}
                      subtitleStyle={{fontSize: 15, color: 'white'}}
                      leftIcon={{name: 'clock-o', type: 'font-awesome', color: 'black'}}
                      containerStyle={{backgroundColor: 'transparent'}}
                      onPress={() => this._goEventDetail()}>

                  </ListItem>
                  );
    }


		return (
      <View style={{flex:1, flexDirection: 'column'}}>
        <View style={{height:620}}>
        <LinearGradient colors={['#1F2F3C', '#3D5167', '#5C7894', '#7C9AAF', '#97B2BE']}
                        style={styles.linearGradient}>
          <View style={{height: 100, justifyContent: 'center',alignItems:'center'}}>
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
          <TabBarIOS.Item
            systemIcon="bookmarks"
            selected={this.state.selectedTab === 'firstTab'}
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
          </TabBarIOS.Item>
          <TabBarIOS.Item
            systemIcon="recents"
            selected={this.state.selectedTab === 'secondTab'}
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
          </TabBarIOS.Item>
          <TabBarIOS.Item
            systemIcon="downloads"
            selected={this.state.selectedTab === 'thirdTab'}
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
          </TabBarIOS.Item>
          <TabBarIOS.Item
            systemIcon="bookmarks"
            selected={this.state.selectedTab === 'jobListTab'}
            onPress={() => {
              this.props.navigator.push({
                  component: JobList,
                  title: 'Job List',
                  passProps: {
                    email: this.props.email,
                    password: this.props.password
                  }
                });
            }}>
            <Text>Home</Text>
          </TabBarIOS.Item>
        </TabBarIOS>
        </View>

      </View>
		)
	};
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0)',
    height: 0,
  },
  linearGradient: {
    height: 800,
    width: Dimensions.get('window').width
  }
});
