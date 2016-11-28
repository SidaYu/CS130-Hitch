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

import EventScene from './Event';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

class MyButton extends Component {
	state = {
        _pressed : false,
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

    var eventDate = dateString.substring(5,7);
    var eventMonth = dateString.substring(8,11);
    var eventYear = dateString.substring(12,17);
    return eventMonth + " " + eventDate + ", " + eventYear;
  }

    _changeColor() {
        this.setState({_pressed : !this.state._pressed});
    }

    _getTitleStyles() {
    	if (this.state._pressed)
    	{
    		return styles.pressedButton;
    	}
    	else
    	{
    		return styles.unpressedButton;
    	}
    }

    _getSubtitleStyles() {
    	if (this.state._pressed)
    	{
    		return styles.pressedButtonSub;
    	}
    	else
    	{
    		return styles.unpressedButtonSub;
    	}
    }

    _changeStyles() {
    	if (this.state._pressed)
    	{
    		return styles.pressed;
    	}
    	else
    	{
    		return styles.unpressed;
    	}
    }

	render() {
        return (
            <ListItem key={this.props.id}
                      id = {this.props.id}
                      title={this.props.title}
                      titleStyle={this._getTitleStyles()}
                      containerStyle={this._changeStyles()}
                      underlayColor={'green'}
                      subtitle={this.props.subtitle.substring(0,17)}
                      subtitleStyle={this._getSubtitleStyles()}
                      onPress={() => this._changeColor()}>
                  </ListItem>
        );
    }
}

export default class CountDownScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'firstTab',
      date: new Date(),
      loaded: false
    };
  }
  static get defaultProps() {
    return {
      title: 'Count Down'
    };
  }

  static propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }

  static colorMap = {
    'false': 'green',
    'true': 'red',
  }

  _dateFormat() {
    var monthNames = ["Janunary", "Februrary", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"];
    var dayNames = ["Monday", "Tuesday", "Wednesday", "Thurday", "Friday", "Saturday", "Sunday"];
    return dayNames[this.state.date.getDay()-1] + ',\n' +
           this.state.date.getDate() + "th " + monthNames[this.state.date.getMonth()-1];
  }

  _changeStatus() {
    //AlertIOS.alert("id is" + id);
    var URL = 'https://hitch.herokuapp.com/api/getTimeStamps?job_id=0';
    fetch(URL)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
            description0 : 'haha',
        });
      })
      .catch(function(err) {
        // something went wrong
        AlertIOS.alert("failed to change status!", "Please check you network");
      })
      .done();
      this.render();
  }

  _fetchData() {
    var URL = 'https://hitch.herokuapp.com/api/getTimeStamps?job_id=2';
    fetch(URL)
      .then((response) => response.json())
      .then((responseJson) => {
        var state = {};
          state['size'] = responseJson.timeStamps.timeStamp_list.length;
          for (var i = 0; i < responseJson.timeStamps.timeStamp_list.length; i++) {
            state['deadline'+i] = responseJson.timeStamps.timeStamp_list[i].deadline;
            state['description'+i] = responseJson.timeStamps.timeStamp_list[i].description;
            state['status'+i] = responseJson.timeStamps.timeStamp_list[i].status;
            state['id'+i] = responseJson.timeStamps.timeStamp_list[i].id;
          }
        this.setState(state);
        this.setState({
          loaded : true,
        });
        // return events;
      })
      .catch(function(err) {
        // something went wrong
        AlertIOS.alert("failed to get event!", "Please check you network");
      })
      .done();
  }

    render() {
    var URL = 'https://hitch.herokuapp.com/api/getTimeStamp?event_id=2';

    var events = [];
    var item = []

    if (this.state.loaded == false) {
      this._fetchData();
    }


    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds

    for (var i = 0; i < this.state.size; i++) {
        if (this.state['status'+i] == true){
            color = 'green';
        }else{
            color = 'red';
        }
        //var diffDays = Math.round(Math.abs((this.state.time - this.state.time)/(oneDay)));
        events.push(<MyButton
        				key={i}
                        id = {i}
                      title={this.state['description'+i]}
                      subtitle={this.state['deadline'+i]}/>
                  );
    }


    return (
      <View style={{flex:1, flexDirection: 'column'}}>
        <View style={{height:620}}>
        <LinearGradient colors={['#1F2F3C', '#3D5167', '#5C7894', '#7C9AAF', '#97B2BE']}
                        style={styles.linearGradient}>
          <View style={{height: 50, justifyContent: 'center',alignItems:'center'}}>
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
  },
  pressedButton: {
  	fontSize: 22,
  	color: 'white',
  },
  unpressedButton: {
  	fontSize: 22,
  	color: 'white',
  },
  pressedButtonSub: {
  	fontSize: 17,
  	color: 'white',
  },
  unpressedButtonSub: {
  	fontSize: 17,
  	color: 'white',
  },
  pressed: {
  	backgroundColor: '#12ad2a',
  },
  unpressed: {
  	backgroundColor: 'grey',
  }
});