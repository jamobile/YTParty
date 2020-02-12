import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import {
  getQueryWithLimitAPI,
  getQueryWithLimitLoadMoreAPI
} from '../api/firebaseapi';
import CardItem from './carditem';
import ColorCt from '../constants/color';

const CategoryScr = props => {
  const [isLoading, setisLoading] = useState(false);
  const [aVideo, setaVideo] = useState([]);
  const [lastVisible, setlastVisible] = useState('');
  const [isrefreshing, setisrefreshing] = useState(false);

  const catId = props.navigation.getParam('catid');

  const _playYT = param => {
    //alert('CLICK TY=' + param);
    //console.log('YT1=' + param);
    props.navigation.navigate({
      routeName: 'PlayerPage',
      params: { youtubeid: param }
    });
  };

  const _loadMore = () => {
    setisrefreshing(true); //flag as flatlist getting more data
    _getVideoMore('video');
  };

  const _getVideoMore = table => {
    //console.log('CATID=' + catId + ' TABLE=' + table);
    const w1 = 'genre';
    const w2 = '==';
    const w3 = catId;
    //setaVideo([]); //add data to the array so dont reset here
    getQueryWithLimitLoadMoreAPI(
      table,
      w1,
      w2,
      w3,
      4, //lazy load limit
      'video_name',
      lastVisible,
      (res, lastVisible) => {
        setlastVisible(lastVisible);
        setisrefreshing(false); //reset after fetching data callback
        res.forEach(item => {
          setaVideo(prevArray => [
            ...prevArray,
            {
              avatar: item.thumbnail,
              name: item.video_name,
              artist: item.artist,
              vtype: item.video_type,
              uid: item.uid,
              youtubeid: item.youtube_id
            }
          ]);
        });
      }
    );
  };

  const _getVideo = table => {
    //console.log('CATID=' + catId + ' TABLE=' + table);
    const w1 = 'genre';
    const w2 = '==';
    const w3 = catId;
    setaVideo([]); //always reset to empty
    getQueryWithLimitAPI(
      table,
      w1,
      w2,
      w3,
      4, //lazy load limit
      'video_name',
      (res, lastVisible) => {
        setlastVisible(lastVisible);
        res.forEach(item => {
          setaVideo(prevArray => [
            ...prevArray,
            {
              avatar: item.thumbnail,
              name: item.video_name,
              artist: item.artist,
              vtype: item.video_type,
              uid: item.uid,
              youtubeid: item.youtube_id
            }
          ]);
        });
      }
    );
  };

  const _renderItem = itemdata => {
    return (
      <CardItem
        video_name={
          itemdata.item.name +
          ' | ' +
          itemdata.item.vtype +
          ' | ' +
          itemdata.item.artist
        }
        //video_type={itemdata.video_type}
        //artist={itemdata.artist}
        imguri={itemdata.item.avatar}
        onSelect={() => {
          //alert('CAT CLICK' + itemdata.item.uid);
          _playYT(itemdata.item.youtubeid);
        }}
      />
    );
  };

  //firebase table is case sensitive
  useEffect(() => {
    _getVideo('video');
    setisLoading(true);
  }, []); //adding [] empty array is forcing it not to re-run

  if (!isLoading) {
    console.log('LOADING FALSE');
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  } else {
    console.log('LOADING TRUE');
    return (
      <View style={o_style.list}>
        <FlatList
          data={aVideo}
          keyExtractor={item => item.uid}
          renderItem={_renderItem}
          style={{ width: '100%' }}
          onEndReached={_loadMore}
          oneEndReachedThreshold={0.5}
          refreshing={isrefreshing}
        />
      </View>
    );
  }
};

CategoryScr.navigationOptions = navData => {
  const catId = navData.navigation.getParam('catid');
  //console.log('NAV=' + catId);
  return {
    headerTitle: catId,
    headerTitleStyle: {
      fontFamily: ColorCt.hdrfontFamily,
      fontSize: ColorCt.hdrfontSize
    },
    headerTintColor: ColorCt.headerTextColor
  };
};
export default CategoryScr;

const o_style = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //padding: 15,
    marginTop: 1,
    backgroundColor: ColorCt.mainBGColor
  }
});
