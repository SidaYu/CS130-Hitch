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

