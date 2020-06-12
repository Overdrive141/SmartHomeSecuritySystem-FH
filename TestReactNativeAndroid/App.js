/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import thunk from 'redux-thunk';
import {MenuButton, Logo} from './src/components/HeaderTitle';

import {Provider, connect} from 'react-redux';
import store from './src/store';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'remote-redux-devtools';

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  ToastAndroid,
} from 'react-native';

import neighborhoodReducer from './src/reducers/neighborhoodReducer';

import Video from 'react-native-video';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
// import {Navigation} from 'react-native-navigation';

import HeaderTitle from './src/components/HeaderTitle';

import AppIntroSlider from 'react-native-app-intro-slider';

import {
  ApplicationProvider,
  Button,
  Icon,
  IconRegistry,
  Layout,
  Text,
} from '@ui-kitten/components';
import {mapping, light as theme} from '@eva-design/eva';

import firebase, {Notification, NotificationOpen} from 'react-native-firebase';

// import AnimatedSplash from 'react-native-animated-splash-screen';

// import AppContainer from './src/navigation/Screens';
import AppContainer from './src/navigation/DrawerExample';
// import {Block, GalioProvider} from 'galio-framework';
// import {Images, materialTheme} from './src/navigation/constants/index';

// const MainNavigator = createStackNavigator(
//   {
//     Home: {
//       screen: Drawer,
//       // navigationOptions: {
//       //   header: null,
//       // },
//     },
//   },
//   {headerMode: 'none'},
// );

// const Drawer = createDrawerNavigator({
//   Home: {
//     screen: MainStack,
//     navigationOptions: {
//       title: 'Home',
//       headerLeft: null,
//     },
//   },
// });

// const MainStack = createStackNavigator(
//   {
//     Home: {
//       screen: HomeScreen,
//       navigationOptions: ({navigation}) => ({
//         // title: 'Home Screen',
//         headerLeft: (
//           <MenuButton
//             onPress={() =>
//               ToastAndroid.show('Under Construction', ToastAndroid.BOTTOM)
//             }
//           />
//         ),
//       }),
//     },
//     // Neighborhood: NeighborhoodScreen,
//     Neighborhood: {
//       screen: NeighborhoodClassScreen,
//     },
//     Gestures: GestureScreen,
//     Test: TestState,
//     DoorLock: DoorLockScreen,
//     //Loading: LoadingScreen
//   },

//   {
//     initialRouteName: 'Home',
//     defaultNavigationOptions: {
//       title: 'Smart Home Security System',
//       // headerLeft: <MenuButton onPress={() => navigation.openDrawer()} />,
//       headerBackTitle: 'Home',
//       headerLayoutPreset: 'center',
//       // headerTitle: () => <Logo />,

//       // headerStyle: {
//       //   backgroundColor: '#f4511e',
//       // },
//       // headerTintColor: '#fff',
//       // headerTitleStyle: {
//       //   fontWeight: 'bold',
//       // },
//     },
//   },
// );

// let Navigation = createAppContainer(MainStack);
// const middleware = [thunk];
// const store = createStore(
//   neighborhoodReducer,
//   composeWithDevTools(applyMiddleware(...middleware)),
// );

/**
 * OLD WAY
 */
// export default class App extends React.Component {
//   render() {
//     return (
//       <ApplicationProvider mapping={mapping} theme={theme}>
//         <AppContainer />
//       </ApplicationProvider>

//     );
//   }
// }

const App = () => {
  return (
    // <AnimatedSplash
    //   isLoaded={this.state.isLoaded}
    //   logoImage={require('./assets/images/logo.png')}
    //   backgroundColor={'#262626'}
    //   logoHeight={150}
    <ApplicationProvider mapping={mapping} theme={theme}>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </ApplicationProvider>
    // </AnimatedSplash>
  );
};
export default App;

// createAppContainer(MainStack)
