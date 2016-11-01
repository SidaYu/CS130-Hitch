import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Text,
  Image,
  TextInput,
  View
} from 'react-native';

import AddJobForm from './AddJobForm';


export default class JobList extends Component {
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
    this._goToAddJobForm = this._goToAddJobForm.bind(this);
  }

  _goToAddJobForm() {
    this.props.navigator.push({
      component: AddJobForm,
      title: 'Add Job Form',
    });
  }

  render() {
    return (
      <View style={{flex:1, flexDirection: 'column',backgroundColor: 'powderblue'}}>
        <View style={{height: 500, justifyContent: 'flex-start',alignItems:'center'}}>
          <Text> Add Job</Text>
        </View>
        <View style={{height: 500, justifyContent: 'flex-start',alignItems:'center'}}>
          <View style={styles.textInput}>
            <TouchableHighlight onPress={this._goToAddJobForm}>
              <Text>Add Job</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={{height: 500, justifyContent: 'flex-start', alignItems:'center'}}>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  textInput: {
    backgroundColor:'azure',
    borderBottomLeftRadius:5,
    borderTopRightRadius:5,
    borderTopLeftRadius:5,
    borderBottomRightRadius:5,
  },
  button: {
    height: 20,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: 'azure',
  },
});