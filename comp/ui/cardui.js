import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

const CardUI = props => {
  return (
    <View style={o_style.cardcontainer}>
      <View style={{ flex: 2 }}>
        <Image source={props.uriparam} style={o_style.imagecontainer} />
        <Text>{props.nameparam}</Text>
      </View>
      <View></View>
    </View>
  );
};
export default CardUI;

const o_style = StyleSheet.create({
  cardcontainer: {
    flex: 1,
    marginTop: 10,
    height: 130,
    width: 130,
    marginLeft: 20,
    borderWidth: 0.05,
    borderColor: '#dddddd'
  },
  imagecontainer: {
    flex: 1,
    height: 130,
    width: 130,
    resizeMode: 'cover'
  }
});
