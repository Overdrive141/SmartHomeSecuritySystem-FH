import {
  StyleSheet,
  View,
  ImageBackground,
  ToastAndroid,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated,
  RefreshControl,
} from 'react-native';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import React, {useState, useReducer, useEffect, Component} from 'react';

import {Toggle, Layout} from '@ui-kitten/components';
import firebase from 'react-native-firebase';
import LinearGradient from 'react-native-linear-gradient';

import Icon from 'react-native-vector-icons/FontAwesome';
import {Block, Badge, Card, Text, Loading} from '../components';
import {styles as blockStyles} from '../components/Block';
import {styles as cardStyles} from '../components/Card';
import {theme} from '../constants';

import lightOn from '../../assets/images/lightbulb.png';
import lightOff from '../../assets/images/light-off.png';
import fanOn from '../../assets/images/fan2.png';
import fanOff from '../../assets/images/fan-off.png';
import co2On from '../../assets/images/co2on.png';
import co2Off from '../../assets/images/co2off.png';

import {Easing} from 'react-native-reanimated';

import {Button} from '@ui-kitten/components';

class OtherControlsScreen extends Component {
  componentDidMount() {
    this.onScreenFocus();
    this.props.navigation.addListener('didFocus', this.onScreenFocus);
  }
  constructor(props) {
    super(props);

    this.state = {
      command: '',
      command2: '',

      isLoading: true,
      lightStatus: false,
      fanStatus: false,
      spinValue: new Animated.Value(0),
      co2Power: false,
      co2Owner: false,

      // Refresh Component
      refreshing: false,
    };
  }

  // RefreshControl Method
  onRefresh = () => {
    this.setState(
      {
        refreshing: true,
      },
      () => this.onScreenFocus(),
    );
  };

  onScreenFocus = () => {
    firebase
      .database()
      .ref('sensorstatus/command')
      .once('value')
      .then(snapshot => {
        this.setState({
          command: snapshot.val(),
          // isLoading: false,
          refreshing: false,
        });
        if (this.state.command.charAt(0) === '0') {
          this.setState(
            {
              lightStatus: false,
            },
            () => {
              console.log(this.state.isLoading);
              console.log(this.state.command);
            },
          );
        } else if (this.state.command.charAt(0) === '1') {
          this.setState({
            lightStatus: true,
          });
        }
        if (this.state.command.charAt(1) === '0') {
          this.setState({
            fanStatus: false,
          });
        } else if (this.state.command.charAt(1) === '1') {
          this.setState({
            fanStatus: true,
          });
        }
      })
      .catch(err => console.log(err));

    firebase
      .database()
      .ref('co2/command')
      .once('value')
      .then(snapshot => {
        this.setState({
          command2: snapshot.val(),
          isLoading: false,
        });
        if (this.state.command2.charAt(0) === '0') {
          this.setState(
            {
              co2Power: false,
            },
            () => {
              console.log(this.state.isLoading);
              console.log(this.state.command2);
            },
          );
        } else if (this.state.command2.charAt(0) === '1') {
          this.setState({
            co2Power: true,
          });
        }
        if (this.state.command2.charAt(1) === '0') {
          this.setState({
            co2Owner: false,
          });
        } else if (this.state.command2.charAt(1) === '1') {
          this.setState({
            co2Owner: true,
          });
        }
      })
      .catch(err => console.log(err));
  };

  setCharAt = (str, index, chr) => {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
  };

  onCheckedChange = sensor => {
    console.log(this.state);
    switch (sensor) {
      case 'light':
        if (this.state.command.charAt(0) === '0') {
          this.setState(
            {
              command: this.setCharAt(this.state.command, 0, '1'),
              lightStatus: true,
            },
            () => {
              firebase
                .database()
                .ref('sensorstatus/')
                .update({
                  command: this.state.command,
                });
            },
          );
        } else {
          this.setState(
            {
              command: this.setCharAt(this.state.command, 0, '0'),
              lightStatus: false,
            },
            () => {
              firebase
                .database()
                .ref('sensorstatus/')
                .update({
                  command: this.state.command,
                });
            },
          );
        }
        break;
      case 'fan':
        if (this.state.command.charAt(1) === '0') {
          this.setState(
            {
              command: this.setCharAt(this.state.command, 1, '1'),
              fanStatus: true,
            },
            () => {
              firebase
                .database()
                .ref('sensorstatus/')
                .update({
                  command: this.state.command,
                });
            },
          );
        } else {
          this.setState(
            {
              command: this.setCharAt(this.state.command, 1, '0'),
              fanStatus: false,
            },
            () => {
              firebase
                .database()
                .ref('sensorstatus/')
                .update({
                  command: this.state.command,
                });
            },
          );
        }
        break;
      case 'co2Power':
        if (this.state.command2.charAt(0) === '0') {
          this.setState(
            {
              command2: this.setCharAt(this.state.command2, 0, '1'),
              co2Power: true,
            },
            () => {
              firebase
                .database()
                .ref('co2/')
                .update({
                  command: this.state.command2,
                });
            },
          );
        } else {
          this.setState(
            {
              command2: this.setCharAt(this.state.command2, 0, '0'),
              co2Power: false,
            },
            () => {
              firebase
                .database()
                .ref('co2/')
                .update({
                  command: this.state.command2,
                });
            },
          );
        }
        break;
      case 'co2Owner':
        if (this.state.command2.charAt(1) === '0') {
          this.setState(
            {
              command2: this.setCharAt(this.state.command2, 1, '1'),
              co2Owner: true,
            },
            () => {
              firebase
                .database()
                .ref('co2/')
                .update({
                  command: this.state.command2,
                });
            },
          );
        } else {
          this.setState(
            {
              command2: this.setCharAt(this.state.command2, 1, '0'),
              co2Owner: false,
            },
            () => {
              firebase
                .database()
                .ref('co2/')
                .update({
                  command: this.state.command2,
                });
            },
          );
        }
        break;
    }
  };

  renderOtherControls() {
    // spinValue = new Animated.Value(0);
    Animated.timing(this.state.spinValue, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
    }).start();
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    const {navigation} = this.props;
    let lightStatusText = this.state.lightStatus ? 'On' : 'Off';
    let fanStatusText = this.state.fanStatus ? 'On' : 'Off';
    let lightSource = this.state.lightStatus ? lightOn : lightOff;
    let fanComponent = this.state.fanStatus ? (
      <Animated.Image style={{transform: [{rotate: spin}]}} source={fanOn} />
    ) : (
      <Image source={fanOff} />
    );

    return (
      <React.Fragment>
        <Block style={{marginBottom: theme.sizes.base}}>
          <Text spacing={0.4} transform="uppercase">
            Light and Fan Controls
          </Text>
        </Block>
        <Block
          style={{
            padding: theme.sizes.base,
          }}>
          <Card shadow style={styles.elevationCard}>
            <Block>
              <Block row>
                <Block center>
                  <Text spacing={0.7}>Living Room Light</Text>
                  <Block color="gray3" style={styles.vLine} />
                  <Block row>
                    <TouchableOpacity
                      onPress={() => {
                        this.onCheckedChange('light');
                      }}>
                      <Image source={lightSource} />
                      <Text
                        spacing={0.4}
                        transform="uppercase"
                        center
                        style={{marginTop: 10}}>
                        {lightStatusText}
                      </Text>
                    </TouchableOpacity>
                  </Block>
                </Block>

                <Block flex={false} color="gray3" style={styles.vLine} />

                <Block center>
                  <Text spacing={0.7}>Living Room Fan</Text>
                  <Block color="gray3" style={styles.vLine} />
                  <Block row>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          spinValue: new Animated.Value(0),
                        });
                        console.log(this.state);
                        this.onCheckedChange('fan');
                      }}>
                      {fanComponent}
                      <Text
                        spacing={0.4}
                        center
                        transform="uppercase"
                        style={{marginTop: 10}}>
                        {fanStatusText}
                      </Text>
                    </TouchableOpacity>
                  </Block>
                </Block>
              </Block>
            </Block>
          </Card>
        </Block>
      </React.Fragment>
    );
  }

  renderCo2Component() {
    let co2Source = this.state.co2Power ? co2On : co2Off;
    let co2StatusText = this.state.co2Power ? 'On' : 'Off';
    let co2OwnerHomeComponent = this.state.co2Owner ? (
      <Button
        appearance="outline"
        status="basic"
        size="small"
        textStyle={{
          letterSpacing: 1,
          fontSize: 10,
          textTransform: 'uppercase',
          fontFamily: 'Rubik-Regular',
        }}>
        Home
      </Button>
    ) : (
      <Button
        appearance="ghost"
        onPress={() => this.onCheckedChange('co2Owner')}
        status="basic"
        size="small"
        textStyle={{
          letterSpacing: 1,
          fontSize: 10,
          textTransform: 'uppercase',
          fontFamily: 'Rubik-Regular',
        }}>
        Home
      </Button>
    );
    let co2OwnerAwayComponent = this.state.co2Owner ? (
      <Button
        appearance="ghost"
        onPress={() => this.onCheckedChange('co2Owner')}
        status="basic"
        size="small"
        textStyle={{
          letterSpacing: 1,
          fontSize: 10,
          textTransform: 'uppercase',
          fontFamily: 'Rubik-Regular',
        }}>
        Away
      </Button>
    ) : (
      <Button
        appearance="outline"
        status="basic"
        size="small"
        textStyle={{
          letterSpacing: 1,
          fontSize: 10,
          textTransform: 'uppercase',
          fontFamily: 'Rubik-Regular',
        }}>
        Away
      </Button>
    );
    return (
      <Block>
        <Block style={{marginBottom: theme.sizes.base}}>
          <Text spacing={0.4} transform="uppercase">
            Carbon Dioxide Sensor
          </Text>
        </Block>
        <Block
          style={{
            padding: theme.sizes.base,
          }}>
          <LinearGradient
            end={{x: 1, y: 0}}
            style={[blockStyles.row, cardStyles.card, styles.elevationCard]}
            colors={['#FFFFFF', '#FFFFFF']}>
            <Block center flex={0.7} style={{marginLeft: 10}}>
              <TouchableOpacity
                onPress={() => {
                  this.onCheckedChange('co2Power');
                }}>
                <Image source={co2Source} />
                <Text
                  spacing={0.4}
                  center
                  transform="uppercase"
                  style={{marginTop: 5}}>
                  {co2StatusText}
                </Text>
              </TouchableOpacity>
            </Block>
            <Block middle flex={0.1} />
            <Block middle flex={false}>
              {co2OwnerHomeComponent}
            </Block>
            <Block middle flex={false}>
              {co2OwnerAwayComponent}
            </Block>
            <Block style={styles.vLine} flex={false} />
          </LinearGradient>
        </Block>
      </Block>
    );
  }

  render() {
    let loadingComponent;
    let controlsComponent;
    let co2Component;
    if (this.state.isLoading) {
      loadingComponent = (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Loading state={this.state.isLoading} />
        </View>
      );

      controlsComponent = null;
    } else {
      loadingComponent = null;
      controlsComponent = this.renderOtherControls();
      co2Component = this.renderCo2Component();
    }
    return (
      <React.Fragment>
        <ScrollView
          style={styles.welcome}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }>
          {loadingComponent}
          {controlsComponent}
          {co2Component}
        </ScrollView>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    paddingVertical: theme.sizes.padding,
    paddingHorizontal: theme.sizes.padding,
    backgroundColor: theme.colors.gray4,
    flex: 1,
  },
  // horizontal line
  hLine: {
    marginVertical: theme.sizes.base * 2,
    marginHorizontal: theme.sizes.base * 2,
    height: 1,
  },
  vLine: {
    marginVertical: theme.sizes.base / 2,
    width: 1,
  },
  elevationCard: {
    padding: theme.sizes.base,
    marginBottom: theme.sizes.padding,
    elevation: 6,
    // width: width / 2 - 24,
  },

  backgroundContainer: {
    padding: 8,
    // justifyContent: 'space-evenly',
    flexDirection: 'row',
    // flexWrap: 'wrap',
  },
  toggle: {
    margin: 8,
    // alignSelf: 'flex-start',
  },
  controlContainer: {
    borderRadius: 4,
    margin: 8,
    backgroundColor: '#3366FF',
  },
});

export default OtherControlsScreen;
