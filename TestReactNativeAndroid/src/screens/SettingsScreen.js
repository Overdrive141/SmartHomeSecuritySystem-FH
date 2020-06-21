import {
  StyleSheet,
  View,
  ImageBackground,
  ToastAndroid,
  Switch,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {Badge} from 'react-native-elements';
import {theme} from '../constants';

import React, {useState, useReducer, useEffect, Component} from 'react';
import bgImage from '../../assets/images/bg3.jpg';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';

import {Toggle} from '@ui-kitten/components';

import {
  getNodeHealthStatus,
  getFlaskHealthStatus,
} from '../actions/statusAction';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';

import {Block, Text} from '../components';
import firebase from 'react-native-firebase';

class SettingsScreen extends Component {
  componentDidMount() {
    this.props.getNodeHealthStatus();
    this.props.getFlaskHealthStatus();
    this.onScreenFocus();
    this.props.navigation.addListener('didFocus', this.onScreenFocus);
  }
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      patternStatus: false,
      pattern: '',
    };
  }

  // ScreenFocus Listener Method
  onScreenFocus = () => {
    this.setState({
      isLoading: true,
    });
    firebase
      .database()
      .ref('sensorstatus/pattern')
      .once('value')
      .then(snapshot => {
        this.setState({
          pattern: snapshot.val(),

          // refreshing: false,
        });

        if (this.state.pattern === '0') {
          this.setState({
            patternStatus: false,
            isLoading: false,
          });
        } else if (this.state.pattern === '1') {
          this.setState({
            patternStatus: true,
            isLoading: false,
          });
        }
      })
      .catch(err => console.log(err));
  };

  // RefreshControl Method
  onRefresh = () => {
    this.setState(
      {
        refreshing: true,
      },
      () => this.onScreenFocus(),
    );
  };

  onChange = () => {
    console.log(this.state);
    if (this.state.pattern === '0') {
      this.setState(
        {
          pattern: '1',
          patternStatus: true,
        },
        () => {
          firebase
            .database()
            .ref('sensorstatus/')
            .update({
              pattern: this.state.pattern,
            });
        },
      );
    } else {
      this.setState(
        {
          pattern: '0',
          patternStatus: false,
        },
        () => {
          firebase
            .database()
            .ref('sensorstatus/')
            .update({
              pattern: this.state.pattern,
            });
        },
      );
    }
  };

  renderLoading() {
    return (
      <Block middle>
        <ActivityIndicator
          animating={this.state.isLoading}
          size="large"
          style={styles.activityIndicator}
        />
      </Block>
    );
  }

  renderSettings() {
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
          <TouchableOpacity onPress={() => this.props.getFlaskHealthStatus()}>
            <Text spacing={0.4} transform="uppercase" style={{color: 'red'}}>
              Offline
            </Text>
          </TouchableOpacity>
        </Block>
      );
    }

    // console.log(this.state);
    return (
      <ScrollView style={styles.backgroundContainer}>
        <Block>
          <Block style={{marginBottom: theme.sizes.base}}>
            <Text spacing={0.4} bold gray>
              Server Status
            </Text>
          </Block>
          <Block row style={styles.block}>
            <Block center>
              <Text spacing={0.6}>Node Server:</Text>
            </Block>
            <Block center>{nodeStatusComponent}</Block>
          </Block>
          <Block row style={{marginTop: 5}}>
            <Block center>
              <Text spacing={0.6}>Flask Server:</Text>
            </Block>
            <Block center>{flaskStatusComponent}</Block>
          </Block>
        </Block>
        <Block color="gray2" style={styles.hLine} />

        <Block>
          <Block style={{marginBottom: theme.sizes.base}}>
            <Text spacing={0.4} bold gray>
              Application Settings
            </Text>
          </Block>
          <Block row style={{marginTop: 5}}>
            <Block middle center>
              <Text spacing={0.8}>Smart Routine</Text>
            </Block>

            <Block center>
              <Switch
                style={styles.switchButton}
                onValueChange={this.onChange}
                value={this.state.patternStatus}
              />
            </Block>
          </Block>

          <Block style={{padding: 0, marginLeft: 40, marginRight: 60}}>
            <Text spacing={0.4} gray2 justify caption>
              Smart Routine turns on lights and fans automatically based on the
              time you arrive at your home
            </Text>
          </Block>
        </Block>
      </ScrollView>
    );
  }

  render() {
    let loadingComponent, settingsComponent;
    if (this.state.isLoading) {
      loadingComponent = this.renderLoading();
      settingsComponent = null;
    } else {
      loadingComponent = null;
      settingsComponent = this.renderSettings();
    }

    return (
      <React.Fragment>
        {loadingComponent}
        {settingsComponent}
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    paddingVertical: theme.sizes.padding,
    paddingHorizontal: theme.sizes.padding,
    backgroundColor: theme.colors.gray4,

    // alignItems: 'center',
    // justifyContent: 'space-evenly',
  },
  block: {marginTop: 5},
  hLine: {
    marginVertical: theme.sizes.base,
    marginHorizontal: theme.sizes.base * 2,
    height: 1,
  },
  toggle: {
    margin: 2,
  },
  switchButton: {
    transform: [
      {
        scaleX: theme.sizes.scaleX,
      },
      {
        scaleY: theme.sizes.scaleY,
      },
    ],
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

export default connect(
  mapStateToProps,
  {
    getNodeHealthStatus,
    getFlaskHealthStatus,
  },
)(SettingsScreen);
