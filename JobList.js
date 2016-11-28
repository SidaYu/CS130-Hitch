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


import NavigationBar from 'react-native-navbar';


import AddJobForm from './AddJobForm';
import Google from './Google';
import DynamicList from './DynamicList'

var REQUEST_URL = 'https://hitch.herokuapp.com/api/getAllJobs?user_email=tian@test.com'

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
    this._goToSpecificJob = this._goToSpecificJob.bind(this);
    this.state = {
      jobs: null,
      searched_jobs: null,
      selectedTab: 'thirdTab',
      loaded: false,
      search:false,
    };
  }

  setImage()
  {
    var list = this.state.jobs;
    for (var i = 0; i < list.length; i++)
    {
      if (list[i].company_name == 'Microsoft')
          list[i].avatar_url = 'https://www.microsoft.com/en-us/server-cloud/Images/shared/page-sharing-thumbnail.jpg';
      if (list[i].company_name == 'Linkedin')
          list[i].avatar_url = 'https://yt3.ggpht.com/-CepHHHB3l1Y/AAAAAAAAAAI/AAAAAAAAAAA/Z8MftqWbEqA/s900-c-k-no-mo-rj-c0xffffff/photo.jpg';
      if (list[i].company_name == 'Facebook')
          list[i].avatar_url = 'https://www.facebook.com/images/fb_icon_325x325.png';

      if (list[i].company_name == 'Google')
          list[i].avatar_url = 'https://www.wired.com/wp-content/uploads/2015/09/google-logo-1200x630.jpg';
      if (list[i].company_name == 'Amazon')
          list[i].avatar_url = 'https://store-images.s-microsoft.com/image/apps.31672.9007199266244431.afea25ca-b409-4393-9a82-97fef1b330a0.6ae63586-6e3a-415f-bb6b-31a82bdcba1d?w=180&h=180&q=60';
      if (list[i].company_name == 'Appfolio')
          list[i].avatar_url = 'https://www.appfolio.com/images/html/apm-fb-logo.png';
    }
  }

  _goToAddJobForm() {
    this.props.navigator.push({
      component: AddJobForm,
      title: 'Add Job Form',
    });
  }

  _goToDifferent(){
    this.setState({search: false});
    var a = 1;
  }

  _goToSpecificJob() {
    this.props.navigator.push({
      component: DynamicList,
      title: 'Application Process',
    });
  }

fetchData() {
    fetch(REQUEST_URL, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          jobs: responseData.user_info.jobs,
          searched_jobs: responseData.user_info.jobs,
          loaded: true,
        });
      })
      .done();
  }



  componentDidMount() {
    this.fetchData();
  }

  changeList(n)
  {
    this.setState({search: true});
    let comps = [];
    var list = this.state.jobs;
    for (var i = 0; i < list.length; i++)
    {
      if (list[i].company_name.includes(n))
      {
        comps.push(list[i]);
        this.setState ({searched_jobs: comps});
      }
    }
    if (!comps.length) this.setState({searched_jobs: this.state.jobs});
  }

  render()
  {

    var titleConfig = {
      title: 'Job List',
    };

    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    this.setImage();

    var addJob = [
    {
      title: 'Add New Job',
      icon: 'add',
    },
    ]

    var refresh = [
    {
      title: 'Refresh',
      icon: 'refresh',
    }
    ]


    if (this.state.search == false) this.fetchData();

    return (
      <View style = {{marginTop: 70, flex: 1, backgroundColor: '#e6e6e6'}}>

      <View>
      <SearchBar
      onChangeText={(l) => this.changeList(l)}
      placeholder='Type to search company name...' />


      <List containerStyle = {{}} >
      {
        this.state.searched_jobs.map((l, i) => (
          <ListItem
          roundAvatar
          avatar = {{uri: l.avatar_url}}
          key={i}
          title={l.company_name}
          subtitle = {l.position_title}
          onPress = {this._goToSpecificJob}
          />
          ))
        }
        </List>
        </View>


        <List >
        {
          addJob.map((item, i) => (
          <ListItem
          key={i}
          title={item.title}
          leftIcon={{name: item.icon}}
          onPress = {this._goToAddJobForm}
          />
          ))
        }
        </List>

        <List >
        {
          refresh.map((item, i) => (
          <ListItem
          key={i}
          title={item.title}
          leftIcon={{name: item.icon}}
          onPress = {() => this.setState({search: false})}
          />
          ))
        }
        </List>



        </View>
        // <Button
        //   small
        //   containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'white'}}
        //   onPress={this._goToAddJobForm}
        //   title = 'Add New Job'
        //   backgroundColor = 'steelblue'
        //   color = 'white'
        //   />
          // <View style = {{flex: 1}} />
          );
      }

      renderLoadingView() {
        return (
          <Text>
          Loading companies...
          </Text>
          );
        }

        renderJob(job) {
          return (
          <View style = {styles.container}>
          <Text style={styles.company}>{job.company_name}</Text>
          <Text style={styles.position}>{job.position_title}</Text>
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
