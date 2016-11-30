import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  TouchableHighlight,
  NavigatorIOS,
  Text,
  Image,
  TextInput,
  View,
  ScrollView,

} from 'react-native';

import {
  Button, List, ListItem, CheckBox, SearchBar, Icon, Tabs, Tab,
} from 'react-native-elements'

import AddJobForm from './AddJobForm';
import JobDetail from './JobDetail';


export default class SearchJob extends Component {
  static get defaultProps() {
    return {
      title: 'GlassDoor Related'
    };
  }
  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      company_name:'',
      company_depart:'',
      position_title:'',
      app_URL:'',
      selectedTab:'searchTab',
      jobs : [],
      searched_jobs: [],
      search: false,
      loaded: false,
    }
  }

  setImage()
  {
    var list = this.state.jobs;
    var len = list.length;
    for (var i = 0; i < len; i++)
    {

        if (list[i].company_name.toLowerCase() == 'microsoft')
          list[i].avatar_url = 'https://www.microsoft.com/en-us/server-cloud/Images/shared/page-sharing-thumbnail.jpg';
        if (list[i].company_name.toLowerCase() == 'linkedin')
          list[i].avatar_url = 'https://yt3.ggpht.com/-CepHHHB3l1Y/AAAAAAAAAAI/AAAAAAAAAAA/Z8MftqWbEqA/s900-c-k-no-mo-rj-c0xffffff/photo.jpg';
        if (list[i].company_name.toLowerCase() == 'facebook')
          list[i].avatar_url = 'https://www.facebook.com/images/fb_icon_325x325.png';

        if (list[i].company_name.toLowerCase() == 'google')
          list[i].avatar_url = 'https://www.wired.com/wp-content/uploads/2015/09/google-logo-1200x630.jpg';
        if (list[i].company_name.toLowerCase() == 'amazon')
          list[i].avatar_url = 'https://store-images.s-microsoft.com/image/apps.31672.9007199266244431.afea25ca-b409-4393-9a82-97fef1b330a0.6ae63586-6e3a-415f-bb6b-31a82bdcba1d?w=180&h=180&q=60';
        if (list[i].company_name.toLowerCase() == 'appfolio')
          list[i].avatar_url = 'https://www.appfolio.com/images/html/apm-fb-logo.png';
        if (list[i].company_name.toLowerCase() == 'laserfiche')
          list[i].avatar_url = 'https://lh5.ggpht.com/TZOsQ_TJKzcobHRvQO9VDuk_fOuUGa7sgi6yFdJ3Opy_lnLAHvPyLZqsRX0gCm5mDzcQ=w300';
        if (list[i].company_name.toLowerCase() == 'hulu')
          list[i].avatar_url = 'https://yt3.ggpht.com/-MgU-QxeJRcM/AAAAAAAAAAI/AAAAAAAAAAA/_tghiNsm6NU/s900-c-k-no-mo-rj-c0xffffff/photo.jpg';
    }
  }

  _goToJobDetail(n, w, o, c, r) {
    this.props.navigator.push({
      component: JobDetail,
      title: 'Job Detail',
      passProps: {
        m_n: n,
        m_w: w,
        m_o: o,
        m_c: c,
        m_r: r,
      }
    });
  }


   _goToAddJobForm() {
    this.props.navigator.push({
      component: AddJobForm,
      title: 'Add Job Form',
    });
  }


  addJobAutoHelp()
  {
     fetch("https://api.glassdoor.com/api/api.htm?t.p=108386&t.k=gOGr6axYbOq&userip=172.91.91.28&useragent=Mozilla/5.0%20(Macintosh;%20Intel%20Mac%20OS%20X%2010_11_6)%20AppleWebKit/537.36%20(KHTML,%20like%20Gecko)%20Chrome/54.0.2840.98%20Safari/537.36&format=json&v=1&action=employers&q=XXXXX", {
    })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          jobs: responseData.response.employers,
          loaded: true,
        });
      })
      .done();
    }

  addJobAuto(n)
  {
    n = n.toLowerCase();
    this.setState({search: true});
    let comps = [];
    var list = this.state.jobs;
    if (n == "")
    {
       this.setState ({searched_jobs: comps});
       return;
     }
    for (var i = 0; i < list.length; i++)
    {
      if (list[i].name.toLowerCase().includes(n))
      {
        comps.push(list[i]);
        this.setState ({searched_jobs: comps});
      }
    }

  }
  
  render() {
    //this.setImage();
    if (this.state.loaded == false) this.addJobAutoHelp();
    return (
     <View style={{marginTop: 70, flex:1,backgroundColor: 'lightgrey'}}>
  
        <TabBarIOS
           unselectedTintColor="yellow"
           tintColor="white"
           barTintColor="darkslateblue">
        <TabBarIOS.Item
          title="search Tab"
          systemIcon="search"
          selected={this.state.selectedTab === 'searchTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'searchTab',
            });
          }}>
          <Text> </Text>
        </TabBarIOS.Item>

        <TabBarIOS.Item
          systemIcon="more"
          title="More"
          selected={this.state.selectedTab === 'moreTab'}
          onPress={() => {
              this.props.navigator.push({
                  component: AddJobForm,
                  title: 'Add Job Form',
                });

          }}>
          <Text> </Text>
        </TabBarIOS.Item>
        </TabBarIOS>
        


        <View style = {{height: 300}}>
      <SearchBar
      onChangeText={(l) => this.addJobAuto(l)}
      placeholder='Add job by typing company name...' />
      <ScrollView>
      <List containerStyle = {{}} >
      {
        this.state.searched_jobs.map((l, i) => (
          <ListItem
          avatar = {{uri: l.squareLogo}}
          key={i}
          title={l.name}
          onPress = {()=>this._goToJobDetail(l.name, l.website, l.overallRating, l.careerOpportunitiesRating, l.featuredReview.pros)}
          />
          ))
      }
      </List>

      </ScrollView>
      </View>


      </View>
    
           

    

    )
  };
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