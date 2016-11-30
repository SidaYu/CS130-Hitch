'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  DatePickerIOS,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  AlertIOS
} = ReactNative;

import {
  FormLabel,
  FormInput,
  Button
} from 'react-native-elements'

import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import LinearGradient from 'react-native-linear-gradient';

class EventScene extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: this.props.date,
      timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
      name: null
    };
  }

  static defaultProps = {
    date: new Date(),
    timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
  };


  onDateChange = (date) => {
    this.setState({date: date});
  };

  onTimezoneChange = (event) => {
    var offset = parseInt(event.nativeEvent.text, 10);
    if (isNaN(offset)) {
      return;
    }
    this.setState({timeZoneOffsetInHours: offset});
  };

  _addNewEvent() {
    fetch("https://hitch.herokuapp.com/api/addTimeStamp", {
      method: 'POST',
      headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
      body: JSON.stringify({
          job_id: this.props.job_id,
          description: this.state.name,
          deadline: this.state.date,
          status: "False"
      })
    })
      .then((response) => response.json())
      .then((responseData) => {
        if(responseData.result == "success") {
          //AlertIOS.alert("SUCCESS");
          this.props.navigator.pop()
        } else {
          AlertIOS.alert (
            "Add event failed"
          );
          this.props.navigator.pop()
        }
      })
      .done();
  }

  render() {

    return (
      <ScrollView marginBottom={20}>
        <Fumi
        label={'Event Name'}
        iconClass={FontAwesomeIcon}
        iconName={'briefcase'}
        iconColor={'#f95a25'}
        width={350}
        value={this.state.name}
        onChangeText={(text) => this.setState({name : text})}
        />

        <Fumi
        label={'Time'}
        iconClass={FontAwesomeIcon}
        iconName={'calendar-plus-o'}
        iconColor={'#f95a25'}
        width={350}
        value={this.state.date.toLocaleDateString() +
             ' ' +
             this.state.date.toLocaleTimeString()}
        />

        <DatePickerIOS
          date={this.state.date}
          mode="datetime"
          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
          onDateChange={this.onDateChange}
        />
        
        <View style={{height:100}}/>

        <View alignItems={'center'}>
          <LinearGradient 
            colors={['#4c669f', '#3b5998', '#192f6a']} 
            style={styles.linearGradient}
            width={300}>


          <Button
          large
          iconRight
          icon={{name: 'pencil-square-o', type: 'font-awesome', color: 'white'}}
          title='Submit'
          fontSize={24}
          color='white'
          backgroundColor='transparent'
          onPress={() => this._addNewEvent()}
          borderRadius={10}/>
          </LinearGradient>
        </View>
      </ScrollView>
    );
  }
}


var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10
  },
  labelStyle: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Helvetica Neue'
  },
  inputStyle: {
    color: '#363c47',
    fontSize: 15
  },
  textinput: {
    height: 26,
    width: 50,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    padding: 4,
    fontSize: 18,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  labelView: {
    marginRight: 10,
    paddingVertical: 2,
  },
  label: {
    fontWeight: '500',
  },
  headingContainer: {
    padding: 4,
    backgroundColor: '#f6f7f8',
  },
  heading: {
    fontWeight: '500',
    fontSize: 14,
  },
});

export default EventScene;
