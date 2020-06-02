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
import Spinner from 'react-native-loading-spinner-overlay';
import ProgressBar from 'react-native-progress/Bar';
import Icon from 'react-native-vector-icons/FontAwesome';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {theme} from '../constants';

import {
  getStream,
  killStream,
  startDetection,
  stopDetection,
} from '../actions/neighborhoodActions';

import firebase from 'react-native-firebase';

import {RemoteMessage} from 'react-native-firebase';

import ToggleSwitch from 'toggle-switch-react-native';
import SwitchToggle from '@dooboo-ui/native-switch-toggle';

import React, {useState, useReducer, useEffect, Component} from 'react';

import {Block, Badge, Card, Text} from '../components';
import {styles as blockStyles} from '../components/Block';
import {styles as cardStyles} from '../components/Card';
// import {theme} from '../constants';
// import Video from 'react-native-video';
// import VideoPlayer from 'react-native-video-controls';
import VideoPlayer from '../components/VideoPlayer';

import socketIO from 'socket.io-client';

import useAxios from 'axios-hooks';

import {Toggle} from '@ui-kitten/components';

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
    this.socket = socketIO('http://192.168.200.31:3000', {
      transports: ['websocket'],
      jsonp: false,
    });
  }
  //   componentDidMount() {
  //     this.state = {loading: false};
  //   }

  componentDidMount() {
    // const socket = socketIO('http://192.168.200.31:3000', {
    //   transports: ['websocket'],
    //   jsonp: false,
    // });
    // socket.connect();
    // socket.on('connect', () => {
    //   console.log('connected to socket sv');
    // });
    // socket.on('logentry', function(message) {
    //   console.log(message);
    // });
    // socket.on('disconnect', function() {
    //   console.log('user disconnected');
    // });

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

    //Listen for FCM
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        // console.log(JSON.stringify(notification));
        console.log(notification);
        this.displayNotification(notification);
      });
    //22
    // this.removeNotificationDisplayedListener = firebase
    //   .notifications()
    //   .onNotificationDisplayed(notification => {
    //     // Process your notification as required
    //     // console.log(JSON.stringify(notification));
    //     console.log(notification + '3');
    //     // this.displayNotification(notification);
    //     // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
    //   });
    // this.removeNotificationListener = firebase
    //   .notifications()
    //   .onNotification(notification => {
    //     // Process your notification as required
    //     // console.log(JSON.stringify(notification));
    //     console.log(notification);
    //     this.displayNotification(notification);
    //   });

    // Notifications Firebase
    firebase
      .messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          // user has permissions
          firebase
            .messaging()
            .getToken()
            .then(fcmToken => {
              if (fcmToken) {
                // user has a device token
                console.log('Token ' + fcmToken);
                firebase
                  .database()
                  .ref('/users/' + Math.floor(141))
                  .set({
                    email: 'farhan.hammad@gmail.com',
                    notification_token: fcmToken,
                    created_at: Date.now(),
                  })
                  .then(res => {
                    console.log(res);
                  });
              } else {
                alert("User doesn't have a device token yet.");
                console.log('No Token');
              }
            });
        } else {
          // user doesn't have permission
          firebase
            .messaging()
            .requestPermission()
            .then(() => {
              // User has authorised
              alert('You will get notifications for Neighborhood Watch');
            })
            .catch(error => {
              // User has rejected permissions
              alert('You will not get notifications for Neighborhood Watch');
            });
        }
      });

    // this.onTokenRefreshListener = firebase
    //   .messaging()
    //   .onTokenRefresh(fcmToken => {
    //     // Process your token as required
    //     console.log(fcmToken);
    //   });

    const channel = new firebase.notifications.Android.Channel(
      'test-channel',
      'Test Channel',
      firebase.notifications.Android.Importance.Max,
    ).setDescription('Neighboorhood Test');
    firebase.notifications().android.createChannel(channel);
  }

  //Socket Connections
  onSocketConnection() {
    this.socket.connect();
    this.socket.on('connect', () => {
      console.log('connected to socket sv');
    });
    this.socket.on('logentry', function(message) {
      console.log(message);
    });
    this.socket.on('disconnect', function() {
      console.log('user disconnected');
    });
  }

  onSocketDisconnection() {
    this.socket.disconnect();
  }

  //Display Notifications in Foreground
  displayNotification = notification => {
    const localNotification = new firebase.notifications.Notification({
      show_in_foreground: true,
    })
      .setNotificationId(notification._notificationId)
      .setTitle(notification._title)
      .setBody(notification._body)
      .android.setChannelId('test-channel')
      .android.setBigText(notification.data._body)
      .android.setPriority(firebase.notifications.Android.Priority.High);

    firebase
      .notifications()
      .displayNotification(localNotification)
      .catch(err => console.error(err));
  };

  //Display Dummy Notification

  // displayNotification = notification => {
  //   const localNotification = new firebase.notifications.Notification({
  //     show_in_foreground: true,
  //   })
  //     .setNotificationId('123')
  //     .setTitle('Hi')
  //     .setBody('lul')
  //     .setData({
  //       key1: '1',
  //     })
  //     .android.setChannelId('test-channel');

  //   firebase.notifications().displayNotification(localNotification);
  // };

  render() {
    // console.log(this.props);
    if (this.props.suspect === 'Found a suspect') {
      ToastAndroid.show('LUL', ToastAndroid.SHORT);
      console.log(this.props.suspect.suspect);
    }
    let videoPlayerComponent;
    let switchButton1Component;
    let switchButton2Component;

    // const onCheckedChange = () => {
    //   this.setState({
    //     streamButton: !this.state.streamButton,
    //     loadingV: false,
    //     streamButton: false,
    //   });
    //   AsyncStorage.setItem('stream_state', 'false');
    //   console.log(this.state.streamButton);
    //   this.props.killStream();
    // };

    if (this.state.streamButton === true) {
      switchButton1Component = (
        <SwitchToggle
          containerStyle={{
            marginTop: 0,
            width: 45,
            height: 20,
            borderRadius: 30,
            padding: 0,
          }}
          backgroundColorOn="green"
          backgroundColorOff="black"
          backTextRight=""
          circleStyle={{
            width: 20,
            height: 20,
            borderRadius: 27.5,
            backgroundColor: 'black', // rgb(102,134,205)
          }}
          // switchOn={true}
          switchOn={this.state.streamButton}
          onPress={() => {
            this.setState({loadingV: false, streamButton: false});
            AsyncStorage.setItem('stream_state', 'false');
            console.log(this.state.streamButton);
            this.props.killStream();
          }}
          circleColorOff="white"
          circleColorOn="white"
          duration={500}
        />
        // <Toggle checked={this.state.streamButton} onChange={onCheckedChange} />
      );

      videoPlayerComponent = (
        <ScrollView
          style={{
            paddingVertical: theme.sizes.padding,
            // paddingHorizontal: theme.sizes.padding,
          }}>
          <Card
            shadow
            style={{
              height: Dimensions.get('screen').height / 2,
              // width: Dimensions.get('screen').width,
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

              // controls={true}
              // onError={onError}

              // onBuffer={this.setLoading((loading = false))}
            />
          </Card>
        </ScrollView>
      );
    } else {
      videoPlayerComponent = null;
      switchButton1Component = (
        <SwitchToggle
          containerStyle={{
            marginTop: 0,
            width: 45,
            height: 20,
            borderRadius: 30,
            padding: 0,
          }}
          backgroundColorOn="green"
          backgroundColorOff="black"
          backTextRight=""
          circleStyle={{
            width: 20,
            height: 20,
            borderRadius: 27.5,
            borderColor: 'black',
            backgroundColor: 'black', // rgb(102,134,205)
          }}
          // switchOn={false}
          switchOn={this.state.streamButton}
          onPress={() => {
            this.setState({loadingV: true, streamButton: true});
            AsyncStorage.setItem('stream_state', 'true');

            this.props.getStream();
          }}
          circleColorOff="white"
          circleColorOn="white"
          duration={500}
        />
        // <Toggle
        //   checked={this.state.streamButton}

        //   onChange={onCheckedChange}
        // />
      );
    }
    if (this.state.detectionButton === true) {
      switchButton2Component = (
        <SwitchToggle
          containerStyle={{
            marginTop: 0,
            width: 45,
            height: 20,
            borderRadius: 30,
            padding: 0,
          }}
          backgroundColorOn="green"
          backgroundColorOff="black"
          backTextRight=""
          circleStyle={{
            width: 20,
            height: 20,
            borderRadius: 27.5,
            backgroundColor: 'black', // rgb(102,134,205)
          }}
          switchOn={this.state.detectionButton}
          onPress={() => {
            this.setState({detection: false, detectionButton: false});
            this.onSocketDisconnection();
            firebase
              .database()
              .ref('/')
              .update({neighbor: 'Off'});
            AsyncStorage.setItem('detection_state', 'false');
            this.props.stopDetection();
          }}
          circleColorOff="white"
          circleColorOn="white"
          duration={500}
        />
      );
    } else {
      switchButton2Component = (
        <SwitchToggle
          containerStyle={{
            marginTop: 0,
            width: 45,
            height: 20,
            borderRadius: 30,
            padding: 0,
          }}
          backgroundColorOn="green"
          backgroundColorOff="black"
          backTextRight=""
          circleStyle={{
            width: 20,
            height: 20,
            borderRadius: 27.5,
            backgroundColor: 'black', // rgb(102,134,205)
          }}
          switchOn={this.state.detectionButton}
          onPress={() => {
            this.setState({detection: true, detectionButton: true});
            this.onSocketConnection();
            firebase
              .database()
              .ref('/')
              .update({neighbor: 'On'});
            AsyncStorage.setItem('detection_state', 'true');
            this.props.startDetection();

            // ToastAndroid.show(
            //   'Please check Node Console to see real time updates. Real Time Notification is still under development',
            //   ToastAndroid.LONG,
            // );
          }}
          circleColorOff="white"
          circleColorOn="white"
          duration={500}
        />
      );
    }

    return (
      // <ImageBackground source={bgImage} style={styles.backgroundContainer}>
      <View
        style={{
          paddingVertical: theme.sizes.padding,
          paddingHorizontal: theme.sizes.padding,
          backgroundColor: theme.colors.gray4,
          flex: 1,
          width: null,
          height: null,
        }}>
        {/* <Switch
        onValueChange={() => console.log('value changed')}
        value="Hi"
        thumbColor="red"
        trackColor="yellow"
      /> */}
        {/* <SwitchToggle
        switchOn={spinner}
        onPress={() => setSpinner(!spinner)}
        backTextRight="On"
      /> */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              marginHorizontal: 10,
              color: 'black',

              fontWeight: '900',
              justifyContent: 'flex-start',
            }}>
            Neighborhood Watch Live Stream
          </Text>
          {/* <SwitchToggle
            containerStyle={{
              marginTop: 0,
              width: 45,
              height: 20,
              borderRadius: 30,
              padding: 0,
            }}
            backgroundColorOn="green"
            backgroundColorOff="grey"
            backTextRight=""
            circleStyle={{
              width: 20,
              height: 20,
              borderRadius: 27.5,
              backgroundColor: 'black', // rgb(102,134,205)
            }}
            switchOn={true}
            onPress={() => {
              this.setState({loading: false});
            }}
            circleColorOff="white"
            circleColorOn="white"
            duration={500}
          /> */}
          {switchButton1Component}
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              marginHorizontal: 10,
              color: 'black',
              fontWeight: '900',
              justifyContent: 'flex-start',
            }}>
            Neighborhood Watch Detection
          </Text>
          {switchButton2Component}
        </View>

        {/* <View style={styles.videoContainer}> */}

        {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}> */}
        {/* <Spinner
          visible={spinner}
          style={styles.video}
          // textContent={() => 'Hi'}
          textContent={'Loading Neighborhood Stream...'}
          textStyle={styles.spinnerTextStyle}
          cancelable={true}
        /> */}
        {videoPlayerComponent}
        {/* <VideoPlayer
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

              // controls={true}
              // onError={onError}

              // onBuffer={this.setLoading((loading = false))}
            /> */}

        {/* </View> */}
        {/* </ImageBackground> */}
      </View>
    );
    // } else {
    //   return (
    //     <View>
    //       <Text>Hi</Text>
    //       <SwitchToggle
    //         containerStyle={{
    //           marginTop: 0,
    //           width: 45,
    //           height: 20,
    //           borderRadius: 30,
    //           padding: 0,
    //         }}
    //         backgroundColorOn="green"
    //         backgroundColorOff="grey"
    //         backTextRight=""
    //         circleStyle={{
    //           width: 20,
    //           height: 20,
    //           borderRadius: 27.5,
    //           backgroundColor: 'black', // rgb(102,134,205)
    //         }}
    //         switchOn={false}
    //         onPress={() => {
    //           this.setState({loading: true});
    //         }}
    //         circleColorOff="white"
    //         circleColorOn="white"
    //         duration={500}
    //       />
    //     </View>
    //   );
    //}
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

export default connect(mapStateToProps, {
  getStream,
  killStream,
  startDetection,
  stopDetection,
})(NeighborhoodClassScreen);
