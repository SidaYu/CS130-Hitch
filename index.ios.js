import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Text,
  Image,
  TextInput,
  View,
  NavigatorIOS,
} from 'react-native';
import {
  Button, List, ListItem, CheckBox, SearchBar, Icon, Tabs, Tab,
} from 'react-native-elements'


import JobList from './JobList'
import AddJobForm from './AddJobForm';
import SignUpScene from './SignUpScene';
import HomePageScene from './HomePageScene';
import Calendar from './Calendar';
import Comments from './Comments';

class AwesomeProject extends Component {

constructor(props) {
	super();

    this.state = {};
  }

 
  changeTab (selectedTab) {
  this.setState({selectedTab})
}

 render() {
const { selectedTab } = this.state;


    const routes = [
      {component: JobList, title: 'Job List', navigationBarHidden: true},
    ];
    return (
    <View style = {{flex: 1, backgroundColor: '#e6e6e6'}}>
      <Tabs>
  <Tab
    titleStyle={[styles.titleStyle]}
    selectedTitleStyle={[styles.titleSelected]}
    selected={selectedTab === 'home'}
    title={selectedTab === 'home' ? 'Home' : null}
    renderIcon={() => <Icon name='account-box' size={26} />}
    renderSelectedIcon={() => <Icon name='account-box' size={26} />}
    onPress={() => this.changeTab('home')}>
    <HomePageScene />
  </Tab>
  <Tab
    titleStyle={[styles.titleStyle]}
    selectedTitleStyle={[styles.titleSelected]}
    selected={selectedTab === 'job list'}
    title={selectedTab === 'job list' ? 'JOB LIST' : null}
    renderIcon={() => <Icon name='playlist-add' size={26} />}
    renderSelectedIcon={() => <Icon name='playlist-add' size={26} />}
    onPress={() => this.changeTab('job list')}>
    <JobList />
  </Tab>
  <Tab
    titleStyle={[styles.titleStyle]}
    selectedTitleStyle={[styles.titleSelected]}
    selected={selectedTab === 'calendar'}
    title={selectedTab === 'calendar' ? 'CALENDAAR' : null}
    renderIcon={() => <Icon name='alarm-on' size={26} />}
    renderSelectedIcon={() => <Icon name='alarm-on' size={26} />}
    onPress={() => this.changeTab('calendar')}>
    <Calendar />
  </Tab>
  <Tab
    titleStyle={[styles.titleStyle]}
    selectedTitleStyle={[styles.titleSelected]}
    selected={selectedTab === 'comments'}
    title={selectedTab === 'comments' ? 'C' : null}
    renderIcon={() => <Icon name='assignment' size={26} />}
    renderSelectedIcon={() => <Icon name='assignment' size={26} />}
    onPress={() => this.changeTab('comments')}>
    <SignUpScene />
  </Tab>
</Tabs>
</View>
    );
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
  background:
  {
    flex:1, 
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  listView: {
    borderTopColor: 'grey',
    borderTopWidth: 1,
    paddingTop: 70,
    flex: 30,
  },
  company: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  position: {
    textAlign: 'center',
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);