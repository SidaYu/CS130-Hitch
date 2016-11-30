import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Text,
  Image,
  TextInput,
  View,
  TabBarIOS,
  NavigatorIOS,
  Dimensions,
  ScrollView
} from 'react-native';

import CalendarScene from './CalendarScene';
import HomePageScene from './HomePageScene';
import JobList from './JobList';
import Comment from './Comment';
import {
  FormLabel,
  FormInput,
  Button,
  List,
  ListItem
} from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';
import NavigationBar from 'react-native-navbar';
import EventScene from './Event';
import LinearGradient from 'react-native-linear-gradient';



export default class CountDownScene extends Component {
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
    // this._goToSpecificEvent = this._goToSpecificEvent.bind(this);
    this.state = {
        jobs: null,
        searched_jobs: null,
      loaded: false,
      search:false,
      rowToDelete : null,
      add_comment_id: -1,
      date: new Date(),
      selectedTab: 'firstTab',
    };
  }

  _goToDifferent(){
    this.setState({search: false});
    var a = 1;
  }

  // _goToSpecificEvent(id) {
  //   this.props.navigator.push({
  //     component: EventScene,
  //     title: 'Application Process',
  //     passProps: {
  //       event_id: id
  //     }
  //   });
  // }

  _onAfterRemovingElement() {
    this.setState({
      rowToDelete : null,
      dataSource  : this.state.dataSource.cloneWithRows(this._data)
      });
  }

  fetchData() {
    var REQUEST_URL = 'https://hitch.herokuapp.com/api/getUndoTimeStamp?user_email=tian@test.com'
    //var REQUEST_URL = 'https://hitch.herokuapp.com/api/getUndoTimeStamp?user_email='+this.props.user_email
    fetch(REQUEST_URL, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          jobs:responseData.res.timeStamp_list,
          loaded: true,
        });
      })
      .done();

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

  componentDidMount() {
    this.fetchData();
  }


  _parseDate(dateString) {
    var monthtoDay = {
      "Jan" : 0,
      "Feb" : 1,
      "Mar" : 2,
      "Apr" : 3,
      "May" : 4,
      "Jun" : 5,
      "Jul" : 6,
      "Aug" : 7,
      "Sep" : 8,
      "Oct" : 9,
      "Nov" : 10,
      "Dec" : 11
    };

    var eventDate = parseInt( dateString.substring(5,7) );
    var eventMonth = monthtoDay[ dateString.substring(8,11) ];
    var eventYear = parseInt( dateString.substring(12,17) );
    return new Date(eventYear, eventMonth, eventDate);
  }

  _getDiffDays(dateString) {
    var eventDateObj = this._parseDate(dateString);
    var oneDay = 24*60*60*1000;
    var diffDays = Math.ceil(Math.abs(eventDateObj.getTime() - this.state.date.getTime())/oneDay);
    return diffDays;
  }

  _dateFormat() {
    var monthNames = ["Janunary", "Februrary", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"];
    var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return dayNames[this.state.date.getDay()] + ',\n' +
           this.state.date.getDate() + "th " + monthNames[this.state.date.getMonth()];
    // return "day: " + new Date().getDay() + "date: " + new Date().getDate() + "month: " + this.state.date.getMonth();
  }

  render() {


    if (!this.state.loaded) {
      return this.renderLoadingView();
    }



    this.fetchData();
    this.setImage();

      return (
      <View style={{flex:1, flexDirection: 'column'}}>
        <View style={{height:620}}>
        <LinearGradient colors={['#928DAB','#408AC7']}
                        style={styles.linearGradient}>
          <View style={{height: 40, justifyContent: 'center',alignItems:'center'}}>
          </View>
          <View>
            <Text style={{color: '#eeeae5', fontSize: 40, textAlign: 'left', backgroundColor: 'rgba(0,0,0,0)',
                      paddingTop: 20, paddingBottom: 10, paddingLeft: Dimensions.get('window').width/20}}>
              {this._dateFormat()}
            </Text>
          </View>
          <ScrollView style={styles.container}
          automaticallyAdjustContentInsets={false}
          >
          <List>
            {
              this.state.jobs.map((l, i) => (

          <ListItem
            key={i}
            title={this._getDiffDays(l.deadline) + ' Days left'}
            titleStyle={{fontSize: 22, color: '#eeeae5'}}
            subtitleStyle={{fontSize: 15, color: 'white'}}
            subtitle = {l.company_name + ' ' + l.description}
            avatar = {{uri: l.avatar_url}}
            containerStyle={{backgroundColor: 'transparent'}}
          />
          ))
            }
          </List>
          </ScrollView>
          </LinearGradient>
        </View>
        <View style={{flex:1, flexDirection: 'column', backgroundColor:'skyblue'}}>
        <TabBarIOS
       unselectedTintColor="black"
          tintColor="mediumseagreen"
          barTintColor="white"
          backgroundColor = "azure">
        <Icon.TabBarItemIOS
          iconName="clock-o"
          title="CountDown"
          selected={this.state.selectedTab === 'firstTab'}
          iconColor={"mediumseagreen"}
          renderAsOriginal={true}
          >
          <Text>Home</Text>
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          iconName="calendar"
          title="Calendar"
          selected={this.state.selectedTab === 'secondTab'}
          iconColor={"black"}
          renderAsOriginal={true}
          onPress={() => {
            this.props.navigator.replace({
                component: CalendarScene,
                title: 'Calendar',
                navigationBarHidden: true,
                passProps: {
                  email: this.props.email,
                  password: this.props.password
                }
              });
          }}>
          <Text>Home</Text>
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          iconName="list"
          title="MyJobs"
          selected={this.state.selectedTab === 'thirdTab'}
          iconColor={"black"}
          renderAsOriginal={true}
          onPress={() => {
            this.props.navigator.replace({
                component: JobList,
                title: 'Job List',
                passProps: {
                  email: this.props.email,
                  password: this.props.password
                }
              });
          }}>
          <Text>Home</Text>
        </Icon.TabBarItemIOS>

         <Icon.TabBarItemIOS
            iconName="file-o"
            title="Notes"
            selected={this.state.selectedTab === 'fourthTab'}
            iconColor={"black"}
            renderAsOriginal={true}
            onPress={() => {
              this.props.navigator.replace({
                  component: Comment,
                  title: 'Notes',
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
          title="Profile"
          selected={this.state.selectedTab === 'fifthTab'}
          iconColor={"black"}
          renderAsOriginal={true}
          onPress={() => {
            this.props.navigator.replace({
                component: HomePageScene,
                title: 'Home Page',
                navigationBarHidden: true,
                passProps: {
                  email: this.props.email,
                  password: this.props.password
                }
              });
          }}>
          <Text>Home</Text>
        </Icon.TabBarItemIOS>
      </TabBarIOS>
        </View>

      </View>
    );
            };

  renderLoadingView() {
    return (
      <Text>
      Loading companies...
      </Text>
      );
    }
  }




var styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0)',
    height: 620,
  },
  linearGradient: {
    height: 620,
    width: Dimensions.get('window').width
  }
});