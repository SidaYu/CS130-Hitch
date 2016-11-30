import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  RefreshControl,
  StyleSheet,
  TouchableHighlight,
  Text,
  Image,
  TextInput,
  View,
  Tab,
  Tabs,
  TabBarIOS,
  NavigatorIOS,
  Dimensions,
  ScrollView
} from 'react-native';

import CalendarScene from './CalendarScene';
import Settings from './SettingsScene';
import HomePageScene from './HomePageScene';

import {
  FormLabel,
  FormInput,
  Button,
  List,
  ListItem,
  Icon
} from 'react-native-elements';

import NavigationBar from 'react-native-navbar';
import EventScene from './Event';
// import AddJobForm from './AddJobForm';
// import Google from './Google';
// import DynamicList from './DynamicList'
import LinearGradient from 'react-native-linear-gradient';

var REQUEST_URL = 'https://hitch.herokuapp.com/api/getTimeStamps?job_id=';

class MyButton extends Component {
    constructor(props){
    super(props);
    this.state = {
        _pressed: false,
    };
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
            return 'green';
        }
        else
        {
            return 'grey';
        }
    }

    _changeRightIcon() {
        if (this.state._pressed)
        {
            return {name: 'check-box'}
        }
        else
        {
            return {name: 'check-box-outline-blank'}
        }
    }

    render() {
        return (
            <View borderColor={'white'}>
            <Button
            key={this.props.id}
            title={this.props.title}
            iconRight={true}
            borderRadius={5}
            icon={this._changeRightIcon()}
            backgroundColor={this._changeStyles()}
            onPress={() => this._changeColor()}/>
            <Icon name='keyboard-arrow-down'/>
            </View>
        );
    }
}

export default class DynamicList extends Component {
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
      refreshing: false,
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
    fetch(REQUEST_URL + this.props.job_id, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          jobs:responseData.timeStamps.timeStamp_list,
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

  _onRefresh() {
    this.setState({refreshing: true, loaded: false});
    this.forceUpdate()
    this.setState({refreshing: false});
  }

  render() {


    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    this.fetchData();

      return (
      <View style={{flex:1, flexDirection: 'column', borderColor:'white'}}>
        <View borderColor={'white'}>
          <View style={{height: 50, justifyContent: 'center',alignItems:'center'}}>
          </View>
          <ScrollView style={styles.container}
          automaticallyAdjustContentInsets={false}
          refreshControl={
            <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}/>
          }
          >
          <List borderColor={'white'}>
            {
              this.state.jobs.map((l, i) => (
                <MyButton
                key={i}
                title={l.description}
                subtitle={l.deadline}/>
          ))
            }
            {(this.state.jobs.length !== 0) && <Button
            title={"Congratulations!"}
            borderRadius={5}
            backgroundColor={'grey'}/>}
          </List>
          </ScrollView>
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
    height: 670,
    borderColor: 'transparent',
  },
  linearGradient: {
    height: 670,
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
  },
  bar: {
    width: 5,
    height: 10,
    backgroundColor: 'grey',
  }
});
