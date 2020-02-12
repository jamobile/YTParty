import React, { useContext } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import ColorCt from '../constants/color';

import { ToastContext } from '../components/toastcontext';

const HScrollerUI = props => {
  //toast
  const { show } = useContext(ToastContext);

  //onClick handler
  // function _AddToPlaylist(p, p1) {
  //   show({ message: p + '-' + p1 });
  // }

  const _onCardClick = (paramdata, paramcat) => {
    if (paramcat === 'CATEGORY') {
      //nav is a parameter in homev2.js
      props.nav.navigate({
        routeName: 'CategoryPage',
        params: { catid: paramdata }
      });
    } else {
      show({ message: paramdata + '-' + paramcat });
    }
  };

  return (
    <View>
      <View style={o_style.titlecontainer}>
        <Text style={o_style.titlestyle}>{props.title}</Text>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
        {props.url.map((u, i) => {
          const uri = u.avatar;
          return (
            <TouchableOpacity
              onPress={() => {
                _onCardClick(
                  props.cardstyle == 'CATEGORY' ? u.name : u.uid,
                  props.cardstyle
                );
              }}
              key={i}
            >
              <View
                key={i}
                style={[
                  props.cardstyle == 'CATEGORY'
                    ? o_style.cardcontainer2
                    : o_style.cardcontainer
                ]}
              >
                {/* <Image
                  source={{ uri: u.avatar }}
                  style={o_style.imagecontainer}
                /> */}
                <Image
                  style={o_style.imagecontainer}
                  {...{ uri }}
                  resizeMode={'stretch'}
                />
                <Text
                  style={[
                    props.cardstyle == 'CATEGORY'
                      ? o_style.catname
                      : o_style.videoname
                  ]}
                >
                  {u.name}
                </Text>
                <View style={o_style.textview}>
                  <Text style={o_style.namecontainer2}>{u.artist}</Text>
                  <Text style={o_style.namecontainer3}>{u.vtype}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default HScrollerUI;

const o_style = StyleSheet.create({
  cardcontainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 10,
    height: 160,
    width: 150,
    marginLeft: 20,
    borderWidth: 0.05,
    borderColor: '#dddddd',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.16,
    elevation: 2,
    padding: 0,
    borderRadius: 10,
    backgroundColor: '#cf76b1'
  },
  imagecontainer: {
    width: 150,
    height: 110
    //aspectRatio: 1
  },
  cardcontainer2: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 10,
    height: 150,
    width: 150,
    marginLeft: 20,
    borderWidth: 0.05,
    borderColor: '#dddddd',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.16,
    elevation: 2,
    padding: 0,
    borderRadius: 10,
    backgroundColor: '#9dbaeb'
  },
  imagecontainer: {
    width: 150,
    height: 110
    //aspectRatio: 1
  },
  titlecontainer: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 5
  },
  titlestyle: {
    fontFamily: ColorCt.catHdrTextFont,
    fontSize: 30,
    color: ColorCt.primary
  },
  catname: {
    paddingLeft: 10,
    fontFamily: ColorCt.catTextFont,
    fontSize: 30,
    color: '#818791'
  },
  videoname: {
    paddingLeft: 10,
    fontFamily: ColorCt.catTextFont,
    fontSize: 20 //video_name
  },
  textview: {
    flexDirection: 'row',
    //alignItems: 'flex-end',
    justifyContent: 'space-evenly'
  },

  namecontainer2: {
    paddingLeft: 10,
    fontFamily: ColorCt.catNameText,
    fontSize: 15 //artist
  },
  namecontainer3: {
    paddingLeft: 10,
    fontFamily: ColorCt.catNameText2,
    fontSize: 15 //video_type
  },
  animatedview: {
    height: 160,
    width: 150,
    backgroundColor: 'transparent'
  }
});
