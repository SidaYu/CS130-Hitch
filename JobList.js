import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Text,
  Image,
  TextInput,
  View,
  ListView, 
  NavigatorIOS,
} from 'react-native';

import AddJobForm from './AddJobForm';

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
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

  _goToAddJobForm() {
    this.props.navigator.push({
      component: AddJobForm,
      title: 'Add Job Form',
    });
  }

fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.user_info.jobs),
          loaded: true,
        });
      })
      .done();
  }


  componentDidMount() {
    this.fetchData();
  }

   render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View style = {{flex: 1}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderJob}
          style={styles.listView} 
        />
        <View style = {{flex: 1, backgroundColor:'steelblue'}}/>
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

//   render() {
//     return (
//       <View style={{flex:1, flexDirection: 'column',backgroundColor: 'powderblue'}}>
//         <View style={{height: 500, justifyContent: 'flex-start',alignItems:'center'}}>
//           <Text> Add Job</Text>
//         </View>
//         <View style={{height: 500, justifyContent: 'flex-start',alignItems:'center'}}>
//           <View style={styles.textInput}>
//             <TouchableHighlight onPress={this._goToAddJobForm}>
//               <Text>Add Job</Text>
//             </TouchableHighlight>
//           </View>
//         </View>
//         <View style={{height: 500, justifyContent: 'flex-start', alignItems:'center'}}>
//         </View>
//       </View>
//     )
//   }
// }


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
    backgroundColor: 'powderblue'
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'azure',
    margin: 10
  },
  listView: {
    paddingTop: 80,
    backgroundColor: 'powderblue',
    flex: 10,
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