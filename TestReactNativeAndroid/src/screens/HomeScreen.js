import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import MenuItems from '../components/MenuItems';

import firebase from 'react-native-firebase';

import {theme} from '../constants';
import {Block, Text, Card, Loading} from '../components';
import {Divider} from 'react-native-elements';
import {styles as blockStyles} from '../components/Block';
import {styles as cardStyles} from '../components/Card';

import Geolocation from 'react-native-geolocation-service';
import LinearGradient from 'react-native-linear-gradient';
import {WEATHER_API_KEY} from '../env';

const HomeScreen = ({navigation}) => {
  const [temperature, setTemperature] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Listen for FCM
    firebase.notifications().onNotification(notification => {
      console.log('notification');
      displayNotification(notification);
    });

    requestLocationPermission();
    requestUserPermission();

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
        .android.setChannelId('smart-home-indoor')
        .android.setBigText(notification.data._body)
        .android.setSmallIcon('@mipmap/ic_transparent')
        .android.setPriority(firebase.notifications.Android.Priority.High);

      firebase
        .notifications()
        .displayNotification(localNotification)
        .catch(err => console.error(err));
    };
  }, []);

  const fetchWeather = async (lat, lon) => {
    await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`,
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setTemperature({
          data,
          city: data.city,
          temp: data.main.temp,
          desc: data.weather[0].description,
          icon: data.weather[0].icon,
        });
        // console.log(data.main.temp);
        // console.log(data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'Smart Home Security System needs access to your location ' +
            'so that we can give you accurate weather information.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            fetchWeather(position.coords.latitude, position.coords.longitude);
            setLoading(false);
          },

          error => {
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } else {
        console.log('LUL');
      }
    } catch (err) {
      console.warn(err);
    }
  };

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

  if (loading) {
    return <Loading state={loading} />;
  }
  // // TODO: Max 3 per row. Set menuitems style
  else {
    return (
      <View style={styles.welcome}>
        <View style={{padding: 8}}>
          <Text gray2 left h3>
            Welcome Home
          </Text>
        </View>

        <Block flex={false} style={{padding: 10, height: 150}}>
          {/* <Card style={styles.gradientCard}> */}
          <LinearGradient
            useAngle={true}
            angle={160}
            start={{x: 0.0, y: 0.25}}
            end={{x: 1.0, y: 0.5}}
            style={[cardStyles.card, styles.gradientCard]}
            colors={['#C973FF', '#A3C9E2']}>
            <Block>
              <Block row>
                <Block center>
                  <Block row center middle>
                    <Block left middle>
                      <Image
                        style={{width: 80, height: 80}}
                        source={{
                          uri:
                            'https://openweathermap.org/img/w/' +
                            temperature.icon +
                            '.png',
                        }}
                      />
                    </Block>
                    <Block row style={{marginLeft: 25}}>
                      <Text bold h2 right>
                        {Math.round(temperature.temp)}
                      </Text>
                      <Text h3 right>
                        &#8451;
                      </Text>
                    </Block>
                  </Block>
                </Block>

                <Block flex={false} color="gray3" style={styles.vLine} />

                <Block middle center>
                  <Text bold h4 transform="capitalize">
                    {temperature.desc}
                  </Text>
                </Block>
              </Block>
              {/* <Divider
                style={{backgroundColor: '#dfe6e9', marginVertical: 20}}
              /> */}
              {/* <Block color="gray2" style={styles.hLine} /> */}
            </Block>
          </LinearGradient>
          {/* </Card> */}
        </Block>
        <Divider
          style={{
            backgroundColor: '#dfe6e9',
            margin: theme.sizes.base,
            height: 1,
            width: 300,
            alignSelf: 'center',
          }}
        />

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
      </View>
    );
  }
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
    alignItems: 'flex-end',
  },
  // notes: {
  //   fontSize: 18,
  //   color: '#fff',
  //   textTransform: 'capitalize',
  // },
  logoContainer: {
    //alignItems: 'center'
    //  padding: 30,
    //  marginRight: 15,
  },
  logo: {
    width: 120,
    height: 120,
  },
  hLine: {
    marginVertical: theme.sizes.base,
    marginHorizontal: theme.sizes.base * 2,
    height: 1,
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
  gradientCard: {
    height: 120,
    elevation: 12,
  },
  vLine: {
    marginVertical: theme.sizes.base / 10,
    width: 1,
    marginLeft: 30,
  },
});

export default HomeScreen;
