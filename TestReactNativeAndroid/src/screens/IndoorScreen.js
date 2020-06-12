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

// TODO: Set Loading Container in WebView
// TODO: On Back Button Set Indoor To 0 in Firebase RTDB

class IndoorScreen extends Component {
  render() {
    return (
      <ScrollView style={styles.welcome}>
        <View
          style={{
            overflow: 'hidden',
            flex: 1,
            borderRadius: 30,
            margin: 15,
            height: Dimensions.get('screen').height / 2,
          }}>
          {/* <Card
            shadow
            style={{
              height: Dimensions.get('screen').height / 2,
              // overflow: 'hidden',
              // flex: 1,
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              // width: Dimensions.get('screen').width,
            }}> */}
          <WebView
            style={styles.video}
            source={{uri: 'http://192.168.200.3:5000/video'}}
            scalesPageToFit={false}
            startInLoadingState={false}
            javaScriptEnabled={false}
          />
          {/* </Card> */}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    paddingVertical: theme.sizes.padding,
    paddingHorizontal: theme.sizes.padding,
    backgroundColor: theme.colors.gray4,
    // padding: 8,
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
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    flex: 1,

    // ...StyleSheet.absoluteFillObject,
  },
});

export default IndoorScreen;
