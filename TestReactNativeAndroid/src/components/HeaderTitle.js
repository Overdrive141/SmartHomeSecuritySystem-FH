import React from 'react';
import {Image, TouchableOpacity, Dimensions, View, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Ionicons';

// const HeaderTitle = props => {
//   return (
//     <View>
//       <Image
//         source={require('../../assets/images/logo.png')}
//         style={{width: 30, height: 30}}
//       />
//       <Text>Smart Home Security System</Text>
//     </View>
//   );
// };

// export default HeaderTitle;
const deviceWidth = Dimensions.get('window').width;

export class Logo extends React.Component {
  render() {
    return (
      //Add your logo in the image tag
      <View style={{flex: 0.8, flexDirection: 'row'}}>
        <Image
          source={require('../../assets/images/smarthome.png')}
          resizeMode="contain"
          style={{width: 50, marginTop: 0}}
        />
      </View>
    );
  }
}

export class MenuButton extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Icon
          name="md-menu"
          size={30}
          style={{color: 'black', paddingLeft: 10}}
        />
      </TouchableOpacity>
    );
  }
}
