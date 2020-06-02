import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Button,
  Alert,
  Navigator,
  Switch,
  Modal,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import ProgressBar from 'react-native-progress/Bar';
import Icon from 'react-native-vector-icons/FontAwesome';

import ToggleSwitch from 'toggle-switch-react-native';
import SwitchToggle from '@dooboo-ui/native-switch-toggle';

import React, {useState, useReducer, useEffect, force} from 'react';
import bgImage from '../../assets/images/bg3.jpg';
import Video from 'react-native-video';
// import VideoPlayer from 'react-native-video-controls';
import VideoPlayer from '../components/VideoPlayer';

import useAxios from 'axios-hooks';

function updateData() {
  executePut({
    data: {
      ...putData,
    },
  });
}

// const reducer = (state, action) => {
//   // state === { loading: true, false}
//   switch (action.type) {
//     case GET_STREAM:
//       return {
//         ...state,
//         loading: false,
//       };
//     default:
//       return state;
//   }
// };

const NeighborhoodScreen = () => {
  const [{data, loading, error}, refetch] = useAxios(
    {
      url: '/cameraonly',
      method: 'GET',
    },
    {manual: true},
  );
  if (data) console.log(data);
  if (loading) console.log('loading');
  if (error) console.log(error);

  const [spinner, setSpinner] = useState(true);
  // const [error, setError] = useState(false);
  const [modalVisible, setModal] = useState(false);

  // const [state, dispatch] = useReducer(reducer, {loading: true});

  return (
    <ImageBackground source={bgImage} style={styles.backgroundContainer}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          marginTop: 10,
        }}>
        <Text
          style={{
            marginHorizontal: 10,
            color: 'white',
            color: 'white',
            fontWeight: '900',
            justifyContent: 'flex-start',
          }}>
          Neighborhood Watch Live Stream
        </Text>
        <SwitchToggle
          containerStyle={{
            marginTop: 0,
            width: 45,
            height: 20,
            borderRadius: 30,
            padding: 0,
          }}
          backgroundColorOn="green"
          backgroundColorOff="grey"
          backTextRight=""
          circleStyle={{
            width: 20,
            height: 20,
            borderRadius: 27.5,
            backgroundColor: 'black', // rgb(102,134,205)
          }}
          switchOn={loading}
          onPress={() => {
            setSpinner(true);
          }}
          circleColorOff="white"
          circleColorOn="white"
          duration={500}
        />
      </View>

      <View style={styles.videoContainer}>
        lable={true}
        /> */}
        <VideoPlayer
          videoStyle={styles.video}
          style={styles.videoContainer}
          source={{
            uri: 'http://192.168.200.31:8160',
          }}
          resizeMode="contain"
          navigator={navigator}
          disableFullscreen
          disableSeekbar
          disableVolume
          disableBack
          disableTimer
          poster="https://baconmockup.com/300/200/"
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
  videoContainer: {
    height: '33%',
    width: '100%',

    top: 20,
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
  },
});

export default NeighborhoodScreen;
