import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import bgImage from '../../assets/images/bg3.jpg';
import logo from '../../assets/images/logo.png';
import Video from 'react-native-video';

import MenuItems from '../components/MenuItems';

import {Card, Text} from '@ui-kitten/components';

const HomeScreen = ({navigation}) => {
  // TODO: Max 3 per row. Set menuitems style
  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.viewStyle}>
        <MenuItems
          title="Neighborhood Watch"
          imageSource={require('../../assets/images/neighborhood.png')}
          navigation={navigation}
          name="Neighborhood"
        />
        <MenuItems
          title="Smart Door Lock"
          imageSource={require('../../assets/images/smartlock2.png')}
          navigation={navigation}
          name="DoorLock"
        />
        {/* <MenuItems
          title="Indoor Security Camera"
          imageSource={require('../../assets/images/indoor.png')}
          navigation={navigation}
          name="DoorLock"
        /> */}

        {/* <MenuItems
          title="Smart Door Lock"
          imageSource={require('../../assets/images/smarthome.png')}
          navigation={navigation}
          name="DoorLock"
        /> */}
      </View>
      <View style={styles.viewStyle}>
        <MenuItems
          title="Gesture Control"
          imageSource={require('../../assets/images/smartlock.png')}
          navigation={navigation}
          name="Gestures"
        />
        <MenuItems
          title="Control Center"
          imageSource={require('../../assets/images/fan.png')}
          navigation={navigation}
          name="OtherControls"
        />
      </View>
      <View style={styles.viewStyle}>
        {/* <MenuItems
          title="Other Controls"
          imageSource={require('../../assets/images/fan.png')}
          navigation={navigation}
          name="DoorLock"
        /> */}
        <MenuItems
          title="Test"
          imageSource={require('../../assets/images/fan.png')}
          navigation={navigation}
          name="TestIndoor"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    justifyContent: 'center',
    aspectRatio: 1.0,
    margin: 8,
    maxWidth: Dimensions.get('window').width / 2 - 24,
  },
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  backgroundContainer: {
    // flex: 1,
    // width: null,
    // height: null,
    // // justifyContent: 'center',
    // alignItems: 'center',
    padding: 8,
  },
  logoContainer: {
    //alignItems: 'center'
    //  padding: 30,
    //  marginRight: 15,
  },
  logo: {
    width: 120,
    height: 120,
  },
  logoText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
    opacity: 0.5,
  },
  buttons: {
    padding: 30,
    //marginRight: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '300',
    alignItems: 'center',
  },
});

export default HomeScreen;
