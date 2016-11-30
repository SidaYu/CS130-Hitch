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
import Comment from './Comment';
import JobList from './JobList';
import Icon from 'react-native-vector-icons/FontAwesome';

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

    fetch('https://hitch.herokuapp.com/api/getAllEvents?user_email='+this.props.email, {
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

    fetch('https://hitch.herokuapp.com/api/getAllEvents?user_email='+this.props.email, {
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
      <View style={{flex:1, flexDirection: 'column', backgroundColor: 'lightsteelblue'}}>
        <View style={{height: 50, justifyContent: 'center',alignItems:'center'}}>
        </View>
        <View style={{height: 350}}>
          <Calendar
          scrollEnabled={true}
          showControls={true}
          showEventIndicators={true}
          events={rows}
          title = 'Calendar'
          onDateSelect={(date) => this._updateDateEvent(date) }
          />
        </View>
        <View style={{flexDirection: 'column', height: 220}}>
          <List style={{height: 220}}>
            <ListView
              renderRow={this.renderRow}
              dataSource={this.state.dataSource}
            />
          </List>
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
            <Text>Home</Text>
          </Icon.TabBarItemIOS>
          <Icon.TabBarItemIOS
            iconName="calendar"
            title="Calendar"
            titlecolor="black"
            selected={this.state.selectedTab === 'secondTab'}
            iconColor={"mediumseagreen"}
            renderAsOriginal={true}
            >
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
            iconName="file-o"
            title="Notes"
            selected={this.state.selectedTab === 'fourthTab'}
            iconColor={"black"}
            renderAsOriginal={true}
            onPress={() => {
              this.props.navigator.replace({
                  component: Comment,
                  title: 'Comment',
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
