'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  DatePickerIOS,
  StyleSheet,
  Text,
  TextInput,
  View,
} = ReactNative;

import { 
  FormLabel, 
  FormInput,
  Button
} from 'react-native-elements'

class EventScene extends React.Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    date: new Date(),
    timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
  };

  state = {
    date: this.props.date,
    timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
    name: "Delete emails",
    location: "white house"
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

  render() {

    return (
      <View marginTop={60}>

        <FormLabel>Event name</FormLabel>
        <FormInput value={this.state.name}/>

        <FormLabel>Event time</FormLabel>
        <FormInput value={this.state.date.toLocaleDateString() +
            ' ' +
            this.state.date.toLocaleTimeString()}/>

        <DatePickerIOS
          date={this.state.date}
          mode="datetime"
          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
          onDateChange={this.onDateChange}
        />

        <FormLabel>Location(optional)</FormLabel>
        <FormInput
          value={this.state.location}
        />

        <FormLabel>Notes(optional)</FormLabel>
        <FormInput
          placeholder="your notes here..."/>
        <FormInput/>
        <FormInput/>

        <Button
        small
        icon={{name: 'envira', type: 'font-awesome', fontSize: 30}}
        title='SUBMIT'
        />
      </View>
    );
  }
}


exports.displayName = (undefined: ?string);
exports.title = '<DatePickerIOS>';
exports.description = 'Select dates and times using the native UIDatePicker.';
exports.examples = [
{
  title: '<DatePickerIOS>',
  render: function(): ReactElement<any> {
    return <DatePickerExample />;
  },
}];

var styles = StyleSheet.create({
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