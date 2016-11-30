import React, { Component, PropTypes } from 'react';
import JobList from './JobList';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Text,
  Image,
  TextInput,
  View
} from 'react-native';


//Add from github package
import { FormLabel, FormInput, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import LinearGradient from 'react-native-linear-gradient';
//end

export default class AddJobForm extends Component {
  static get defaultProps() {
    return {
      title: 'Add Job Form'
    };
  }
  static propTypes = {
    title: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this._goToJobList = this._goToJobList.bind(this);
    this.state = {
      company_name:'',
      company_depart:'',
      position_title:'',
      app_URL:''
    }
  }

  _goToJobList() {
     fetch("https://hitch.herokuapp.com/api/addjob", {
      method: 'POST',
      headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
      body: JSON.stringify({ 
        user_email: 'tian@test.com', //REMEMBER TO CHANGE
        company_name: this.state.company_name,
        company_depart: this.state.company_depart,  
        position_title: this.state.position_title,
        app_URL: this.state.app_URL
      })
    })
      .then((response) => response.json())
      .then((responseData) => {
        if(responseData.result == "success"){
          this.props.navigator.pop()       
        }else{
          AlertIOS.alert(
            "Add job failed"
          )
        }
      }) 
      .done(); 
  
    //this.props.navigator.pop();
  }



  render() {
    return (
        <View style={{flex:1, flexDirection: 'column',backgroundColor: 'white'}}>
          <View style={{height: 80, justifyContent: 'center',alignItems:'center'}}> 
        </View>

        <Fumi
        label={'Company Name'}
        iconClass={FontAwesomeIcon}
        iconName={'briefcase'}
        iconColor={'#f95a25'}
        width={350}
        value={this.state.name}
        onChangeText={(company_name) => this.setState({company_name})}
        />


        <Fumi
        label={'Department Name'}
        iconClass={FontAwesomeIcon}
        iconName={'cogs'}
        iconColor={'#f95a25'}
        width={350}
        value={this.state.name}
        onChangeText={(company_depart) => this.setState({company_depart})}
        />


        <Fumi
        label={'Job Title'}
        iconClass={FontAwesomeIcon}
        iconName={'user-plus'}
        iconColor={'#f95a25'}
        width={350}
        value={this.state.name}
        onChangeText={(position_title) => this.setState({position_title})}
        />


        <Fumi
        label={'Company Website'}
        iconClass={FontAwesomeIcon}
        iconName={'feed'}
        iconColor={'#f95a25'}
        width={350}
        value={this.state.name}
        onChangeText={(app_URL) => this.setState({app_URL})}
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
        onPress={this._goToJobList}
        borderRadius={10}/>

         </LinearGradient>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor:'white',
    borderBottomLeftRadius:5,
    borderTopRightRadius:5,
    borderTopLeftRadius:5,
    borderBottomRightRadius:5,
  },
  button: {
    height: 40,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: 'white',
  },
});
