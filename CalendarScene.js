import React, { Component, PropTypes } from 'react';
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
  View
} from 'react-native';

import Calendar from 'react-native-calendar';

import HomePageScene from './HomePageScene';
import CountDown from './CountDownScene';
import Settings from './SettingsScene';
import JobList from './JobList';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class CalendarScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'secondTab',
      //date_list: [],
    };
    this.date_list = [];
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



	render() {
    
		return (
      <View style={{flex:1, flexDirection: 'column', backgroundColor: 'lightgrey'}}>
        <View style={{height: 150, justifyContent: 'center',alignItems:'center'}}>
        </View>
        <View style={{height: 420}}>
          <Calendar
          scrollEnabled={true}
          showControls={true}
          showEventIndicators={true}
          events={[{date: '2016-11-10', hasEventCircle: {backgroundColor: 'powderblue'}}]}>
          </Calendar>
        </View>
        <View style={{height: 50,backgroundColor:'lightgrey'}}>
        </View>
        <View style={{flex:1, flexDirection: 'column', backgroundColor:'skyblue'}}>
          <TabBarIOS
          unselectedTintColor="azure"
          tintColor="white"
          barTintColor="gainsboro"
          backgroundColor = "azure">
          <Icon.TabBarItemIOS
            iconName="home"
            title="Home"
            selected={this.state.selectedTab === 'firstTab'}
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
            iconName="user"
            title="Profile"
            selected={this.state.selectedTab === 'jobListTab'}
            iconColor={"grey"}
            selectedIconColor={'#1F2F3C'}
            renderAsOriginal={true}
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
          </Icon.TabBarItemIOS>
        </TabBarIOS>
        </View>
      </View>
		)
	};
}
