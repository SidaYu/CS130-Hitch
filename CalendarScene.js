import React, { Component, PropTypes } from 'react';
import { List, ListItem } from 'react-native-elements';
import {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  TouchableHighlight,
  NavigatorIOS,
  AlertIOS,
  Text,
  Image,
  TextInput,
  ListView,
  View
} from 'react-native';

import Calendar from 'react-native-calendar';
import moment from 'moment';

import HomePageScene from './HomePageScene';
import CountDown from './CountDownScene';
import Settings from './SettingsScene';
import JobList from './JobList';

const list = [
  {
    name: 'No event on this day',
  },
  
]

const rows = []

export default class CalendarScene extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this._updateDateEvent = this._updateDateEvent.bind(this);
    this.state = {
      selectedTab: 'secondTab',
      dataSource: ds.cloneWithRows(list),
      selectedDate: moment().format(),
      dateList: [],
    };
    this.date_list = {};

  }
  static get defaultProps() {
    return {
      title: 'Calendar'
    };
  }

  static propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }

  _updateDateEvent(date) {
    this.setState({selectedDate:date});
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    fetch('https://hitch.herokuapp.com/api/getAllEvents?user_email=tian@test.com', {
      headers: {
        'Cache-Control': 'no-cache'
      }
    })
      .then((response) => response.json())
      .then((responseDate) => {

        var dateString = moment(this.state.selectedDate).format('YYYY-MM-DD');
        var dateList = [];
        dateList = responseDate.res.timeStamp_list[dateString];
        if(dateList == null){
          var temp = [
            {
              name: 'No event on this day',
            },
          ]
          this.setState({dataSource: ds.cloneWithRows(temp)});
        }else{
          var l = [];
          for(var i = 0;i<dateList.length;i++){
            var object =
              {
                name: dateList[i].description,
                subtitle: dateList[i].deadline
              };
            l.push(object);
          }
          this.setState({dataSource: ds.cloneWithRows(l)});
        }
      })
      .done();
  }


  renderRow (rowData, sectionID) {
    return (
      <ListItem
        roundAvatar
        key={sectionID}
        title={rowData.name}
        subtitle={rowData.subtitle}
      />
    )
  }



	render() {

    var day = '2005-07-20';
    fetchResponse = {};
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    fetch('https://hitch.herokuapp.com/api/getAllEvents?user_email=tian@test.com', {
      headers: {
        'Cache-Control': 'no-cache'
      }
    })
      .then((response) => response.json())
      .then((responseData) => {
        var dateList = [];
        dateList = responseData.res.date_list;
        if(dateList != null){
          for(var i = 0;i<dateList.length;i++){
            var bg = {
              backgroundColor: 'powderblue'
            }
            var object = {
              date: dateList[i],
              hasEventCircle: bg
            }
            rows.push(object);
          }
        }
      })
      .done();

		return (
      <View style={{flex:1, flexDirection: 'column', backgroundColor: 'lightgrey'}}>
        <View style={{height: 50, justifyContent: 'center',alignItems:'center'}}>
        </View>
        <View style={{height: 350}}>
          <Calendar
          scrollEnabled={true}
          showControls={true}
          showEventIndicators={true}
          events={rows}
          onDateSelect={(date) => this._updateDateEvent(date) }
          />
        </View>
        <View style={{flexDirection: 'column', height: 150}}>
        <List>
          <ListView
            renderRow={this.renderRow}
            dataSource={this.state.dataSource}
          />
        </List>
        </View>
        <View style={{height: 70, justifyContent: 'center',alignItems:'center'}}>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: 'azure',
  },
  thumb: {
    width: 64,
    height: 64,
  },
  listContainer: {
      paddingTop: 22,

   },
  text: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    textAlign: 'left',
    backgroundColor: 'azure',
  },
});
