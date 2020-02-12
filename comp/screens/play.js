import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar
} from 'react-native';

import ColorCt from '../constants/color';

const PlayScr = props => {
  console.log('Height on: ', Platform.OS, StatusBar.currentHeight);

  return (
    <SafeAreaView>
      <View style={o_styles.container}>
        <Text>Play Screen2</Text>
      </View>
    </SafeAreaView>
  );
};

const o_styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    //justifyContent: 'center',
    //alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  }
});

export default PlayScr;
