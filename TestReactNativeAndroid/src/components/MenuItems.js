import React from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native';
// import {withNavigation} from 'react-navigation';
import {Card, Text} from '@ui-kitten/components';
import {theme} from '../constants';

const MenuItems = props => {
  return (
    <Card
      onPress={() => props.navigation.navigate(props.name)}
      style={styles.item}>
      <Image source={props.imageSource} style={styles.images} />
      <Text style={styles.itemTitle}>{props.title}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    justifyContent: 'center',
    aspectRatio: 1.0,
    margin: 8,
    maxWidth: Dimensions.get('window').width / 2 - 24,
    borderRadius: 15,

    marginBottom: 16,
  },

  images: {
    alignSelf: 'center',
    width: 60,
    height: 60,
  },
  itemTitle: {
    alignSelf: 'center',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default MenuItems;
