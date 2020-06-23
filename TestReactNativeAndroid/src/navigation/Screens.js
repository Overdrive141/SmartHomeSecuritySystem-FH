import React from 'react';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';

import HomeScreen from '../../src/screens/HomeScreen';
import GestureScreen from '../../src/screens/GestureScreen';
import NeighborhoodClassScreen from '../../src/screens/NeighborhoodClassScreen';
import TestState from '../../src/screens/TestState';
import DoorLockScreen from '../../src/screens/DoorLockScreen';

import {MenuButton, Logo} from '../components/HeaderTitle';
import {DrawerActions} from 'react-navigation-drawer';
import {TouchableOpacity} from 'react-native-gesture-handler';

// import Menu from './Menu';
// import Header from './components/Header';
// import {Drawer} from '../components/';

// const transitionConfig = (transitionProps, prevTransitionProps) => ({
//   transitionSpec: {
//     duration: 400,
//     easing: Easing.out(Easing.poly(4)),
//     timing: Animated.timing,
//   },
//   screenInterpolator: sceneProps => {
//     const {layout, position, scene} = sceneProps;
//     const thisSceneIndex = scene.index;
//     const width = layout.initWidth;

//     const scale = position.interpolate({
//       inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
//       outputRange: [4, 1, 1],
//     });
//     const opacity = position.interpolate({
//       inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
//       outputRange: [0, 1, 1],
//     });
//     const translateX = position.interpolate({
//       inputRange: [thisSceneIndex - 1, thisSceneIndex],
//       outputRange: [width, 0],
//     });

//     const scaleWithOpacity = {opacity};
//     const screenName = 'Search';

//     if (
//       screenName === transitionProps.scene.route.routeName ||
//       (prevTransitionProps &&
//         screenName === prevTransitionProps.scene.route.routeName)
//     ) {
//       return scaleWithOpacity;
//     }
//     return {transform: [{translateX}]};
//   },
// });

// const AppStack = createDrawerNavigator(
//   {
//     DoorLock: {
//       screen: DoorLockScreen,
//       navigationOptions: {
//         drawerLabel: () => {},
//       },
//     },
//     Gestures: {
//       screen: GestureScreen,
//       navigationOptions: navOpt => ({
//         drawerLabel: ({focused}) => (
//           <Drawer focused={focused} screen="Gestures" title="Gesture Control" />
//         ),
//       }),
//     },
//   },
//   Menu,
// );

const Drawer = createDrawerNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      drawerLabel: 'Home',
    },
  },
  Gestures: {
    screen: GestureScreen,
    navigationOptions: {
      drawerLabel: 'Gestures',
    },
  },
});

const MainStack = createStackNavigator(
  {
    Drawer: {
      screen: Drawer,
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: ({navigation}) => ({
        // title: 'Home Screen',
        headerLeft: (
          <MenuButton onPress={() => navigation.navigate('DrawerToggle')} />
        ),
      }),
    },
    Neighborhood: {
      screen: NeighborhoodClassScreen,
    },
    Gestures: GestureScreen,
    Test: TestState,
    DoorLock: DoorLockScreen,
    //Loading: LoadingScreen
  },

  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: 'Smart Home Security System',
      // headerLeft: <MenuButton onPress={() => navigation.openDrawer()} />,
      headerBackTitle: 'Home',
      headerLayoutPreset: 'center',
      // headerTitle: () => <Logo />,

      // headerStyle: {
      //   backgroundColor: '#f4511e',
      // },
      // headerTintColor: '#fff',
      // headerTitleStyle: {
      //   fontWeight: 'bold',
      // },
    },
  },
);

const AppContainer = createAppContainer(MainStack);
export default AppContainer;
