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

import MenuItems from '../components/MenuItems';

import firebase from 'react-native-firebase';

import {theme} from '../constants';

const HomeScreen = ({navigation}) => {
  useEffect(() => {
    requestUserPermission();
    //Listen for FCM
    firebase.notifications().onNotification(notification => {
      console.log('notification');
      displayNotification(notification);
    });

    // firebase
    //   .messaging()
    //   .hasPermission()
    //   .then(enabled => {
    //     if (enabled) {
    //       // user has permissions
    //       firebase.messaging().subscribeToTopic('smarthometest');
    //       firebase.messaging().subscribeToTopic('indoorcam');
    //     } else {
    //       // user doesn't have permission
    //       firebase
    //         .messaging()
    //         .requestPermission()
    //         .then(() => {
    //           // User has authorised
    //           alert('You will get all notifications.');
    //           firebase.messaging().subscribeToTopic('smarthometest');
    //           firebase.messaging().subscribeToTopic('indoorcam');
    //         })
    //         .catch(error => {
    //           // User has rejected permissions
    //           alert('You will not get any notifications.');
    //         });
    //     }
    //   });

    //   // this.onTokenRefreshListener = firebase
    //   //   .messaging()
    //   //   .onTokenRefresh(fcmToken => {
    //   //     // Process your token as required
    //   //     console.log(fcmToken);
    //   //   });
    const neighborhoodChannel = new firebase.notifications.Android.Channel(
      'smart-home-neighborhood',
      'Outdoor Security Channel',
      firebase.notifications.Android.Importance.Max,
    ).setDescription('Smart Home Security System Neighborhood Watch');
    const indoorChannel = new firebase.notifications.Android.Channel(
      'smart-home-indoor',
      'Indoor Security Channel',
      firebase.notifications.Android.Importance.Max,
    ).setDescription('Smart Home Security System Indoor Cam');
    const channel = new firebase.notifications.Android.Channel(
      'smart-home-pattern',
      'Devices Channel',
      firebase.notifications.Android.Importance.Max,
    ).setDescription('Smart Home Security System Devices Alert');
    firebase.notifications().android.createChannel(indoorChannel);
    firebase.notifications().android.createChannel(channel);
    firebase.notifications().android.createChannel(neighborhoodChannel);

    //Navigate to screen on click of push notification from foreground
    firebase.notifications().onNotificationOpened(notificationOpen => {
      const {channelId} = notificationOpen.notification._data;
      console.log('onNoficiationOpen' + notificationOpen);
      if (channelId === 'smart-home-indoor') {
        navigation.navigate('Indoor');
      } else if (channelId === 'smart-home-pattern') {
        navigation.navigate('OtherControls');
      } else if (channelId === 'smart-home-neighborhood') {
        navigation.navigate('Neighborhood');
      }
      // notificationOpen.notification.android.setAutoCancel(true);
      // else if (_title.includes('Suspicious')){
      //   navigation.navigate('Neighborhood');
      // }

      // firebase
      //   .notifications()
      //   .removeDeliveredNotification(notification.notificationId);
    });

    // Navigate to screen on click of push notification from background/quit state
    firebase
      .notifications()
      .getInitialNotification()
      .then(notificationOpen => {
        const {channelId} = notificationOpen.notification._data;
        if (channelId === 'smart-home-indoor') {
          navigation.navigate('Indoor');
          notificationOpen.notification.android.setAutoCancel(true);
        } else if (channelId === 'smart-home-pattern') {
          navigation.navigate('OtherControls');
          notificationOpen.notification.android.setAutoCancel(true);
        } else if (channelId === 'smart-home-neighborhood') {
          navigation.navigate('Neighborhood');
        }
        console.log('getInitial' + notificationOpen.notification);
        // }
      });

    //Display Notifications in Foreground
    const displayNotification = notification => {
      console.log('displayNotification' + notification);
      const localNotification = new firebase.notifications.Notification({
        show_in_foreground: true,
      })
        .setNotificationId(notification._notificationId)
        .setTitle(notification._title)
        .setBody(notification._body)
        .setData(notification._data)
        .android.setChannelId('smart-home')
        .android.setBigText(notification.data._body)
        .android.setSmallIcon('@mipmap/ic_transparent')
        .android.setPriority(firebase.notifications.Android.Priority.High);

      firebase
        .notifications()
        .displayNotification(localNotification)
        .catch(err => console.error(err));
    };
  }, []);

  const requestUserPermission = () => {
    firebase
      .messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          // user has permissions
          firebase.messaging().subscribeToTopic('smarthometest');
          firebase.messaging().subscribeToTopic('indoorcam');
        } else {
          // user doesn't have permission
          firebase
            .messaging()
            .requestPermission()
            .then(() => {
              // User has authorised
              alert('You will get all notifications.');
              firebase.messaging().subscribeToTopic('smarthometest');
              firebase.messaging().subscribeToTopic('indoorcam');
            })
            .catch(error => {
              // User has rejected permissions
              alert('You will not get any notifications.');
            });
        }
      });
  };

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
      {/* <View style={styles.viewStyle}>
        <MenuItems
          title="Other Controls"
          imageSource={require('../../assets/images/fan.png')}
          navigation={navigation}
          name="TestAssistant"
        />
        <MenuItems
          title="Indoor Camera"
          imageSource={require('../../assets/images/indoor.png')}
          navigation={navigation}
          name="TestIndoor"
        />
      </View> */}
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
