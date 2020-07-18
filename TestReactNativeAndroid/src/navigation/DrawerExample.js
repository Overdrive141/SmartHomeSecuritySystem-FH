import React from 'react';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';

import AsyncStorage from '@react-native-community/async-storage';

import HomeScreen from '../../src/screens/HomeScreen';
import GestureScreen from '../../src/screens/GestureScreen';

import NeighborhoodClassScreen from '../../src/screens/NeighborhoodClassScreen';
import TestState from '../../src/screens/TestState';
import DoorLockScreen from '../../src/screens/DoorLockScreen';
import SettingsScreen from '../../src/screens/SettingsScreen';
import OtherControlsScreen from '../../src/screens/OtherControlsScreen';
import HelpScreen from '../../src/screens/HelpScreen';

import {Icon} from 'native-base';
import IconF from 'react-native-vector-icons/FontAwesome';

import {
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import {fromBottom} from 'react-navigation-transitions';
import IndoorScreen from '../screens/IndoorScreen';
import IntroScreen from '../screens/IntroScreen';
import {theme} from '../constants';

class DrawerExample extends React.Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          {/*Donute Button Image */}
          <Image
            source={require('../../assets/images/Menu.png')}
            style={{width: 20, height: 23, marginLeft: 12}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  }
}

// Custom Drawer
const CustomDrawerComponent = props => (
  <SafeAreaView style={{flex: 1}}>
    <View
      style={{
        height: 150,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={require('../../assets/images/extended.png')}
        style={{height: 150, width: 180, borderRadius: 60}}
      />
      {/* <Text style={{fontSize: 15, fontWeight: 'bold'}}> */}
      {/* <Text spacing={0.4} transform="uppercase" bold>
        Smart Home Security System
      </Text> */}
    </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
);

const IntroStack = createStackNavigator({Intro: IntroScreen});

const MainStackNavigator = createStackNavigator(
  {
    //All the screen from the Screen1 will be indexed here
    Help: {
      screen: HelpScreen,
      navigationOptions: ({navigation}) => ({
        title: 'Help',
      }),
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: ({navigation}) => ({
        title: 'Smart Home Security System',
        headerLeft: <DrawerExample navigationProps={navigation} />,
        headerRight: (
          <TouchableOpacity
            onPress={() => {
              AsyncStorage.setItem('showMainApp', 'false');
              navigation.navigate('Help');
            }}>
            <IconF name="question-circle-o" size={30} />
          </TouchableOpacity>
        ),
      }),
    },
    Neighborhood: {
      screen: NeighborhoodClassScreen,
      navigationOptions: ({navigation}) => ({
        title: 'Neighborhood Watch',
      }),
    },
    Gestures: {
      screen: GestureScreen,
      navigationOptions: ({navigation}) => ({
        title: 'Gestures Control',
      }),
    },
    //TEST
    TestScreen: {
      screen: TestState,
      navigationOptions: ({navigation}) => ({
        title: 'Test',
        headerBackImage: (
          <Image
            source={require('../../assets/images/back.png')}
            style={{width: 25, height: 25}}
          />
        ),
        headerStyle: {
          height: 64,
          backgroundColor: 'white',
          borderBottomColor: 'transparent',
          elevation: 0,
        },

        headerRightContainerStyle: {
          alignItems: 'center',
          paddingRight: 16,
        },
      }),
    },
    Indoor: {
      screen: IndoorScreen,
      navigationOptions: ({navigation}) => ({
        title: 'Indoor Camera',
      }),
    },
    DoorLock: {
      screen: DoorLockScreen,
      navigationOptions: ({navigation}) => ({
        title: 'Smart Door Lock',
      }),
    },
    OtherControls: {
      screen: OtherControlsScreen,
      navigationOptions: ({navigation}) => ({
        title: 'Control Center',
      }),
    },
  },
  {
    initialRouteName: 'Home',
    transitionConfig: () => fromBottom(700),
    defaultNavigationOptions: {
      headerBackImage: (
        <Image
          source={require('../../assets/images/back.png')}
          style={{width: 25, height: 25}}
        />
      ),
      headerTitleStyle: {
        letterSpacing: 1,
        fontWeight: 'bold',
        fontFamily: 'Rubik-SemiBold',
        fontSize: theme.sizes.title,
      },

      headerStyle: {
        height: 64,
        backgroundColor: '#0ba8e6',
        borderBottomColor: 'transparent',
        elevation: 0,
      },
      // headerLeftContainerStyle: {
      //   alignContent: 'center',
      //   marginLeft: 32,
      //   paddingRight: 16,
      // },
      headerRightContainerStyle: {
        alignItems: 'center',
        paddingRight: 16,
      },
    },
  },
);

const SettingsNavigator = createStackNavigator({
  //All the screen from the Screen2 will be indexed here
  Second: {
    screen: SettingsScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Settings',
      headerLeft: <DrawerExample navigationProps={navigation} />,

      headerBackImage: (
        <Image
          source={require('../../assets/images/back.png')}
          style={{width: 25, height: 25}}
        />
      ),
      headerTitleStyle: {
        letterSpacing: 1,
        fontWeight: 'bold',
        fontFamily: 'Rubik-SemiBold',
        fontSize: 18,
      },

      headerStyle: {
        height: 64,
        backgroundColor: '#0ba8e6',
        borderBottomColor: 'transparent',
        elevation: 0,
      },
      // headerLeftContainerStyle: {
      //   alignContent: 'center',
      //   marginLeft: 32,
      //   paddingRight: 16,
      // },
      headerRightContainerStyle: {
        alignItems: 'center',
        paddingRight: 16,
      },

      //   headerStyle: {
      //     backgroundColor: '#FF9800',
      //   },
      //   headerTintColor: '#fff',
    }),
  },
});

const DrawerNavigatorExample = createDrawerNavigator(
  {
    //Drawer Optons and indexing
    HomeScreen: {
      //Title
      screen: MainStackNavigator,
      navigationOptions: {
        drawerLabel: 'Home',
        drawerIcon: <Icon name="home" />,
      },
    },
    SettingsScreen: {
      //Title
      screen: SettingsNavigator,
      navigationOptions: {
        drawerLabel: 'Settings',
        drawerIcon: <Icon name="settings" />,
      },
      // AboutScreen: {
      //   screen: AboutS
      // }
    },
  },
  {
    contentComponent: CustomDrawerComponent,
    contentOptions: {
      activeTintColor: 'red',
    },
    drawerPosition: 'left',
  },
);

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Intro: IntroStack,
      App: DrawerNavigatorExample,
    },
    {
      initialRouteName: 'Intro',
      backBehavior: 'history',
    },
  ),
);
export default AppContainer;
