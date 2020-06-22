import {StyleSheet, View, ScrollView, Alert} from 'react-native';
import firebase from 'react-native-firebase';

import {Button} from '@ui-kitten/components';

import React, {Component} from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';

import {Block, Card, Text} from '../components';

import {theme} from '../constants';

import {Overlay, Button as Button2, Badge} from 'react-native-elements';

class GestureScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      command: '',
      gesture1: '',
      gesture2: '',
      gesture3: '',
      gesture4: '',
      isVisibleSetOverlay: false,
    };

    this.onPress = this.onPress.bind(this);
  }

  componentDidMount() {
    // this.props.getPatternStamp();
    this.fetchGestures();
    this.props.navigation.addListener('didFocus', this.fetchGestures);
  }

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
      this.state.gesture1.length == 0 ||
      this.state.gesture2.length == 0 ||
      this.state.gesture3.length == 0 ||
      this.state.gesture4.length == 0
    ) {
      Alert.alert('Warning', 'You need to set a combination of 4 gestures.');
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
          Alert.alert('Success', 'New Gesture Saved Successfully'),
        )
        .then(res => {
          console.log(res);
          this.setState(
            {
              gesture1: '',
              gesture2: '',
              gesture3: '',
              gesture4: '',
              isVisibleSetOverlay: false,
            },
            () => {
              this.fetchGestures();
            },
          );
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

  render() {
    const AddIcon = () => (
      <Icon name="plus" size={12} color={theme.colors.primary} />
    );
    return (
      <ScrollView style={styles.welcome} showsVerticalScrollIndicator={false}>
        <Block style={{padding: theme.sizes.base}}>
          <Card
            style={{
              elevation: 5,
              borderRadius: 15,
              paddingHorizontal: theme.sizes.padding,
              paddingVertical: theme.sizes.padding,
            }}>
            <Block>
              <Block style={{marginBottom: 50}}>
                <Block row>
                  <Block left />

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
              </Block>
              <Block
                style={{
                  alignSelf: 'center',
                }}>
                <Button2
                  icon={<Icon name="arrow-up" size={30} color="white" />}
                  onPress={() => this.onPress('^')}
                  disabled={true}
                />
                <Badge
                  value={this.setNumber('^')}
                  status="error"
                  containerStyle={{position: 'absolute', top: -4, right: -4}}
                />
              </Block>
              <Block
                row
                style={{
                  justifyContent: 'center',
                }}>
                {/* <Block middle flex={false} style={{marginLeft: 95}}> */}
                <Block center flex={0.17}>
                  <Button2
                    icon={<Icon name="arrow-left" size={30} color="white" />}
                    onPress={() => this.onPress('<')}
                    disabled={true}
                  />
                  <Badge
                    value={this.setNumber('<')}
                    status="error"
                    containerStyle={{position: 'absolute', top: -4, right: -4}}
                  />
                </Block>
                <Block center flex={0.18} />
                {/* <Block middle flex={false} style={{marginRight: 95}}> */}
                <Block center flex={0.17}>
                  <Button2
                    icon={<Icon name="arrow-right" size={30} color="white" />}
                    onPress={() => this.onPress('>')}
                    disabled={true}
                  />
                  <Badge
                    value={this.setNumber('>')}
                    status="error"
                    containerStyle={{position: 'absolute', top: -4, right: -4}}
                  />
                </Block>
              </Block>
              <Block
                style={{
                  alignSelf: 'center',
                  marginBottom: 25,
                }}>
                <Button2
                  icon={<Icon name="arrow-down" size={30} color="white" />}
                  onPress={() => this.onPress('v')}
                  disabled={true}
                />
                <Badge
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
                  <Badge
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
                    <Badge
                      value={this.setNumber('<')}
                      status="error"
                      containerStyle={{
                        position: 'absolute',
                        top: -4,
                        right: -4,
                      }}
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
                    <Badge
                      value={this.setNumber('>')}
                      status="error"
                      containerStyle={{
                        position: 'absolute',
                        top: -4,
                        right: -4,
                      }}
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
                  <Badge
                    value={this.setNumber('v')}
                    status="error"
                    containerStyle={{position: 'absolute', top: -4, right: -4}}
                  />
                </View>

                <Button
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
            <Block center>
              <Text spacing={0.4} bold>
                Current Gesture Set
              </Text>
            </Block>
          </Card>
        </Block>
      </ScrollView>
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
  textStyle: {
    color: 'white',
    fontSize: 25,
  },
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GestureScreen;
