import React from 'react';
import {StyleSheet, Image, Dimensions} from 'react-native';
import {Card} from '@ui-kitten/components';
import {theme} from '../constants';
import {Text} from '../components';

const MenuItems = props => {
  return (
    <Card
      onPress={() => props.navigation.navigate(props.name)}
      style={styles.item}>
      <Image source={props.imageSource} style={styles.images} />
      <Text h4 spacing={0.4} style={styles.itemTitle}>
        {props.title}
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    justifyContent: 'center',
    aspectRatio: 1.0,
    margin: 10,
    marginTop: 20,
    maxWidth: Dimensions.get('window').width / 2 - 24,
    borderRadius: 15,
    elevation: 5,
    marginBottom: 16,
  },

  images: {
    alignSelf: 'center',
    width: 50,
    height: 50,
  },
  itemTitle: {
    alignSelf: 'center',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default MenuItems;
