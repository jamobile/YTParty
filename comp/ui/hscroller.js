import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import ColorCt from '../constants/color';

class HScrollerUI extends Component {
  constructor(props) {
    super(props);
  }

  _AddToPlaylist(p) {
    //alert('NAME=' + p);
  }

  render() {
    return (
      <View>
        <View style={o_style.titlecontainer}>
          <Text style={o_style.titlestyle}>{this.props.title}</Text>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
          {this.props.url.map((u, i) => {
            const uri = u.avatar;
            return (
              <TouchableOpacity
                onPress={this._AddToPlaylist.bind(
                  this,
                  this.props.cardstyle == 'CATEGORY' ? u.name : u.uid
                )}
                key={i}
              >
                <View
                  key={i}
                  style={[
                    this.props.cardstyle == 'CATEGORY'
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
                      this.props.cardstyle == 'CATEGORY'
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
  }
}

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
    fontFamily: 'Permanent-Marker',
    fontSize: 30,
    color: ColorCt.primary
  },
  catname: {
    paddingLeft: 10,
    fontFamily: 'BebasNeue-Regular',
    fontSize: 30,
    color: '#818791'
  },
  videoname: {
    paddingLeft: 10,
    fontFamily: 'BebasNeue-Regular',
    fontSize: 25
  },
  textview: {
    flexDirection: 'row',
    //alignItems: 'flex-end',
    justifyContent: 'space-evenly'
  },

  namecontainer2: {
    paddingLeft: 10,
    fontFamily: 'Teko-Light',
    fontSize: 15
  },
  namecontainer3: {
    paddingLeft: 10,
    fontFamily: 'Teko-SemiBold',
    fontSize: 15
  },
  animatedview: {
    height: 160,
    width: 150,
    backgroundColor: 'transparent'
  }
});

// const HScrollerUI = props => {
//   {
//     //console.log('HSCROLL START');
//   }
//   return (
//     <View>
//       <View style={o_style.titlecontainer}>
//         <Text>{props.title}</Text>
//       </View>

//       <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
//         {props.url.map((u, i) => {
//           return (
//             <View key={i} style={o_style.cardcontainer}>
//               <Image
//                 source={{ uri: u.avatar }}
//                 style={o_style.imagecontainer}
//               />
//               <Text>{u.name}</Text>
//             </View>
//           );
//         })}
//       </ScrollView>
//     </View>
//   );
// };
