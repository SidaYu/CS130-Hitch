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

class EventScene extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: this.props.date,
      timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
      name: "Interview"
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
          AlertIOS.alert("SUCCESS");
          this.props.navigator.pop()
        } else {
          AlertIOS.alert (
            "Add event failed"
          )
        }
      })
      .done();
  }

  render() {

    return (
      <ScrollView marginTop={70} marginBottom={20}>

        <FormLabel labelStyle={styles.labelStyle}>Event name</FormLabel>
        <FormInput inputStyle={styles.inputStyle} value={this.state.name}
        	onChangeText={(text) => this.setState({name : text})}/>

        <FormLabel labelStyle={styles.labelStyle}>Event time</FormLabel>
        <FormInput inputStyle={styles.inputStyle} value={this.state.date.toLocaleDateString() +
            ' ' +
            this.state.date.toLocaleTimeString()}/>

        <DatePickerIOS
          date={this.state.date}
          mode="datetime"
          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
          onDateChange={this.onDateChange}
        />

        <Button
        large
        iconRight
        icon={{name: 'pencil-square-o', type: 'font-awesome', color: 'white'}}
        title='Submit'
        fontSize={24}
        color='white'
        backgroundColor='#1F2F3C'
        onPress={()=>this._addNewEvent()} />
      </ScrollView>
    );
  }
}

        // <FormLabel labelStyle={styles.labelStyle}>Location(optional)</FormLabel>
        // <FormInput inputStyle={styles.inputStyle} value={this.state.location}
        //   onChangeText={(text) => this.setState({Location : text})}/>



var styles = StyleSheet.create({
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
