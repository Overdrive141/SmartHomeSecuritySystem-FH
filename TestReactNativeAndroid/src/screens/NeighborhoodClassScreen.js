import {
  StyleSheet,
  // Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Button,
  Alert,
  Navigator,
  Switch,
  Modal,
  ToastAndroid,
} from 'react-native';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {Divider} from 'react-native-elements';

import {theme} from '../constants';

import {
  getStream,
  killStream,
  startDetection,
  stopDetection,
} from '../actions/neighborhoodActions';

import firebase from 'react-native-firebase';

import React, {useState, useReducer, useEffect, Component} from 'react';

import {Block, Badge, Card, Text} from '../components';
import {styles as blockStyles} from '../components/Block';
import {styles as cardStyles} from '../components/Card';

import VideoPlayer from '../components/VideoPlayer';

import AsyncStorage from '@react-native-community/async-storage';

class NeighborhoodClassScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingV: false,
      detection: false,
      streamButton: false,
      detectionButton: false,
    };
  }

  componentDidMount() {
    // Fetch Button State from Store
    try {
      AsyncStorage.getItem('stream_state').then(data => {
        if (data) {
          const streamButton = JSON.parse(data);
          this.setState({
            streamButton,
          });
        }
      });
    } catch (err) {
      ToastAndroid.show(
        'Failed to load stream button state' + err,
        ToastAndroid.LONG,
      );
    }
    try {
      AsyncStorage.getItem('detection_state').then(data => {
        if (data) {
          const detectionButton = JSON.parse(data);
          this.setState({
            detectionButton,
          });
        }
      });
    } catch (err) {
      ToastAndroid.show(
        'Failed to load detection button state' + err,
        ToastAndroid.LONG,
      );
    }
  }

  render() {
    // console.log(this.props);
    if (this.props.suspect === 'Found a suspect') {
      ToastAndroid.show('LUL', ToastAndroid.SHORT);
      console.log(this.props.suspect.suspect);
    }
    let videoPlayerComponent;
    let switchButton1Component;
    let switchButton2Component;

    if (this.state.streamButton === true) {
      switchButton1Component = (
        <Switch
          style={styles.switchButton}
          onValueChange={() => {
            this.setState({loadingV: false, streamButton: false});
            AsyncStorage.setItem('stream_state', 'false');
            this.props.killStream();
          }}
          value={this.state.streamButton}
        />
      );

      videoPlayerComponent = (
        <ScrollView
          style={{
            paddingVertical: theme.sizes.padding,
          }}>
          <Block color="gray2" style={styles.hLine} />
          <Card
            shadow
            style={{
              height: Dimensions.get('screen').height / 2,
            }}>
            <VideoPlayer
              videoStyle={styles.video}
              style={styles.videoContainer}
              source={{
                uri: 'http://192.168.200.31:8160',
              }}
              resizeMode="contain"
              navigator={navigator}
              disableFullscreen
              disableSeekbar
              disableVolume
              disableBack
              disableTimer
            />
          </Card>
        </ScrollView>
      );
    } else {
      videoPlayerComponent = null;
      switchButton1Component = (
        <Switch
          style={styles.switchButton}
          onValueChange={() => {
            this.setState({loadingV: true, streamButton: true});
            AsyncStorage.setItem('stream_state', 'true');
            this.props.getStream();
          }}
          value={this.state.streamButton}
        />
      );
    }
    if (this.state.detectionButton === true) {
      switchButton2Component = (
        <Switch
          style={styles.switchButton}
          onValueChange={() => {
            this.setState({detection: false, detectionButton: false});
            firebase
              .database()
              .ref('/')
              .update({neighbor: 'Off'})
              .then(
                setTimeout(() => {
                  this.props.stopDetection();
                }, 5000),
              );
            AsyncStorage.setItem('detection_state', 'false');
          }}
          value={this.state.detectionButton}
        />
      );
    } else {
      switchButton2Component = (
        <Switch
          style={styles.switchButton}
          onValueChange={() => {
            this.setState({detection: true, detectionButton: true});
            firebase
              .database()
              .ref('/')
              .update({neighbor: 'On'})
              .then(() => {
                this.props.startDetection();
                ToastAndroid.show(
                  'You will receive notifications if there is any suspicious activity outside',
                  ToastAndroid.LONG,
                );
              });
            AsyncStorage.setItem('detection_state', 'true');
          }}
          value={this.state.detectionButton}
        />
      );
    }

    return (
      <ScrollView style={{backgroundColor: theme.colors.gray4}}>
        <Block style={styles.blockContainer}>
          <Block row>
            <Block left flex={0.11} />
            <Block left flex={1.4}>
              <Text bold h4 spacing={0.5}>
                Outdoor Live Stream
              </Text>
            </Block>
            <Block center>{switchButton1Component}</Block>
          </Block>
          <Block row>
            <Block left flex={0.05} />
            <Block left flex={0.5}>
              <Text spacing={0.5} gray justify caption>
                You will receive a live stream of your front door camera
              </Text>
            </Block>
            <Block center flex={0.05} />
          </Block>

          <Block row style={{marginTop: 15}}>
            <Block left flex={0.11} />
            <Block left flex={1.4}>
              <Text bold h4 spacing={0.5}>
                Outdoor Human Detection
              </Text>
            </Block>
            <Block center>{switchButton2Component}</Block>
          </Block>
          <Block row>
            <Block left flex={0.05} />
            <Block left flex={0.5}>
              <Text spacing={0.5} gray justify caption>
                You will be notified if anyone is detected outside your door for
                an extended period of time by enabling this option
              </Text>
            </Block>
          </Block>

          {videoPlayerComponent}
        </Block>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
  videoContainer: {
    // height: '33%',
    // width: '100%',
    // borderColor: 'white',
    // borderRadius: 5,
    // backgroundColor: 'black',
    // flex: 1,
    // position: 'absolute',
    // justifyContent: 'center',
    // alignSelf: 'stretch',
    // textAlign: 'center',
    // alignItems: 'center',
    top: 20,
    borderRadius: 30,
    ...StyleSheet.absoluteFillObject,
  },
  video: {
    // backgroundColor: 'rgba(52, 52, 52, 0.8)',
    // justifyContent: 'center',
    // position: 'absolute',
    // alignItems: 'center',
    // height: 1080,
    // width: 1920,
    // borderColor: 'white',
    // borderRadius: 5,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,

    // justifyContent: 'center',
    // alignItems: 'center',
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
  blockContainer: {
    // justifyContent: 'center',
    padding: theme.sizes.padding,
    margin: theme.sizes.base,
  },
  hLine: {
    marginVertical: theme.sizes.base,
    marginHorizontal: theme.sizes.base * 2,
    height: 1,
    // width: 500,
  },
});

NeighborhoodClassScreen.propTypes = {
  getStream: PropTypes.func,
  killStream: PropTypes.func,
  startDetection: PropTypes.func,
  stopDetection: PropTypes.func,
  loading: PropTypes.bool,
  loadingV: PropTypes.bool,
  stream: PropTypes.bool,
  suspect: PropTypes.object,
  message: PropTypes.object,
  // detection: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  loading: state.loading,
  // loadingV: state.loadingV,
  stream: state.stream,
  suspect: state.suspect,
  message: state.message,
  // detection: state.detection,
});

export default connect(
  mapStateToProps,
  {
    getStream,
    killStream,
    startDetection,
    stopDetection,
  },
)(NeighborhoodClassScreen);
