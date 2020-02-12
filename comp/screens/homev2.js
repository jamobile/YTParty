import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
//import SafeAreaView from 'react-native-safe-area-view';
import ColorCt from '../constants/color';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderUi from '../ui/headerbutton';

import { SliderBox } from 'react-native-image-slider-box';
import {
  getCollectionAPI,
  getStoredImageAPI,
  getQueryAPI
} from '../api/firebaseapi';

import HScrollerUI from '../ui/categoryscroller';

const HomeScr = props => {
  const [isLoading, setisLoading] = useState(false);
  const [aBanner, setBanner] = useState([]);
  const [aByGenre, setaByGenre] = useState([]);
  const [aVideoShowCase, setaVideoShowCase] = useState([]);

  //E5 syntax function
  function _getBanner(table) {
    //console.log('GET BANNER');
    setBanner([]);
    getStoredImageAPI(table, res => {
      setBanner(res);
    });
  }
  //E6 syntax ARROW KEY function
  const _getCategory = table => {
    //console.log('GET COLLECTION=' + table);
    setaByGenre([]);
    getCollectionAPI(table, res => {
      res.forEach(item => {
        setaByGenre(prevArray => [
          ...prevArray,
          { avatar: item.imageuri, name: item.name }
        ]);
      });
    });
  };

  const _getVideo = table => {
    //console.log('GET VIDEO=' + table);
    const w1 = 'is_showcase';
    const w2 = '==';
    const w3 = true;
    setaVideoShowCase([]); //always reset to empty
    getQueryAPI(table, w1, w2, w3, res => {
      res.forEach(item => {
        setaVideoShowCase(prevArray => [
          ...prevArray,
          {
            avatar: item.thumbnail,
            name: item.video_name,
            artist: item.artist,
            vtype: item.video_type,
            uid: item.uid
          }
        ]);
      });
    });
  };

  //firebase table is case sensitive
  useEffect(() => {
    _getBanner('bannerimg');
    _getCategory('BYGENRE');
    _getVideo('video');
    setisLoading(true);
  }, []); //adding [] empty array is forcing it not to re-run

  if (!isLoading) {
    //console.log('LOADING FALSE');
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  } else {
    //console.log('LOADING TRUE');
    return (
      <SafeAreaView>
        <View style={o_style.maincontainer}>
          <ScrollView>
            <View>
              <SliderBox
                images={aBanner}
                sliderBoxHeight={200}
                onCurrentImagePressed={index =>
                  console.warn(`image ${index} pressed`)
                }
                dotColor={ColorCt.primary}
                inactiveDotColor="#90A4AE"
                paginationBoxStyle={{
                  position: 'absolute',
                  bottom: 10,
                  padding: 10,
                  alignItems: 'center',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  paddingVertical: 10
                }}
                ImageComponentStyle={{
                  borderRadius: 15,
                  width: '99%',
                  marginTop: 5
                }}
                imageLoadingColor="#2196F3"
              />
            </View>

            <HScrollerUI
              url={aByGenre}
              title={'BY GENRE'}
              cardstyle="CATEGORY"
              nav={props.navigation}
            />
            <HScrollerUI
              url={aVideoShowCase}
              title={'SHOWCASE'}
              cardstyle="VIDEO"
              nav={props.navigation}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
};

//This one creates the HEADER MENU BUTTON
HomeScr.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'Youtube Party',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderUi}>
        <Item
          title="Menu"
          iconName="md-menu"
          onPress={() => {
            {
              console.log('MENU CLICK');
              navigation.toggleDrawer();
            }
          }}
        />
      </HeaderButtons>
    )
  };
};

export default HomeScr;

const o_style = StyleSheet.create({
  imagecontainer: {
    flex: 1,
    height: 130,
    width: 130,
    resizeMode: 'cover'
  },
  maincontainer: {
    backgroundColor: ColorCt.mainBGColor
  }
});
