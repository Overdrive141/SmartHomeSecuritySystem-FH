import {
  StyleSheet,
  View,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  RefreshControl,
} from 'react-native';

import AwesomeButton from 'react-native-really-awesome-button';

import firebase from 'react-native-firebase';

import React, {Component} from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';
// import {getPatternStamp} from '../actions/patternActions';

import {theme} from '../constants';
import {Block, Badge, Card, Text} from '../components';

const {width} = Dimensions.get('window');
class DoorLockScreen extends Component {
  componentDidMount() {
    // this.props.getPatternStamp();
    this.onScreenFocus();
    this.props.navigation.addListener('didFocus', this.onScreenFocus);
  }
  constructor(props) {
    super(props);
    this.state = {
      command: '',
      isLoading: true,
      isDoorLocked: true,
      doorButtonText: 'Tap to Unlock',
      lockState: 'lock',
      lockBorderColor: 'red',
      doorStatusText: 'Locked',
      lockIconColor: 'white',
      lockBackgroundColor: 'red',
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

  // When isDoorLocked =  true then 1 and
  // when isDoorLocked = False then 0 (Unlocked)
  onScreenFocus = () => {
    console.log(this.state);
    firebase
      .database()
      .ref('sensorstatus/command')
      .once('value')
      .then(snapshot => {
        this.setState(
          {
            command: snapshot.val(),
            isLoading: false,
            refreshing: false,
          },
          () => {
            console.log(this.state);
            if (this.state.command.charAt(2) === '0') {
              this.setState({
                isDoorLocked: false,
                doorButtonText: 'Tap to Lock',
                doorStatusText: 'Unlocked',
                lockState: 'unlock',
                lockIconColor: '#A4C639',
                lockBackgroundColor: 'white',

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

  render() {
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

      controlComponent = null;
    } else {
      loadingComponent = null;

      controlComponent = (
        <Block center style={{marginBottom: theme.sizes.base}}>
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
              } else {
                this.setState(
                  {
                    isDoorLocked: false,
                    doorButtonText: 'Tap to Lock',
                    doorStatusText: 'Unlocked',
                    lockState: 'unlock',
                    lockIconColor: '#A4C639',
                    lockBackgroundColor: 'white',

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
              }
              // console.log(this.props);
              console.log(this.state);
              next();
            }}>
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
      <ScrollView
        style={styles.welcome}
        showsVerticalScrollIndicator={false}
        // Refresh Component
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }>
        <React.Fragment>
          {loadingComponent}
          {controlComponent}
        </React.Fragment>
      </ScrollView>
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

// DoorLockScreen.propTypes = {
//   // getPatternStamp: PropTypes.func.isRequired,
//   patternstamp: PropTypes.object,
// };

// const mapStateToProps = state => ({
//   patternstamp: state.patternstamp,
// });

// export default connect(mapStateToProps, {getPatternStamp})(DoorLockScreen);
export default DoorLockScreen;
