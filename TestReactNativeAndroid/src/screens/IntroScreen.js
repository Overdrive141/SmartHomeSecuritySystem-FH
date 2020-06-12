import React, {Component} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-community/async-storage';
import {theme} from '../constants';

class IntroScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      showMainApp: true,
      isLoading: true,
    };
  }

  componentDidMount() {
    try {
      AsyncStorage.getItem('showMainApp').then(data => {
        if (data === 'true') {
          this.setState({
            showMainApp: true,
            isLoading: false,
          });
        } else {
          this.setState({
            showMainApp: false,
            isLoading: false,
          });
        }
      });
    } catch (err) {
      ToastAndroid.show(
        'Failed to load introduction state' + err,
        ToastAndroid.LONG,
      );
    }
  }

  _onDone = () => {
    // this.setState({show_Main_App: true});
    AsyncStorage.setItem('showMainApp', 'true');
    this.props.navigation.navigate('App');
  };
  _onSkip = () => {
    AsyncStorage.setItem('showMainApp', 'true');
    this.props.navigation.navigate('App');
  };

  _renderItem = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 100,
        }}>
        <Text style={styles.title}>{item.title}</Text>
        <Image style={styles.image} source={item.image} />
        <Text style={styles.text}>
          {item.text} {item.quote}
        </Text>
        {/* <Text style={styles.quote}>{item.quote}</Text> */}
      </View>
    );
  };

  render() {
    //If false show the Intro Slides
    if (this.state.isLoading === true) {
      return (
        <ActivityIndicator
          animating={this.state.showMainApp}
          size="large"
          style={styles.activityIndicator}
        />
      );
    } else {
      // TODO: Change false to true in production
      if (this.state.showMainApp === true) {
        this.props.navigation.navigate('App');
        return null;
      } else {
        //Intro slides
        return (
          <AppIntroSlider
            data={slides}
            renderItem={this._renderItem}
            onDone={this._onDone}
            showSkipButton={true}
            onSkip={this._onSkip}
          />
        );
      }
    }
  }
}
const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 17,
    color: 'white',
    textAlign: 'center',
    padding: theme.sizes.padding,
  },
  quote: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
});

const slides = [
  {
    key: 's1',
    text: 'Unlock your door in multiple ways ',
    title: 'Smart Door Lock',
    image: require('../../assets/images/smart-lock-white.png'),
    backgroundColor: '#20d2bb',
  },
  {
    key: 's2',
    title: 'Control your Lights and Fans',
    text: 'Turn on the lights from the comfort of your phone',
    image: require('../../assets/images/light-white.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 's3',
    title: 'Neighborhood Watch',
    text:
      'Using AI algorithms, we can let you know when someone suspicious is at your door if you turn on Neighborhood Watch',
    image: require('../../assets/images/cctv.png'),
    backgroundColor: '#22bcb5',
  },
  {
    key: 's4',
    title: 'Indoor Security',
    text:
      'You will be notified and shown a livestream inside the house, if someone breaks into your house while you are away',
    image: require('../../assets/images/indoor-camera.png'),
    backgroundColor: '#B60F46',
  },
  {
    key: 's5',
    title: 'Smart Routine',
    text:
      'Your lights and fans will be turned on in advance as per your normal schedule',
    image: require('../../assets/images/time.png'),
    backgroundColor: '#0ba8e6',
  },
  {
    key: 's6',
    title: 'Google Assistant Integration',
    text:
      'Your lights and fans are also controllable using Google Assistant. Just say something like: \n\n',
    quote: "'Ok Google, Ask Smart Home Assistant to turn on lights' ",
    image: require('../../assets/images/google.png'),
    backgroundColor: '#0CCDA3',
  },
];

export default IntroScreen;
