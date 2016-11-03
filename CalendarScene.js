import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  NavigatorIOS,
  Text,
  Image,
  TextInput,
  View
} from 'react-native';

import Video from 'react-native-video';
import Calendar from 'react-native-calendar';

export default class CalendarScene extends Component {
  static get defaultProps() {
    return {
      title: 'Calendar'
    };
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }

	render() {
		return (
      <View style={{flex:1}}>
        <Image
        source={require('./pics/calendarbg.png')} style={{height:680,width:380}}>
        <View style={{height:200}}>
        </View>
        <Calendar
        scrollEnabled={true}
        showControls={true}
        showEventIndicators={true}
        events={[{date: '2016-11-04', hasEventCircle: {backgroundColor: 'powderblue'}},
                {date: '2016-11-05'}]}>
        </Calendar>
        </Image>
      </View>
		)
	};
}
