import {
  StyleSheet,
  // Text,
  View,
  ImageBackground,
  ToastAndroid,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from 'react-native';
import firebase from 'react-native-firebase';

import {Button} from '@ui-kitten/components';

import LinearGradient from 'react-native-linear-gradient';
import rgba from 'hex-to-rgba';

import SwitchToggle from '@dooboo-ui/native-switch-toggle';

import React, {useState, useReducer, useEffect, Component} from 'react';
import bgImage from '../../assets/images/bg3.jpg';
import fan from '../../assets/images/fan.png';
import AwesomeButton from 'react-native-really-awesome-button';

import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';

// import * as Icon from 'react-native-vector-icons';

import {Block, Badge, Card, Text} from '../components';
import {styles as blockStyles} from '../components/Block';
import {styles as cardStyles} from '../components/Card';
import {theme} from '../constants';

import {
  Overlay,
  Button as Button2,
  Badge as Badge2,
} from 'react-native-elements';

import lightOn from '../../assets/images/lightbulb.png';
import lightOff from '../../assets/images/light-off.png';
import fanOn from '../../assets/images/fan2.png';
import fanOff from '../../assets/images/fan-off.png';

import {Toggle} from '@ui-kitten/components';
import {Easing} from 'react-native-reanimated';

const {width} = Dimensions.get('window');
console.disableYellowBox = true;
class TestState extends Component {
  // static navigationOptions = {
  //   headerTitle: <Text style={theme.fonts.title}>Smart Door Lock</Text>,
  //   // headerRight: (
  //   //   <TouchableOpacity>
  //   //     <Block flex={false}>
  //   //       <Image
  //   //         resizeMode="contain"
  //   //         source={require('../../assets/images/Menu.png')}
  //   //         style={{width: 20, height: 24}}
  //   //       />
  //   //       {/* <Badge
  //   //         size={13}
  //   //         color={theme.colors.accent}
  //   //         style={{position: 'absolute', top: -4, right: -4}}
  //   //       /> */}
  //   //     </Block>
  //   //   </TouchableOpacity>
  //   // ),
  // };

  componentDidMount() {
    // this.props.getPatternStamp();
    this.onScreenFocus();
    this.props.navigation.addListener('didFocus', this.onScreenFocus);
  }
  constructor(props) {
    super(props);
    this.state = {
      command: '',
      isDoorLocked: true,
      doorButtonText: 'Tap to Unlock',
      lockState: 'lock',
      lockBorderColor: 'red',
      doorStatusText: 'Locked',
      lockIconColor: 'white',
      lockBackgroundColor: 'red',
      // doorButtonTextColor: theme.colors.gray2,
      isLoading: true,
      lightStatus: false,
      fanStatus: false,
      spinValue: new Animated.Value(0),
      // Gesture
      gesture1: '',
      gesture2: '',
      gesture3: '',
      gesture4: '',
      isVisibleSetOverlay: false,
    };
    this.onPress = this.onPress.bind(this);
  }

  onScreenFocus = () => {
    console.log(this.state);
    this.fetchGestures();
    firebase
      .database()
      .ref('sensorstatus/command')
      .once('value')
      .then(snapshot => {
        this.setState(
          {
            command: snapshot.val(),
            isLoading: false,
          },
          () => {
            console.log(this.state);
            if (this.state.command.charAt(2) === '0') {
              this.setState({
                isDoorLocked: false,
                doorButtonText: 'Tap to Lock',
                doorStatusText: 'Unlocked',
                lockIconColor: '#A4C639',
                lockBackgroundColor: 'white',
                // doorButtonTextColor: theme.colors.gray2,
                lockState: 'unlock',
                lockBorderColor: '#A4C639',
              });
            } else if (this.state.command.charAt(2) === '1') {
              this.setState({
                isDoorLocked: true,
                doorButtonText: 'Tap to Unlock',
                doorStatusText: 'Locked',
                lockIconColor: 'white',
                lockBackgroundColor: 'red',
                // doorButtonTextColor: theme.colors.gray2,
                lockState: 'lock',
                lockBorderColor: 'red',
              });
            }
            console.log(this.state);
          },
        );
      });
  };
  setCharAt = (str, index, chr) => {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
  };

  // Gesture Methods
  // Fetch Old Gestures (Saved)
  // TODO: REMOVE "" FROM FETCHED DATA AS IT IS NOT RECOGNIZED
  // TODO: ADD IT TO OVERLAY WITH DISABLED BUTTONS TO SHOW THE CURRENTLY SET GESTURE
  fetchGestures() {
    const ref1 = firebase.database().ref('gestures/gesture1/');
    const ref2 = firebase.database().ref('gestures/gesture2/');
    const ref3 = firebase.database().ref('gestures/gesture3/');
    const ref4 = firebase.database().ref('gestures/gesture4/');

    ref1
      .once('value')
      .then(snapshot => {
        this.setState({
          gesture1: snapshot.val(),
        });
      })
      .catch(err => console.log(err));

    ref2
      .once('value')
      .then(snapshot => {
        this.setState({
          gesture2: snapshot.val(),
        });
      })
      .catch(err => console.log(err));
    ref3
      .once('value')
      .then(snapshot => {
        this.setState({
          gesture3: snapshot.val(),
        });
      })
      .catch(err => console.log(err));
    ref4
      .once('value')
      .then(snapshot => {
        this.setState({
          gesture4: snapshot.val(),
        });
      })
      .catch(err => console.log(err));
  }

  // Save New Gestures
  saveGestures() {
    if (
      this.state.gesture1.length == 0 &&
      this.state.gesture2.length == 0 &&
      this.state.gesture3.length == 0 &&
      this.state.gesture4.length == 0
    ) {
      alert('No Gestures Set');
    } else {
      firebase
        .database()
        .ref('/gestures/')
        .set(
          {
            command:
              this.state.gesture1 +
              this.state.gesture2 +
              this.state.gesture3 +
              this.state.gesture4,
            gesture1: this.state.gesture1,
            gesture2: this.state.gesture2,
            gesture3: this.state.gesture3,
            gesture4: this.state.gesture4,
            created_at: Date.now(),
          },
          alert('Gesture Saved'),
        )
        .then(res => {
          console.log(res);
          this.setState({
            gesture1: '',
            gesture2: '',
            gesture3: '',
            gesture4: '',
            isVisibleSetOverlay: false,
          });
          this.fetchGestures();
        });
    }
  }

  storeGesture(e) {
    if (
      this.state.gesture1.length == 0 &&
      this.state.gesture2.length == 0 &&
      this.state.gesture3.length == 0 &&
      this.state.gesture4.length == 0
    ) {
      this.setState({
        gesture1: e,
      });
    } else if (
      this.state.gesture1.length > 0 &&
      this.state.gesture2.length == 0 &&
      this.state.gesture3.length == 0 &&
      this.state.gesture4.length == 0
    ) {
      this.setState({
        gesture2: e,
      });
    } else if (
      this.state.gesture1.length > 0 &&
      this.state.gesture2.length > 0 &&
      this.state.gesture3.length == 0 &&
      this.state.gesture4.length == 0
    ) {
      this.setState({
        gesture3: e,
      });
    } else if (
      this.state.gesture1.length > 0 &&
      this.state.gesture2.length > 0 &&
      this.state.gesture3.length > 0 &&
      this.state.gesture4.length == 0
    ) {
      this.setState({
        gesture4: e,
      });
    }
  }

  onPress(txt) {
    console.log(txt);
    this.storeGesture(txt);
  }

  assignCondition(e) {
    if (
      this.state.gesture1.length === 0 &&
      this.state.gesture2.length === 0 &&
      this.state.gesture3.length === 0 &&
      this.state.gesture4.length === 0
    ) {
      return null;
    } else if (
      this.state.gesture1 === e &&
      this.state.gesture2 !== e &&
      this.state.gesture3 !== e &&
      this.state.gesture4 !== e
    ) {
      return '1';
    } else if (
      this.state.gesture1 === e &&
      this.state.gesture2 === e &&
      this.state.gesture3 !== e &&
      this.state.gesture4 !== e
    ) {
      return '1,2';
    } else if (
      this.state.gesture1 !== e &&
      this.state.gesture2 === e &&
      this.state.gesture3 !== e &&
      this.state.gesture4 !== e
    ) {
      return '2';
    } else if (
      this.state.gesture1 !== e &&
      this.state.gesture2 === e &&
      this.state.gesture3 === e &&
      this.state.gesture4 !== e
    ) {
      return '2,3';
    } else if (
      this.state.gesture1 !== e &&
      this.state.gesture2 === e &&
      this.state.gesture3 === e &&
      this.state.gesture4 === e
    ) {
      return '2,3,4';
    } else if (
      this.state.gesture1 === e &&
      this.state.gesture2 !== e &&
      this.state.gesture3 !== e &&
      this.state.gesture4 === e
    ) {
      return '1,4';
    } else if (
      this.state.gesture1 === e &&
      this.state.gesture2 !== e &&
      this.state.gesture3 === e &&
      this.state.gesture4 !== e
    ) {
      return '1,3';
    } else if (
      this.state.gesture1 === e &&
      this.state.gesture2 !== e &&
      this.state.gesture3 === e &&
      this.state.gesture4 === e
    ) {
      return '1,3,4';
    } else if (
      this.state.gesture1 !== e &&
      this.state.gesture2 === e &&
      this.state.gesture3 !== e &&
      this.state.gesture4 === e
    ) {
      return '2,4';
    } else if (
      this.state.gesture1 === e &&
      this.state.gesture2 === e &&
      this.state.gesture3 === e &&
      this.state.gesture4 !== e
    ) {
      return '1,2,3';
    } else if (
      this.state.gesture1 !== e &&
      this.state.gesture2 !== e &&
      this.state.gesture3 === e &&
      this.state.gesture4 !== e
    ) {
      return '3';
    } else if (
      this.state.gesture1 !== e &&
      this.state.gesture2 !== e &&
      this.state.gesture3 === e &&
      this.state.gesture4 === e
    ) {
      return '3,4';
    } else if (
      this.state.gesture1 === e &&
      this.state.gesture2 === e &&
      this.state.gesture3 === e &&
      this.state.gesture4 === e
    ) {
      return '1,2,3,4';
    } else if (
      this.state.gesture1 !== e &&
      this.state.gesture2 !== e &&
      this.state.gesture3 !== e &&
      this.state.gesture4 === e
    ) {
      return '4';
    } else if (
      this.state.gesture1 === e &&
      this.state.gesture2 === e &&
      this.state.gesture3 !== e &&
      this.state.gesture4 === e
    ) {
      return '1,2,4';
    }
  }

  // Set Number based on Gesture Selected. Now it works for 1,2,3,4
  // TODO: Add Conditions for if any (Not e)
  setNumber(e) {
    switch (e) {
      case '^':
        return this.assignCondition(e);
      case 'v':
        return this.assignCondition(e);
      case '>':
        return this.assignCondition(e);
      case '<':
        return this.assignCondition(e);
    }
  }

  renderTrip = trip => {
    return (
      <Card shadow key={`trip-${trip.id}`}>
        <Block row space="between" style={{marginBottom: theme.sizes.base}}>
          <Text spacing={0.5} caption>
            {trip.date}
          </Text>
          <Text spacing={0.5} caption medium primary>
            {trip.score}
          </Text>
          <Text spacing={0.5} caption>
            {trip.distance}
          </Text>
        </Block>
        <Block row center>
          <Badge
            color={rgba(theme.colors.accent, '0.2')}
            size={14}
            style={{marginRight: 8}}>
            <Badge color={theme.colors.accent} size={8} />
          </Badge>
          <Text spacing={0.5} color="gray">
            {trip.from}
          </Text>
        </Block>

        <Block row center style={{paddingVertical: 4}}>
          <Badge color="gray2" size={4} style={{marginLeft: 4.5}} />
        </Block>

        <Block row center>
          <Badge
            color={rgba(theme.colors.primary, '0.2')}
            size={14}
            style={{marginRight: 8}}>
            <Badge color={theme.colors.primary} size={8} />
          </Badge>
          <Text spacing={0.5} color="gray">
            {trip.to}
          </Text>
        </Block>
      </Card>
    );
  };

  renderTrips() {
    return (
      <React.Fragment>
        <Block style={{marginBottom: theme.sizes.base}}>
          <Text spacing={0.4} transform="uppercase">
            Door Lock
          </Text>
        </Block>
      </React.Fragment>
    );
  }

  renderGestureText() {
    return (
      <React.Fragment>
        <Block style={{marginBottom: theme.sizes.base}}>
          <Text spacing={0.4} transform="uppercase">
            Gestures
          </Text>
        </Block>
      </React.Fragment>
    );
  }

  renderGestureSensor() {
    const AddIcon = () => (
      <Icon name="plus" size={12} color={theme.colors.primary} />
    );
    return (
      <Card shadow>
        {/* <Button2
          title="Set Gesture"
          onPress={() =>
            this.setState({
              isVisibleSetOverlay: true,
              gesture1: '',
              gesture2: '',
              gesture3: '',
              gesture3: '',
              gesture4: '',
            })
          }>
          Set Gesture
        </Button2>
        <Button2 title="Fetch Gesture" onPress={() => this.fetchGestures()}>
          Fetch Gesture
        </Button2> */}
        <Block>
          <Block row>
            <Block left>
              <Text spacing={0.4} bold>
                Current Gesture Set
              </Text>
            </Block>

            <Block center>
              <Button
                icon={AddIcon}
                appearance="outline"
                status="primary"
                size="tiny"
                textStyle={{
                  letterSpacing: 0.3,
                  textTransform: 'uppercase',
                  fontFamily: 'Rubik-Regular',
                }}
                onPress={() =>
                  this.setState({
                    isVisibleSetOverlay: true,
                    gesture1: '',
                    gesture2: '',
                    gesture3: '',
                    gesture3: '',
                    gesture4: '',
                  })
                }>
                Set New Gesture
              </Button>
            </Block>
          </Block>
          <Block flex={false} style={styles.vLine} />
          <Block
            style={{
              alignSelf: 'center',
            }}>
            <Button2
              icon={<Icon name="arrow-up" size={30} color="white" />}
              onPress={() => this.onPress('^')}
              disabled={true}
            />
            <Badge2
              value={this.setNumber('^')}
              status="error"
              containerStyle={{position: 'absolute', top: -4, right: -4}}
            />
          </Block>
          <Block
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 0,
              marginTop: 0,
            }}>
            <Block middle flex={false} style={{marginLeft: 95}}>
              <Button2
                icon={<Icon name="arrow-left" size={30} color="white" />}
                onPress={() => this.onPress('<')}
                disabled={true}
              />
              <Badge2
                value={this.setNumber('<')}
                status="error"
                containerStyle={{position: 'absolute', top: -4, right: -4}}
              />
            </Block>

            <Block middle flex={false} style={{marginRight: 95}}>
              <Button2
                icon={<Icon name="arrow-right" size={30} color="white" />}
                onPress={() => this.onPress('>')}
                disabled={true}
              />
              <Badge2
                value={this.setNumber('>')}
                status="error"
                containerStyle={{position: 'absolute', top: -4, right: -4}}
              />
            </Block>
          </Block>
          <Block
            style={{
              alignSelf: 'center',

              marginTop: 0,
              marginBottom: 10,
            }}>
            <Button2
              icon={<Icon name="arrow-down" size={30} color="white" />}
              onPress={() => this.onPress('v')}
              disabled={true}
            />
            <Badge2
              value={this.setNumber('v')}
              status="error"
              containerStyle={{position: 'absolute', top: -4, right: -4}}
            />
          </Block>
        </Block>
        {/* OVERLAY Set Gesture*/}
        <Overlay
          isVisible={this.state.isVisibleSetOverlay}
          onBackdropPress={() => {
            this.setState({isVisibleSetOverlay: false});
            this.fetchGestures();
          }}
          windowBackgroundColor="rgba(255, 255, 255, .5)"
          width="auto"
          height="auto">
          <View>
            <View
              style={{
                alignSelf: 'center',
              }}>
              <Button2
                icon={
                  <Icon
                    name="arrow-up"
                    size={30}
                    color={theme.colors.primary}
                  />
                }
                onPress={() => this.onPress('^')}
                type="outline"
              />
              <Badge2
                value={this.setNumber('^')}
                status="error"
                containerStyle={{position: 'absolute', top: -4, right: -4}}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 0,
                marginTop: 0,
              }}>
              <View>
                <Button2
                  icon={
                    <Icon
                      name="arrow-left"
                      size={30}
                      color={theme.colors.primary}
                    />
                  }
                  onPress={() => this.onPress('<')}
                  type="outline"
                />
                <Badge2
                  value={this.setNumber('<')}
                  status="error"
                  containerStyle={{position: 'absolute', top: -4, right: -4}}
                />
              </View>

              <View
                style={{
                  marginLeft: 50,
                }}>
                <Button2
                  icon={
                    <Icon
                      name="arrow-right"
                      size={30}
                      color={theme.colors.primary}
                    />
                  }
                  onPress={() => this.onPress('>')}
                  type="outline"
                />
                <Badge2
                  value={this.setNumber('>')}
                  status="error"
                  containerStyle={{position: 'absolute', top: -4, right: -4}}
                />
              </View>
            </View>
            <View
              style={{
                alignSelf: 'center',

                marginTop: 0,
                marginBottom: 10,
              }}>
              <Button2
                icon={
                  <Icon
                    name="arrow-down"
                    size={30}
                    color={theme.colors.primary}
                  />
                }
                onPress={() => this.onPress('v')}
                type="outline"
              />
              <Badge2
                value={this.setNumber('v')}
                status="error"
                containerStyle={{position: 'absolute', top: -4, right: -4}}
              />
            </View>
            {/* <Button
              type="outline"
              title="Save Gesture"
              onPress={() => this.saveGestures()}
            /> */}
            <Button
              // appearance="outline"

              status="primary"
              size="small"
              textStyle={{
                letterSpacing: 0.3,
                textTransform: 'uppercase',
                fontFamily: 'Rubik-Regular',
              }}
              onPress={() => this.saveGestures()}>
              Save New Gesture
            </Button>
          </View>
        </Overlay>
      </Card>
    );
  }

  renderDoorLock() {
    let loadingComponent;
    let controlComponent;

    if (this.state.isLoading) {
      loadingComponent = (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator
            animating={this.state.isLoading}
            size="large"
            style={styles.activityIndicator}
          />
        </View>
      );
      // }
      //    )
      controlComponent = null;
    } else {
      loadingComponent = null;

      controlComponent = (
        <Block center style={{marginBottom: theme.sizes.base}}>
          {/* <Toggle
            text="Fan"
            //   status="control"
            checked={this.state.isDoorLocked}
            onChange={() => this.onCheckedChange(!this.state.isDoorLocked)}
            // style={styles.toggle}
          /> */}
          <AwesomeButton
            raiseLevel={1}
            borderColor={this.state.lockBorderColor}
            borderWidth={30}
            textColor="#FFFF22"
            backgroundColor={this.state.lockBackgroundColor}
            borderRadius={150}
            height={250}
            width={250}
            activeOpacity={0}
            progress
            onPress={next => {
              const currentHour = new Date().getHours();
              const currentMinutes = new Date().getMinutes() / 60;
              const currentMonth = new Date().getMonth() + 1;
              const currentDate = new Date().getDate();
              const currentYear = new Date().getFullYear();
              const fullDate =
                currentMonth + '-' + currentDate + '-' + currentYear;
              const stringTime = (currentHour + currentMinutes).toFixed(3);
              const floatTime = parseFloat(stringTime);
              // When isDoorLocked =  true then 1 and
              // when isDoorLocked = False then 0 (Unlocked)
              if (!this.state.isDoorLocked) {
                var sessionsRef = firebase.database().ref('patterntimestamps/');
                sessionsRef.update({
                  [fullDate]: floatTime,
                });
                this.setState(
                  {
                    isDoorLocked: true,
                    doorButtonText: 'Tap to Unlock',
                    doorStatusText: 'Locked',
                    lockIconColor: 'white',
                    lockBackgroundColor: 'red',
                    // doorButtonTextColor: theme.colors.gray2,
                    lockState: 'lock',
                    lockBorderColor: 'red',
                    command: this.setCharAt(this.state.command, 2, '1'),
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

                // firebase
                //   .database()
                //   .ref('sensorstatus/')
                //   .update({
                //     command: this.state.command,
                //   });
              } else {
                this.setState(
                  {
                    isDoorLocked: false,
                    doorButtonText: 'Tap to Lock',
                    doorStatusText: 'Unlocked',
                    lockState: 'unlock',
                    lockIconColor: '#A4C639',
                    lockBackgroundColor: 'white',
                    // doorButtonTextColor: theme.colors.gray2,
                    lockBorderColor: '#A4C639',
                    command: this.setCharAt(this.state.command, 2, '0'),
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
                // firebase
                //   .database()
                //   .ref('sensorstatus/')
                //   .update({
                //     command: this.state.command,
                //   });
              }
              // console.log(this.props);
              console.log(this.state);
              next();
            }}
            // ExtraContent={<Icon5 name="circle" size={2} color="red" />}
          >
            <View>
              <Icon
                name={this.state.lockState}
                size={80}
                color={this.state.lockIconColor}
                style={{textAlign: 'center'}}
              />

              <Text
                spacing={0.4}
                transform="uppercase"
                bold
                // {...this.state.doorButtonTextColor}
                color={this.state.lockIconColor}>
                {this.state.doorButtonText}
              </Text>
            </View>
          </AwesomeButton>
          <Text spacing={0.4} transform="uppercase" style={{marginTop: 10}}>
            {this.state.doorStatusText}
          </Text>
        </Block>
      );
    }
    return (
      <React.Fragment>
        <Card shadow>
          {/* <LinearGradient
          end={{x: 1, y: 0}}
          style={[blockStyles.row, cardStyles.card, styles.awards]}
          colors={['#FF988A', theme.colors.accent]}> */}
          {loadingComponent}
          {controlComponent}
          {/* </LinearGradient> */}
        </Card>
      </React.Fragment>
    );
  }

  // renderTripButton() {
  //   const {navigation} = this.props;

  //   return (
  //     <Block center middle style={styles.startTrip}>
  //       <Badge color={rgba(theme.colors.primary, '0.1')} size={144}>
  //         <TouchableOpacity
  //           activeOpacity={0.8}
  //           onPress={() => navigation.navigate('Trip')}>
  //           <Badge color={theme.colors.primary} size={62}>
  //             <Icon.FontAwesome
  //               name="automobile"
  //               size={62 / 2.5}
  //               color="white"
  //             />
  //           </Badge>
  //         </TouchableOpacity>
  //       </Badge>
  //     </Block>
  //   );
  // }

  render() {
    return (
      <React.Fragment>
        <ScrollView style={styles.welcome} showsVerticalScrollIndicator={false}>
          {this.renderGestureText()}
          {this.renderGestureSensor()}
          {this.renderTrips()}
          {this.renderDoorLock()}
        </ScrollView>
        {/* <Block center middle style={styles.startTrip}>
          <Badge color={rgba(theme.colors.primary, '0.1')} size={144}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Trip')}>
              <Badge color={theme.colors.primary} size={62}>
                <Icon name="automobile" size={62 / 2.5} color="white" />
              </Badge>
            </TouchableOpacity>
          </Badge>
        </Block> */}
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    paddingVertical: theme.sizes.padding,
    paddingHorizontal: theme.sizes.padding,
    backgroundColor: theme.colors.gray4,
  },
  // horizontal line
  hLine: {
    marginVertical: theme.sizes.base * 2,
    marginHorizontal: theme.sizes.base * 2,
    height: 1,
  },
  // vertical line
  vLine: {
    marginVertical: theme.sizes.base / 2,
    width: 1,
  },
  awards: {
    padding: theme.sizes.base,
    marginBottom: theme.sizes.padding,
    // width: width / 2 - 24,
  },

  startTrip: {
    position: 'absolute',
    left: (width - 144) / 2,
    bottom: 0,
  },
});

export default TestState;

////////////////////////////////////////////

// const FirstRoute = () => <View style={[styles.scene]} />;

// const SecondRoute = () => (
//   <View style={[styles.scene, {backgroundColor: '#673ab7'}]} />
// );

// const initialLayout = {width: Dimensions.get('window').width};

// export default function TestState() {
//   const [index, setIndex] = React.useState(0);
//   const [routes] = React.useState([
//     {key: 'first', icon: 'arrow-up'},
//     {key: 'second', icon: <Icon name="arrow-up" size={30} color="white" />},
//   ]);

//   const renderScene = SceneMap({
//     first: FirstRoute,
//     second: SecondRoute,
//   });

//   const renderIcon = ({route}) => {
//     // return <Icon name={route.icon} size={30} color="white" />;
//     return (
//       <Image
//         source={require(`../../assets/images/fan.png`)}
//         style={{width: 30, height: 30}}
//       />
//     );
//   };

//   return (
//     <TabView
//       navigationState={{index, routes}}
//       renderScene={renderScene}
//       onIndexChange={setIndex}
//       initialLayout={initialLayout}
//       renderTabBar={props => (
//         <TabBar
//           {...props}
//           indicatorStyle={{backgroundColor: 'red'}}
//           renderIcon={renderIcon}
//           // tabStyle={styles.bubble}
//           // labelStyle={styles.noLabel}
//         />
//       )}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   scene: {
//     flex: 1,
//   },
// });
