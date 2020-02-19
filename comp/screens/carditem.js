import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import ColorCt from '../constants/color';

const CardItem = props => {
  //console.log('CARDITEM=' + props.imguri);
  return (
    <View style={styles.carditem}>
      <TouchableOpacity onPress={props.onSelect}>
        <View>
          <View style={{ ...styles.cardrow, ...styles.cardheader }}>
            <ImageBackground
              source={{ uri: props.imguri }}
              style={styles.bgImage}
            >
              <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {props.video_name}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={{ ...styles.cardrow, ...styles.cardetail }}></View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  carditem: {
    height: 200,
    width: '100%',
    paddingTop: 1
    //backgroundColor: '#f5f5f5',
    //borderRadius: 1
    //overflow: 'hidden',
    //marginVertical: 0
  },
  bgImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end'
  },
  cardrow: {
    flexDirection: 'row'
  },
  cardheader: {
    height: '100%'
  },
  carddetail: {
    paddingHorizontal: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
    //height: '15%'
  },
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
    paddingHorizontal: 12
  },
  title: {
    fontFamily: ColorCt.cardTextFontFamily,
    fontSize: ColorCt.cardTextFontSize,
    color: ColorCt.cardTextColor,
    textAlign: 'center'
  }
});

export default CardItem;
