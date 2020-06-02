import React from 'react';

// import {
//   createSwitchNavigator,
//   createStackNavigator,
//   createDrawerNavigator,
//   createAppContainer,
// } from 'react-navigation';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';

import HomeScreen from '../../src/screens/HomeScreen';
import GestureScreen from '../../src/screens/GestureScreen';
import NeighborhoodScreen from '../../src/screens/NeighborhoodScreen';
import NeighborhoodClassScreen from '../../src/screens/NeighborhoodClassScreen';
import TestState from '../../src/screens/TestState';
import DoorLockScreen from '../../src/screens/DoorLockScreen';
import SettingsScreen from '../../src/screens/SettingsScreen';
import OtherControlsScreen from '../../src/screens/OtherControlsScreen';

import {MenuButton, Logo} from '../components/HeaderTitle';
import {DrawerActions} from 'react-navigation-drawer';
import {Text} from '../components';

import {Icon} from 'native-base';

// import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  // Text,
} from 'react-native';

import {fromBottom} from 'react-navigation-transitions';
import TestIndoorScreen from '../screens/TestIndoorScreen';
// import {DrawerItems} from 'react-navigation-drawer';

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
            style={{width: 20, height: 24, marginLeft: 15}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  }
}

// Custom Drawer Example
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
        source={require('../../assets/images/smarthome.png')}
        style={{height: 120, width: 120, borderRadius: 60}}
      />
      {/* <Text style={{fontSize: 15, fontWeight: 'bold'}}> */}
      <Text spacing={0.4} transform="uppercase" bold>
        Smart Home Security System
      </Text>
    </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
);

// My old
// const MainStack = createStackNavigator(
//     {
//       Drawer: {
//         screen: Drawer,
//       },
//       Home: {
//         screen: HomeScreen,
//         navigationOptions: ({navigation}) => ({
//           // title: 'Home Screen',
//           headerLeft: (
//             <MenuButton onPress={() => navigation.navigate('DrawerToggle')} />
//           ),
//         }),
//       },
//       // Neighborhood: NeighborhoodScreen,
//       Neighborhood: {
//         screen: NeighborhoodClassScreen,
//       },
//       Gestures: GestureScreen,
//       Test: TestState,
//       DoorLock: DoorLockScreen,
//       //Loading: LoadingScreen
//     },

//     {
//       initialRouteName: 'Home',
//       defaultNavigationOptions: {
//         title: 'Smart Home Security System',
//         // headerLeft: <MenuButton onPress={() => navigation.openDrawer()} />,
//         headerBackTitle: 'Home',
//         headerLayoutPreset: 'center',
//         // headerTitle: () => <Logo />,

//         // headerStyle: {
//         //   backgroundColor: '#f4511e',
//         // },
//         // headerTintColor: '#fff',
//         // headerTitleStyle: {
//         //   fontWeight: 'bold',
//         // },
//       },
//     },
//   );

const MainStackNavigator = createStackNavigator(
  {
    //All the screen from the Screen1 will be indexed here
    First: {
      screen: HomeScreen,
      navigationOptions: ({navigation}) => ({
        // headerTitle: (
        //   <Text spacing={1} transform="uppercase" bold title>
        //     Smart Home Security System
        //   </Text>
        // ),
        title: 'Smart Home Security System',
        headerLeft: <DrawerExample navigationProps={navigation} />,
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
        // headerLeftContainerStyle: {
        //   alignContent: 'center',
        //   marginLeft: 32,
        //   paddingRight: 16,
        // },
        headerRightContainerStyle: {
          alignItems: 'center',
          paddingRight: 16,
        },
        // headerRight: <DrawerExample navigationProps={navigation} />,
      }),
    },
    TestIndoor: {
      screen: TestIndoorScreen,
      navigationOptions: ({navigation}) => ({
        title: 'Indoor',
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
    initialRouteName: 'First',
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
        fontSize: 18,
      },

      headerStyle: {
        height: 64,
        backgroundColor: 'white',
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
        backgroundColor: 'white',
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

const AppContainer = createAppContainer(DrawerNavigatorExample);
export default AppContainer;
