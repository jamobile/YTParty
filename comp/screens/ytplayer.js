import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

//import { WebView } from 'react-native-webview';
//import WebView from 'react-native-android-fullscreen-webview-video';

import YouTube from 'react-native-youtube';
//import ColorCt from '../constants/color';

const PlayScr = props => {
  //console.log('Height on: ', Platform.OS, StatusBar.currentHeight);
  //console.log('YT2=' + JSON.stringify(props));
  const [ht, setht] = useState(0);

  const yid = props.navigation.getParam('youtubeid');
  console.log('YT2=' + yid);
  return (
    <View style={o_styles.container}>
      <Text>Play Screen2</Text>

      {/* <WebView
        style={{ flex: 0, height: 300 }}
        source={{
          uri: `https://www.youtube.com/embed/${yid}?rel=controls=1&showinfo=1&fullscreen=1&autoplay=0`
        }}
      /> */}

      <YouTube
        videoId={yid} // The YouTube video ID
        apiKey="AIzaSyAhG2L2QpT35ZyhlPT26vqvdthzTEpdEhE"
        //ref={_youTubeRef}
        play={true} // control playback of video with true/false
        //fullscreen // control whether the video should play in fullscreen or inline
        //loop // control whether the video should loop when ended
        //onReady={e => this.setState({ isReady: true })}
        //onChangeState={e => this.setState({ status: e.state })}
        //onChangeQuality={e => this.setState({ quality: e.quality })}
        //controls={1}
        onError={e => console.log('yt error', e)}
        onReady={e => setht(200)}
        style={{
          alignSelf: 'stretch',
          height: ht,
          backgroundColor: 'black',
          marginVertical: 10
        }}
        //style={{ alignSelf: 'stretch', height: 300 }}
      />
    </View>
  );
};

const o_styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow'
    //justifyContent: 'center',
    //alignItems: 'center',
    //paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  }
});

export default PlayScr;
