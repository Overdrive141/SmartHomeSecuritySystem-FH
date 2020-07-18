import {StyleSheet, ScrollView, Dimensions, Alert} from 'react-native';
import {WebView} from 'react-native-webview';

import React, {Component} from 'react';

import {Block, Card} from '../components';

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
              .update({indoor: '0'})
              .then(() => navigation.goBack());
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
            padding: theme.sizes.padding / 2,
          }}>
          <Card
            // shadow
            style={{
              height: Dimensions.get('screen').height / 2,
              overflow: 'hidden',
              flex: 1,
              borderRadius: 25,

              elevation: 13,
            }}>
            <WebView
              containerStyle={styles.videoContainer}
              style={styles.video}
              source={{uri: `${PUBLIC_IP}:6500/stream`}}
              scalesPageToFit={false}
              startInLoadingState={false}
              javaScriptEnabled={false}
              renderError={() => {
                Alert.alert(
                  'Oops',
                  'Indoor stream was ended or encountered an error.',
                  [
                    {
                      text: 'OK',
                      onPress: () => {
                        firebase
                          .database()
                          .ref('sensorstatus/')
                          .update({indoor: '0'})
                          .then(() => navigation.goBack());
                      },
                    },
                  ],
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
    top: 20,

    ...StyleSheet.absoluteFillObject,
  },
  video: {
    flex: 1,
  },
});

export default IndoorScreen;
