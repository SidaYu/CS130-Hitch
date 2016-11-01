import React, { Component, PropTypes } from 'react';
import CalendarScene from './CalendarScene';
import {
  AppRegistry,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  NavigatorIOS,
  Text,
  Image,
  TextInput,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ProgressBar extends Component {
	constructor(props) {
		super(props);
		this.state = {counter: 20};
	}
	static get defaultProps() {
		return {
			title: 'ProgressBar',
			pairs: [],
		};
	}
	static propType = {
		title: PropTypes.string.isRequired,
	}

	render() {
		this.addPairs(15);
		return (
			<ScrollView style={{flex:1, flexDirection: 'column', backgroundColor:'white'}}>
				<Icon.Button name="check-circle-o" color="black" backgroundColor="white" size={50} marginBottom={-10}/>
				{this.renderPairs()}
			</ScrollView>
			);
	}

	renderPairs() {
		return (this.props.pairs.map((pair, index) => <View key={index}>{pair}</View>));
	}

	addPairs() {
		for (var i = 0; i < arguments[0]; i++) {
			if (i < this.state.counter)
			{
				this.props.pairs.push(<Icon name="long-arrow-down" style={{marginLeft: 22, color:"green"}} size={30}/>);
			}
			else
			{
				this.props.pairs.push(<Icon name="long-arrow-down" style={{marginLeft: 22}} size={30}/>);
			}
			i++;
			if (i < this.state.counter)
			{
				this.props.pairs.push(<Icon.Button name="check-circle-o" size={50} marginBottom={-10} marginTop={-10} color="green" backgroundColor="white" onPress={() => this.props.navigator.push({component: CalendarScene, title: 'CalendarScene'})}/>);
			}
			else
			{
				this.props.pairs.push(<Icon.Button name="check-circle-o" size={50} marginBottom={-10} marginTop={-10} color="black" backgroundColor="white" onPress={() => this.props.navigator.push({component: CalendarScene, title: 'CalendarScene'})}/>);
			}
		}
	}
}