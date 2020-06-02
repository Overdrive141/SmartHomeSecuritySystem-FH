import {StyleSheet, View, ImageBackground, ToastAndroid} from 'react-native';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {Badge} from 'react-native-elements';

import React, {useState, useReducer, useEffect, Component} from 'react';
import bgImage from '../../assets/images/bg3.jpg';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';

import {
  getNodeHealthStatus,
  getFlaskHealthStatus,
} from '../actions/statusAction';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';

import {Block, Text} from '../components';

class SettingsScreen extends Component {
  componentDidMount() {
    this.props.getNodeHealthStatus();
    this.props.getFlaskHealthStatus();
  }
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.serverHealth.flaskStatus.server);
    const {nodeStatus, flaskStatus} = this.props.serverHealth;
    let nodeStatusComponent, flaskStatusComponent;

    if (nodeStatus === 'ONLINE') {
      nodeStatusComponent = (
        <Block>
          <Badge
            status="success"
            containerStyle={{position: 'absolute', left: -12, top: 5}}
          />
          <Text spacing={0.4} transform="uppercase" style={{color: 'green'}}>
            Online
          </Text>
        </Block>
      );
    } else {
      nodeStatusComponent = (
        <Block>
          <Badge
            status="error"
            containerStyle={{position: 'absolute', left: -12, top: 5}}
          />
          <TouchableOpacity onPress={() => this.props.getNodeHealthStatus()}>
            <Text spacing={0.4} transform="uppercase" style={{color: 'red'}}>
              Offline
            </Text>
          </TouchableOpacity>
        </Block>
      );
    }
    if (flaskStatus.server === 'online') {
      flaskStatusComponent = (
        <Block>
          <Badge
            status="success"
            containerStyle={{position: 'absolute', left: -12, top: 5}}
          />
          <Text spacing={0.4} transform="uppercase" style={{color: 'green'}}>
            Online
          </Text>
        </Block>
      );
    } else {
      flaskStatusComponent = (
        <Block>
          <Badge
            status="error"
            containerStyle={{position: 'absolute', left: -12, top: 5}}
          />
          <TouchableOpacity onPress={() => this.props.getNodeHealthStatus()}>
            <Text spacing={0.4} transform="uppercase" style={{color: 'red'}}>
              Offline
            </Text>
          </TouchableOpacity>
        </Block>
      );
    }

    // console.log(this.state);
    return (
      <ScrollView>
        <Block style={styles.backgroundContainer}>
          <Block row>
            <Block center>
              <Text bold spacing={0.4}>
                Node Server Status:
              </Text>
            </Block>
            <Block right>{nodeStatusComponent}</Block>
          </Block>
          <Block row style={{marginTop: 5}}>
            <Block center>
              <Text bold spacing={0.4}>
                Flask Server Status:
              </Text>
            </Block>
            <Block right>{flaskStatusComponent}</Block>
          </Block>
        </Block>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    padding: 10,
    // alignItems: 'center',
    // justifyContent: 'space-evenly',
  },
});

SettingsScreen.propTypes = {
  getNodeHealthStatus: PropTypes.func.isRequired,
  getFlaskHealthStatus: PropTypes.func.isRequired,
  nodeStatus: PropTypes.object,
  flaskStatus: PropTypes.object,
};

const mapStateToProps = state => ({
  serverHealth: state.status,
});

export default connect(mapStateToProps, {
  getNodeHealthStatus,
  getFlaskHealthStatus,
})(SettingsScreen);
