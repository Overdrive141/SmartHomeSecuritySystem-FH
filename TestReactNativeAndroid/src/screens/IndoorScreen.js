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

import {Block, Card, Text} from '../components';

import {theme} from '../constants';
import {HeaderBackButton} from 'react-navigation-stack';
import firebase from 'react-native-firebase';
import {PUBLIC_IP} from '../env';

// TODO: Set Loading Container in WebView
// TODO: On Back Button Set Indoor To 0 in Firebase RTDB

class IndoorScreen extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: (
        <HeaderBackButton
          onPress={() => {
            firebase
              .database()
              .ref('sensorstatus/')
              .update({indoor: '0'});
            navigation.goBack();
          }}
        />
      ),
    };
  };
  render() {
    return (
      <ScrollView style={styles.welcome}>
        <Block
          style={{
            overflow: 'hidden',
            flex: 1,
            borderRadius: 30,
            margin: theme.sizes.base,
            // height: Dimensions.get('screen').height / 2,
            // shadowColor: '#000',
            // shadowOffset: {
            //   width: 0,
            //   height: 2,
            // },
            // shadowOpacity: 0.3,
            // shadowRadius: 4.65,
            elevation: 5,
          }}>
          <Card
            // shadow
            style={{
              height: Dimensions.get('screen').height / 2,
              overflow: 'hidden',
              flex: 1,
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              // width: Dimensions.get('screen').width,
              // shadowColor: '#000',
              // shadowOffset: {
              //   width: 0,
              //   height: 4,
              // },
              // shadowOpacity: 0.3,
              // shadowRadius: 4.65,

              // elevation: 8,
            }}>
            <WebView
              containerStyle={styles.videoContainer}
              style={styles.video}
              source={{uri: `${PUBLIC_IP}:5000/video`}}
              // source={{uri: 'http://192.168.200.3:5000/video'}}
              scalesPageToFit={false}
              startInLoadingState={false}
              javaScriptEnabled={false}
              renderError={() => {
                Alert.alert(
                  'Oops',
                  'Indoor stream was ended or encountered an error.',
                  [{text: 'OK', onPress: () => this.props.navigation.goBack()}],
                  {cancelable: false},
                );
              }}
            />
          </Card>
        </Block>
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
