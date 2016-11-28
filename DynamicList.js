'use strict';
import React, {Component} from 'react';
import {
    View, 
    Text, 
    Alert, 
    AlertIOS, 
    ListView, 
    ListViewDataSource, 
    StyleSheet,
    TouchableOpacity, 
    TouchableHighlight, 
    InteractionManager, 
    RefreshControl, 
    Animated, 
    Platform, 
    ProgressViewIOS,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swipeout from 'react-native-swipeout';
import EventScene from './Event';

import data from './data.json';
const window = Dimensions.get('window');

class CheckButton extends Component {
    state = {
        _pressed : false,
    }

    _changeColor() {
        this.setState({_pressed : !this.state._pressed});
    }

    _getIconStyle() {
        if (!this.state._pressed) {
            return styles.falseIcon;
        }
        else {
            return styles.trueIcon; 
        }
    }

    _getName() {
        if (!this.state._pressed) {
            return 'circle-o';
        }
        else {
            return 'check-circle'; 
        }
    }

    render() {
        return (
            <TouchableOpacity style={styles.deleteWrapper} onPress={() => this._changeColor()}>
                <Icon name={this._getName()} style={this._getIconStyle()}/>
            </TouchableOpacity>
        );
    }
}


class DynamicListRow extends Component {

    // these values will need to be fixed either within the component or sent through props
    _defaultHeightValue = 60;
    _defaultTransition  = 100;

    state = {
        _rowHeight  : new Animated.Value(this._defaultHeightValue),
        _rowOpacity : new Animated.Value(0)
    };

    componentDidMount() {
        Animated.timing(this.state._rowOpacity, {
            toValue  : 1,
            duration : this._defaultTransition
        }).start()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.remove) {
            this.onRemoving(nextProps.onRemoving);
        } else {
            this.resetHeight()
        }
    }

    onRemoving(callback) {
        console.log("removing");
        Animated.timing(this.state._rowHeight, {
            toValue  : 0,
            duration : this._defaultTransition
        }).start(callback);
    }

    resetHeight() {
        Animated.timing(this.state._rowHeight, {
            toValue  : this._defaultHeightValue,
            duration : 0
        }).start();
    }

    render() {
        return (
            <Animated.View
                style={{height: this.state._rowHeight, opacity: this.state._rowOpacity}}>
                {this.props.children}
            </Animated.View>
        );
    }
}

export default class DynamicList extends Component {

    /**
     * Default state values
     * */
     constructor(props) {
        super(props);
     }
    state = {
        loading     : true,
        dataSource  : new ListView.DataSource({
            rowHasChanged : (row1, row2) => true
        }),
        refreshing  : false,
        rowToDelete : null,
    };

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this._loadData()
        });
    }

    _loadData(refresh) {
        refresh && this.setState({
            refreshing : true
        });

        this.dataLoadSuccess({data : data});
    }

    dataLoadSuccess(result) {

        this._data = result.data;

        let ds = this.state.dataSource.cloneWithRows(this._data);

        this.setState({
            loading     : false,
            refreshing  : false,
            rowToDelete : -1,
            dataSource  : ds,
            dealineList : [null, null, null, null, null],
        });
    }

    _fetchData() {
    var URL = 'https://hitch.herokuapp.com/api/getTimeStamps?job_id=2';
    return fetch(URL)
      .then((response) => response.json())
      .then((responseJson) => {
        var deadlineList = {};
        var descriptionList = {};
        var statusList = {};
          deadlineList['size'] = responseJson.timeStamps.timeStamp_list.length;
          descriptionList['size'] = responseJson.timeStamps.timeStamp_list.length;
          statusList['size'] = responseJson.timeStamps.timeStamp_list.length;
          for (var i = 0; i < responseJson.timeStamps.timeStamp_list.length; i++) {
            deadlineList[i] = responseJson.timeStamps.timeStamp_list[i].deadline;
            descriptionList[i] = responseJson.timeStamps.timeStamp_list[i].description;
            statusList[i] = responseJson.timeStamps.timeStamp_list[i].status;
          }
        this.setState(deadlineList);
        this.setState(descriptionList);
        this.setState(statusList);
        this.setState({
          loaded : true,
        });
        // return events;
      })
      .catch(function(err) {
        // something went wrong
        AlertIOS.alert("failed to get event!", "Please check you network");
      })
      .done();
  }

    render() {
        if (this.state.loaded == true)
        {
            this._fetchData();
        }
        return (
            <View style={styles.container}>
                <ListView
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._loadData.bind(this, true)}
                        tintColor="#00AEC7"
                        title="Loading..."
                        titleColor="#00AEC7"
                        colors={['#FFF', '#FFF', '#FFF']}
                        progressBackgroundColor="#00AEC7"/>
                    }
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow.bind(this)}/>
                    
                <View>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={()=> this._addItemPressed()}>
                        <Text style={styles.addButtonText}>+New</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    _renderRow(rowData, sectionID, rowID) {
        console.log(rowData.id === this.state.rowToDelete);
        var logoStyle;
        var editButton = {
            text: 'Edit',
            backgroundColor: '#F5F5F5',
            color: 'black',
            onPress: () => this._goEventDetail(),
        }
        var deleteButton = {
            text: 'Delete',
            backgroundColor: '#FF6347',
            onPress: () => this._deleteItem(rowData.id),
        }
        if (rowData.status == "False") {
            logoStyle =  styles.falseIcon;
        }
        else {
            logoStyle = styles.trueIcon; 
        }
        return (
            <DynamicListRow
                remove={rowData.id === this.state.rowToDelete}
                onRemoving={this._onAfterRemovingElement.bind(this)}>
                <Swipeout autoClose={true} right={[deleteButton, editButton]}>
                <View style={styles.rowStyle}>
                    <View style={styles.contact}>
                        <TouchableOpacity onPress={() => this._showCollapsed()}>
                        <Text style={[styles.name]}>{rowData.name}</Text>
                        <Text style={styles.phone}>{rowData.phone}</Text>
                        </TouchableOpacity>
                    </View>
                    <CheckButton status={rowData.status}/>
                </View>
                </Swipeout>
            </DynamicListRow>
        );
    }

    _showCollapsed() {
        // Todo
    }

    _goEventDetail() {
        this.props.navigator.push({
            component: EventScene,
            title: 'EventScene'
        });
    }

    _addItemPressed() {

        AlertIOS.prompt(
            'Add Item',
            'Name here:',
            [
                {
                    text    : 'OK',
                    onPress : (name) => {
                        this._addItem(name);
                    }
                }
            ],
            'plain-text',
            ''
        );
    }

    _addItem(name) {
        this._data.push({
            id    : name + Math.random(),
            name  : name,
            phone : 'XX-XXX-XXX-XXXX',
            status : 'False'
        });
        this.setState({
            rowToDelete : -1,
            dataSource  : this.state.dataSource.cloneWithRows(this._data)
        });
    }

    componentWillUpdate(nexProps, nexState) {
        if (nexState.rowToDelete !== null) {
            this._data = this._data.filter((item) => {
                if (item.id !== nexState.rowToDelete) {
                    return item;
                }
            });
        }
    }

    _deleteItem(id) {
        this.setState({
            rowToDelete : id
        });
    }

    _onAfterRemovingElement() {
        this.setState({
            rowToDelete : null,
            dataSource  : this.state.dataSource.cloneWithRows(this._data)
        });
    }

}

const styles = StyleSheet.create({
    container : {
        flex            : 1,
        backgroundColor : '#fff'
    },
    noData    : {
        color     : '#000',
        fontSize  : 18,
        alignSelf : 'center',
        top       : 200
    },

    addPanel      : {
        paddingTop      : 40,
        paddingBottom   : 20,
        backgroundColor : '#F9F9F9'
    },
    addButton     : {
        backgroundColor : '#0A5498',
        height: 50,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    addButtonText : {
        color     : '#fff',
        alignSelf : 'center',
    },

    rowStyle : {
        backgroundColor   : '#FFF',
        paddingBottom: 10,
        paddingTop   : 5,
        paddingHorizontal : 10,
        borderBottomColor : '#ccc',
        borderBottomWidth : 1,
        flexDirection     : 'row'
    },

    rowIcon : {
        width            : 30,
        alignSelf        : 'flex-start',
        marginHorizontal : 10,
        fontSize         : 24
    },

    name    : {
        color    : '#212121',
        fontSize : 14,
        fontWeight: 'bold'
    },
    phone   : {
        color    : '#212121',
        fontSize : 10
    },
    contact : {
        width     : window.width - 100,
        alignSelf : 'flex-start'
    },

    dateText      : {
        fontSize         : 10,
        color            : '#ccc',
        marginHorizontal : 10
    },
    deleteWrapper : {
        paddingVertical : 10,
        width           : 80,
        alignSelf       : 'flex-end'
    },
    deleteIcon    : {
        fontSize  : 24,
        color     : '#DA281C',
        alignSelf : 'center'
    },
    trueIcon    : {
        fontSize  : 24,
        color     : 'green',
        alignSelf : 'center'
    },
    falseIcon    : {
        fontSize  : 24,
        color     : 'black',
        alignSelf : 'center'
    },
    progressView: {
        marginTop: 20,
  },
});