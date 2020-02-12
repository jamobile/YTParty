import React from 'react';
import ColorCt from '../constants/color';
import IconIonicons from 'react-native-vector-icons/Ionicons';

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createAppContainer } from 'react-navigation';

import HomePointerScr from './homev2';
import PlayPointerScr from './play';

import HomeNav from '../navigation/homenav';

const HomeTabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeNav,
      navigationOptions: {
        tabBarIcon: tabConfig => (
          <IconIonicons name="ios-home" size={23} color={tabConfig.tintColor} />
        )
      }
    },
    Play: {
      screen: PlayPointerScr,
      navigationOptions: {
        tabBarIcon: tabConfig => (
          <IconIonicons name="ios-mic" size={23} color={tabConfig.tintColor} />
        )
      }
    },

    Find: {
      screen: HomePointerScr,
      navigationOptions: {
        tabBarIcon: tabConfig => (
          <IconIonicons
            name="ios-search"
            size={23}
            color={tabConfig.tintColor}
          />
        )
      }
    },
    MyParty: {
      screen: HomePointerScr,
      navigationOptions: {
        tabBarIcon: tabConfig => (
          <IconIonicons
            name="ios-headset"
            size={23}
            color={tabConfig.tintColor}
          />
        )
      }
    }
  },
  {
    initialRouteName: 'Home',
    activeColor: ColorCt.primary,
    inactiveColor: ColorCt.tabInactive,
    barStyle: { backgroundColor: ColorCt.tabBar }
  }
);

export default createAppContainer(HomeTabNavigator);
