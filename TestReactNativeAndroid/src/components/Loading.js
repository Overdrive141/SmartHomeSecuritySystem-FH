import React from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {Block} from '../components';

const Loading = props => {
  return (
    <Block middle>
      <ActivityIndicator
        animating={props.state}
        size="large"
        style={styles.activityIndicator}
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
