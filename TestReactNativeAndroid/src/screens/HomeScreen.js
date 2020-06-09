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
import React, {useEffect} from 'react';
import bgImage from '../../assets/images/bg3.jpg';
import logo from '../../assets/images/logo.png';
import Video from 'react-native-video';

import MenuItems from '../components/MenuItems';

import firebase from 'react-native-firebase';

import {Card, Text} from '@ui-kitten/components';
import {theme} from '../constants';

const HomeScreen = ({navigation}) => {
  useEffect(() => {
    //Listen for FCM
    firebase.notifications().onNotification(notification => {
      // console.log(JSON.stringify(notification));
      console.log(notification);
      this.displayNotification(notification);
    });

    firebase
      .messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          // user has permissions

          // firebase
          //   .messaging()
          //   .getToken()
          //   .then(fcmToken => {
          //     if (fcmToken) {
          //       // user has a device token
          //       console.log('Token ' + fcmToken);
          //       firebase
          //         .database()
          //         .ref('/users/' + Math.floor(141))
          //         .set({
          //           email: 'farhan.hammad@gmail.com',
          //           notification_token: fcmToken,
          //           created_at: Date.now(),
          //         })
          //         .then(res => {
          //           console.log(res);
          //         });
          //     } else {
          //       alert("User doesn't have a device token yet.");
          //       console.log('No Token');
          //     }
          //   });

          firebase.messaging().subscribeToTopic('smarthometest');
        } else {
          // user doesn't have permission
          firebase
            .messaging()
            .requestPermission()
            .then(() => {
              // User has authorised
              alert('You will get notifications for Neighborhood Watch');
              firebase.messaging().subscribeToTopic('smarthometest');
            })
            .catch(error => {
              // User has rejected permissions
              alert('You will not get notifications for Neighborhood Watch');
            });
        }
      });

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

    //   // this.onTokenRefreshListener = firebase
    //   //   .messaging()
    //   //   .onTokenRefresh(fcmToken => {
    //   //     // Process your token as required
    //   //     console.log(fcmToken);
    //   //   });

    //   const channel = new firebase.notifications.Android.Channel(
    //     'test-channel',
    //     'Test Channel',
    //     firebase.notifications.Android.Importance.Max,
    //   ).setDescription('Neighboorhood Test');
    //   firebase.notifications().android.createChannel(channel);
  });

  // TODO: Max 3 per row. Set menuitems style
  return (
    <View style={styles.welcome}>
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
          title="Indoor Camera"
          imageSource={require('../../assets/images/indoor.png')}
          navigation={navigation}
          name="TestIndoor"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  welcome: {
    paddingTop: theme.sizes.padding,
    paddingLeft: theme.sizes.padding,
    paddingRight: theme.sizes.padding,
    backgroundColor: theme.colors.gray4,
    flex: 1,
    // padding: 8,
  },
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
    // alignItems: 'flex-end',
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
