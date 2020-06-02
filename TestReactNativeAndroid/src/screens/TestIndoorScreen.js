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
import {WebView} from 'react-native-webview';

import React, {useState, useReducer, useEffect, Component} from 'react';

import {theme} from '../constants';

import {Block, Badge, Card, Text} from '../components';

import VideoPlayer from '../components/VideoPlayer';

class TestIndoorScreen extends Component {
  render() {
    return (
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
          <WebView
            // style={styles.videoContainer}
            source={{uri: 'http://192.168.200.3:5000/video'}}
          />
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
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
});

export default TestIndoorScreen;
