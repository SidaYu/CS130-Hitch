// import React, { Component, PropTypes } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   TouchableHighlight,
//   NavigatorIOS,
//   Text,
//   Image,
//   TextInput,
//   View
// } from 'react-native';
//
// import Video from 'react-native-video';
// import Calendar from 'react-native-calendar';
//
// export default class CalendarScene extends Component {
//   static get defaultProps() {
//     return {
//       title: 'Calendar'
//     };
//   }
//
//   static propTypes = {
//     title: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//     password: PropTypes.string.isRequired,
//   }
//
// 	render() {
// 		return (
//       <View style={{flex:1}}>
//         <Image
//         source={require('./pics/calendarbg.png')} style={{height:680,width:380}}>
//         <View style={{height:200}}>
//         </View>
//         <Calendar
//         scrollEnabled={true}
//         showControls={true}
//         showEventIndicators={true}
//         events={[{date: '2016-11-04', hasEventCircle: {backgroundColor: 'powderblue'}},
//                 {date: '2016-11-05'}]}>
//         </Calendar>
//         </Image>
//       </View>
// 		)
// 	};
// }

import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  TouchableHighlight,
  NavigatorIOS,
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

export default class CalendarScene extends Component {
  static get defaultProps() {
    return {
      title: 'Calendar'
    };
  }

  static propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }

  state = {
      selectedTab: 'secondTab',
  };

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
          events={[{date: '2016-11-04', hasEventCircle: {backgroundColor: 'powderblue'}},
                  {date: '2016-11-05'}]}>
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
                  navigationBarHidden: true,
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
