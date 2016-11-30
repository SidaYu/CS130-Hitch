import React, { Component, PropTypes } from 'react';
import {
  AlertIOS,
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Text,
  Image,
  TextInput,
  View,
  NavigatorIOS,
  ScrollView,
  TabBarIOS
} from 'react-native';
import {
  Button, List, ListItem, CheckBox, SearchBar, Tabs, Tab,
} from 'react-native-elements'


import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/FontAwesome';

import AddComment from './AddComment'
import Comment from './Comment'
import AddJobForm from './AddJobForm';
import AddJobFormAuto from './AddJobFormAuto';
import DynamicList from './DynamicList';
import CalendarScene from './CalendarScene';
import CountDown from './CountDownScene';
import HomePageScene from './HomePageScene';
import Event from './Event';

var REQUEST_URL = 'https://hitch.herokuapp.com/api/getJobList?user_email=tian@test.com'
var Swipeout = require('react-native-swipeout')

class rowElement extends Component {
  
}

export default class JobList extends Component {
  static get defaultProps() {
    return {
      title: 'Job List'
    };
  }
  static propTypes = {
    title: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }

constructor(props) {
    super(props);
    this._goToAddJobFormAuto = this._goToAddJobFormAuto.bind(this);
    this._goToAddJobForm = this._goToAddJobForm.bind(this);
    this._goToSpecificJob = this._goToSpecificJob.bind(this);
    this.state = {
        jobs: null,
        searched_jobs: null,
      loaded: false,
      search:false,
      rowToDelete : null,
      add_comment_id: -1,
      selectedTab: 'thirdTab'
    };
  }


  setImage()
  {
    var list = this.state.jobs;
    var len = list.length;
    for (var i = 0; i < len; i++)
    {

        if (list[i].company_name.toLowerCase() == 'microsoft')
          list[i].avatar_url = 'https://www.microsoft.com/en-us/server-cloud/Images/shared/page-sharing-thumbnail.jpg';
        else if (list[i].company_name.toLowerCase() == 'linkedin')
          list[i].avatar_url = 'https://yt3.ggpht.com/-CepHHHB3l1Y/AAAAAAAAAAI/AAAAAAAAAAA/Z8MftqWbEqA/s900-c-k-no-mo-rj-c0xffffff/photo.jpg';
        else if (list[i].company_name.toLowerCase() == 'facebook')
          list[i].avatar_url = 'https://www.facebook.com/images/fb_icon_325x325.png';

        else if (list[i].company_name.toLowerCase() == 'google')
          list[i].avatar_url = 'https://www.wired.com/wp-content/uploads/2015/09/google-logo-1200x630.jpg';
        else if (list[i].company_name.toLowerCase() == 'amazon')
          list[i].avatar_url = 'https://store-images.s-microsoft.com/image/apps.31672.9007199266244431.afea25ca-b409-4393-9a82-97fef1b330a0.6ae63586-6e3a-415f-bb6b-31a82bdcba1d?w=180&h=180&q=60';
        else if (list[i].company_name.toLowerCase() == 'appfolio')
          list[i].avatar_url = 'https://www.appfolio.com/images/html/apm-fb-logo.png';
        else if (list[i].company_name.toLowerCase() == 'laserfiche')
          list[i].avatar_url = 'https://lh5.ggpht.com/TZOsQ_TJKzcobHRvQO9VDuk_fOuUGa7sgi6yFdJ3Opy_lnLAHvPyLZqsRX0gCm5mDzcQ=w300';
        else if (list[i].company_name.toLowerCase() == 'hulu')
          list[i].avatar_url = 'https://yt3.ggpht.com/-MgU-QxeJRcM/AAAAAAAAAAI/AAAAAAAAAAA/_tghiNsm6NU/s900-c-k-no-mo-rj-c0xffffff/photo.jpg';
       else if (list[i].company_name.toLowerCase() == 'apple')
          list[i].avatar_url = 'https://www.fantasygrounds.com/img/mac_os.png';
        else if (list[i].company_name.toLowerCase() == 'ibm')
          list[i].avatar_url = 'http://107.170.195.98/wp-content/uploads/2014/12/ibm.png';
        else
          list[i].avatar_url = 'https://pbs.twimg.com/profile_images/600060188872155136/st4Sp6Aw.jpg'
    }
  }



  _goToAddJobFormAuto() {
    this.props.navigator.push({
      component: AddJobFormAuto,
      title: 'Search Job',

    });
  }


   _goToAddJobForm() {
    this.props.navigator.push({
      component: AddJobForm,
      title: 'Add Job',

    });
  }

  _goToDifferent(){
    this.setState({search: false});
    var a = 1;
  }

  _goToSpecificJob(id, name, logo) {
    this.props.navigator.push({
      component: DynamicList,
      title: 'Job Progress',
      rightButtonTitle: 'Add',
      onRightButtonPress: () => {
        this.props.navigator.push({component: Event,title: 'New Event',passProps: {
          job_id : id,
        }
      })},
      passProps: {
        job_id: id,
        company_name: name,
        company_logo: logo,
      }
    });
  }


  _goAddComment(id){
      this.props.navigator.push({
      component: AddComment,
      title: 'Add Comment',
      passProps: {
        add_comment_id: id,
      }
    });
  }


    _goToComment(){
      this.props.navigator.push({
      component: Comment,
      title: 'Comment',
    });
  }

  _onAfterRemovingElement() {
    this.setState({
      rowToDelete : null,
      dataSource  : this.state.dataSource.cloneWithRows(this._data)
      });
  }

  _deleteItem(id) {
    console.log("start deleteJob")
    console.log(id)
    fetch('https://hitch.herokuapp.com/api/deleteJob', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify({
        job_id: +id,
      })
    })
    // .then((response) => response.json())
    .then((response) => console.log(response))
    .then((responseData) => {
      this.setState({
        loaded: true,
        rowToDelete: -1,
        });
    })
    .done();
    this.fetchData();
    //this.props.navigator.pop();
    this.render();
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
          jobs: responseData.jobs.job_list,
          searched_jobs: responseData.jobs.job_list,
          loaded: true,
        });
      })
      .done();
  //   var responseData = require('./jobs.json');
  //   this.setState({
  //    jobs: responseData.jobs.job_list,
  //    searched_jobs: responseData.jobs.job_list,
  //    loaded: true,
  // });

  }






  componentDidMount() {
    this.fetchData();
  }

  changeList(n)
  {
    n = n.toLowerCase();
    this.setState({search: true});
    let comps = [];
    var list = this.state.jobs;
    for (var i = 0; i < list.length; i++)
    {
      if (list[i].company_name.toLowerCase().includes(n))
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

    var searchJob = [
    {
      title: 'Search Job',
      icon: 'search',
    },
    ]

    this.fetchData();
    this.setImage();

    return (
      <View style = {{marginTop: 60, flex: 1, flexDirection: 'column', backgroundColor: '#e6e6e6'}}>

      <ScrollView style = {{flex: 10, height: 310}}>
      <List containerStyle = {{}} >
      {

        this.state.searched_jobs.map((l, i) => (


          <Swipeout
            key = {i}
            autoClose = {true}
            right={
            [
              deleteButton = {
                text: 'Delete',
                backgroundColor: '#FF6347',
                onPress: () => this._deleteItem(l.job_id),
              },
              editButton = {
                text: 'Add Comment',
                backgroundColor: 'lightgray',
                color: 'white',
                onPress: () => this._goAddComment(l.job_id),
              }
            ]
          }>
          <ListItem
          roundAvatar
          avatar = {{uri: l.avatar_url}}
          key={i}
          title={l.company_name}
          subtitle = {l.position_title}
          onPress = {()=>this._goToSpecificJob(l.job_id, l.company_name, l.avatar_url)}
          />
          </Swipeout>
          ))
        }
        </List>


        <List >
        {
          searchJob.map((item, i) => (
          <ListItem
          key={i}
          title={item.title}
          leftIcon={{name: item.icon}}
          onPress = {this._goToAddJobFormAuto}

          />
          ))
        }
        </List>

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
        
        </ScrollView> 


      <View style={{flex:1, flexDirection: 'column', backgroundColor:'skyblue'}}>
       <TabBarIOS
          unselectedTintColor="black"
          tintColor="mediumseagreen"
          barTintColor="white"
          backgroundColor = "azure">
          <Icon.TabBarItemIOS
            iconName="clock-o"
            title="Back"
            selected={this.state.selectedTab === 'firstTab'}
            iconColor={"black"}
            renderAsOriginal={true}
            onPress={() => {
              this.props.navigator.replace({
                  component: CountDown,
                  title: 'Back',
                  navigationBarHidden: true,
                  passProps: {
                    email: this.props.email,
                    password: this.props.password
                  }
                });
            }}>
            <Text></Text>
          </Icon.TabBarItemIOS>
          <Icon.TabBarItemIOS
            iconName="calendar"
            title="Back"
            selected={this.state.selectedTab === 'secondTab'}
            iconColor={"black"}
            renderAsOriginal={true}
            onPress={() => {
              this.props.navigator.replace({
                  component: CalendarScene,
                  title: 'Back',
                  navigationBarHidden: true,
                  passProps: {
                    email: this.props.email,
                    password: this.props.password
                  }
                });
            }}>
            <Text></Text>
          </Icon.TabBarItemIOS>
          <Icon.TabBarItemIOS
            iconName="list"
            title="Back"
            selected={this.state.selectedTab === 'thirdTab'}
            iconColor={"mediumseagreen"}
            renderAsOriginal={true}
            >
            <Text></Text>
          </Icon.TabBarItemIOS>



          <Icon.TabBarItemIOS
            iconName="file-o"
            title="Back"
            selected={this.state.selectedTab === 'fourthTab'}
            iconColor={"black"}
            renderAsOriginal={true}
            onPress={() => {
              this.props.navigator.replace({
                  component: Comment,
                  title: 'Back',
                  navigationBarHidden: true,
                  passProps: {
                    email: this.props.email,
                    password: this.props.password
                  }
                });
            }}>
            <Text></Text>
          </Icon.TabBarItemIOS>



          <Icon.TabBarItemIOS
            iconName="user"
            title="Back"
            selected={this.state.selectedTab === 'fifthTab'}
            iconColor={"black"}
            renderAsOriginal={true}
            onPress={() => {
              this.props.navigator.replace({
                  component: HomePageScene,
                  title: 'Back',
                  navigationBarHidden: true,
                  passProps: {
                    email: this.props.email,
                    password: this.props.password
                  }
                });
            }}>
            <Text></Text>
          </Icon.TabBarItemIOS>
        </TabBarIOS>
        </View>
        </View>

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