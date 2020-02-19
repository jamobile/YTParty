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

import RNBottomActionSheet from 'react-native-bottom-action-sheet';
import Icon from 'react-native-vector-icons/FontAwesome';

import HScrollerUI from '../ui/categoryscroller';

const HomeScr = props => {
  const [isLoading, setisLoading] = useState(false);
  const [aBanner, setBanner] = useState([]);
  const [aByGenre, setaByGenre] = useState([]);
  const [aVideoShowCase, setaVideoShowCase] = useState([]);

  const [isVisible, setisVisible] = useState(false);

  let facebook = (
    <Icon name="facebook" color="#000000" size={10} family={'FontAwesome'} />
  );
  let instagram = (
    <Icon
      name={'instagram'}
      color={'#000000'}
      size={10}
      family={'FontAwesome'}
    />
  );
  let skype = (
    <Icon name={'skype'} color={'#000000'} size={10} family={'FontAwesome'} />
  );
  let twitter = (
    <Icon name={'twitter'} color={'#000000'} size={10} family={'FontAwesome'} />
  );
  let whatsapp = (
    <Icon
      name={'whatsapp'}
      color={'#000000'}
      size={10}
      family={'FontAwesome'}
    />
  );
  let youtube = (
    <Icon name={'youtube'} color={'#000000'} size={10} family={'FontAwesome'} />
  );
  let google = (
    <Icon name={'google'} color={'#000000'} size={10} family={'FontAwesome'} />
  );
  let linkedin = (
    <Icon
      name={'linkedin'}
      color={'#000000'}
      size={10}
      family={'FontAwesome'}
    />
  );

  _showSheetView = () => {
    let SheetView = RNBottomActionSheet.SheetView;
    SheetView.Show({
      title: 'Menu',
      items: [
        {
          title: 'Account',
          subTitle: 'Account Menu',
          icon: facebook,
          divider: true
        },
        {
          title: 'Profile',
          subTitle: 'Instagram Description',
          icon: instagram
        },
        {
          title: 'Subscription',
          subTitle: 'Skype Description',
          icon: skype
        },
        {
          title: 'FAQ',
          subTitle: 'Twitter Description',
          icon: twitter,
          divider: true
        },
        { title: 'WhatsApp', subTitle: 'WhatsApp Description', icon: whatsapp },
        { title: 'YouTube', subTitle: 'YouTube Description', icon: youtube },
        { title: 'Google', subTitle: 'Google Description', icon: google },
        { title: 'LinkedIn', subTitle: 'LinkedIn Description', icon: linkedin }
      ],
      theme: 'light',
      selection: 3,

      onSelection: selection => {
        console.log('selection: ' + selection);
      }
    });
  };

  // _showGridView = () => {
  //   let GridView = RNBottomActionSheet.GridView;
  //   GridView.Show({
  //     title: 'Awesome!',
  //     items: [
  //       { title: 'Facebook', icon: facebook },
  //       { title: 'Instagram', icon: instagram },
  //       { title: 'Skype', icon: skype },
  //       { title: 'Twitter', icon: twitter },
  //       { title: 'WhatsApp', icon: whatsapp },
  //       { title: 'YouTube', icon: youtube },
  //       { title: 'Google', icon: google },
  //       { title: 'LinkedIn', icon: linkedin }
  //     ],
  //     theme: 'dark',
  //     onSelection: selection => {
  //       console.log('selection: ' + selection);
  //     }
  //   });
  // };

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
          //similar to array.push
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
  //these functions need to execute when the component did mount
  //thats why we are using useEffect here
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

          <View style={o_style.bottomcontainer}>
            {/* <RNBottomActionSheet.GridView
              visible={isVisible}
              title={'Awesome!'}
              theme={'dark'}
              selection={3}
              onSelection={selection => {
                console.log('selection: ' + selection);
              }}
            >
              <RNBottomActionSheet.GridView.Item
                title={'Facebook1'}
                icon={facebook}
              />
              <RNBottomActionSheet.GridView.Item
                title={'Instagram'}
                icon={instagram}
              />
              <RNBottomActionSheet.GridView.Item title={'Skype'} icon={skype} />
              <RNBottomActionSheet.GridView.Item
                title={'Twitter'}
                icon={twitter}
              />
              <RNBottomActionSheet.GridView.Item
                title={'WhatsApp'}
                icon={whatsapp}
              />
              <RNBottomActionSheet.GridView.Item
                title={'YouTube'}
                icon={youtube}
              />
              <RNBottomActionSheet.GridView.Item
                title={'Google'}
                icon={google}
              />
              <RNBottomActionSheet.GridView.Item
                title={'LinkedIn'}
                icon={linkedin}
              />
            </RNBottomActionSheet.GridView> */}

            <RNBottomActionSheet.SheetView
              visible={isVisible}
              title={'Awesome!'}
              theme={'light'}
              onSelection={selection => {
                console.log('selection: ' + selection);
              }}
            >
              <RNBottomActionSheet.SheetView.Item
                title={'Facebook'}
                subTitle={'Facebook Description'}
                icon={facebook}
                divider={true}
              />
              <RNBottomActionSheet.SheetView.Item
                title={'Instagram'}
                subTitle={'Instagram Description'}
                icon={instagram}
              />
              <RNBottomActionSheet.SheetView.Item
                title={'Skype'}
                subTitle={'Skype Description'}
                icon={skype}
              />
              <RNBottomActionSheet.SheetView.Item
                title={'Twitter'}
                subTitle={'Twitter Description'}
                icon={twitter}
                divider={true}
              />
              <RNBottomActionSheet.SheetView.Item
                title={'WhatsApp'}
                subTitle={'WhatsApp Description'}
                icon={whatsapp}
              />
              <RNBottomActionSheet.SheetView.Item
                title={'YouTube'}
                subTitle={'YouTube Description'}
                icon={youtube}
              />
              <RNBottomActionSheet.SheetView.Item
                title={'Google'}
                subTitle={'Google Description'}
                icon={google}
              />
              <RNBottomActionSheet.SheetView.Item
                title={'LinkedIn'}
                subTitle={'LinkedIn Description'}
                icon={linkedin}
              />
            </RNBottomActionSheet.SheetView>
          </View>
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
              //navigation.toggleDrawer();
              //_showGridView();
              _showSheetView();
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
  },
  bottomcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue'
  }
});
