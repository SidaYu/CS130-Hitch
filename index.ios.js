<<<<<<< HEAD
import React, { Component, PropTypes } from 'react';
import { AppRegistry, NavigatorIOS, Text, View } from 'react-native';

import JobList from './JobList';
import AddJobForm from './AddJobForm';




class AwesomeProject extends Component {

constructor(props)
{
  super(props);
  this.state = {
    email : 'tian@test.com',
    company: ''
  };  
}


R_GET(url, params) {
    if (params) {
        let paramsArray = []
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + encodeURIComponent(params[key])))
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&')
        } else {
            url += '&' + paramsArray.join('&')
        }
    }
    return new Promise(function (resolve, reject) {
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    reject('server busy；\r\nCode:' + response.status)
                }
            })
            .then((response) => {
                if (response && response.error_code === 0) {
                    resolve(response)
                } else {
                    reject(response.message)
                }
            })
            .catch((err)=> {
                reject(_parseErrorMsg(err))
            })
    })
}

getCompany() {
  var url = "https://hitch.herokuapp.com/api/getAllJobs";
  var params = { user_email: "tian@test.com" };
  (R_GET (url, params)).then((responseData)=> 
      {
        (company) => this.setState(responseData.status);
      })
      .done();
}



    render() {
        this.getCompany();
        return ( <Text> {this.state.company} </Text>);
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);

=======
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import JobList from './JobList';
import AddJobForm from './AddJobForm';

import {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class AwesomeProject extends Component {

 render() {
    const routes = [
     {component: JobList, title: 'Job List',},
     //{component: AddJobForm, title: 'Add Job Form',},
    ];
    return (
      <NavigatorIOS initialRoute={routes[0]} style={{flex: 1}}/>
    );
  }

}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
}); */

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
>>>>>>> 47717e0b1fc3b813464c7408ea6e26cc07056a8a
