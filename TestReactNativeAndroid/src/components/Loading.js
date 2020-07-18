import React from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {Block} from '../components';
import AnimatedLoader from 'react-native-animated-loader';
import {theme} from '../constants';

const Loading = props => {
  return (
    <Block middle>
      {/* <ActivityIndicator
        animating={props.state}
        size="large"
        style={styles.activityIndicator}
      /> */}
      <AnimatedLoader
        speed={2}
        source={require('../../assets/animations/smart-home-loading.json')}
        visible={props.state}
        animationStyle={{width: 100, height: 100}}
        overlayColor={theme.colors.gray4}
      />
    </Block>
  );
};

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
});

export default Loading;
