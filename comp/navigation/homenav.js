import React from 'react';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import ColorCt from '../constants/color';

import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

import HomePointerScr from '../screens/homev2';
import CategoryPointerScr from '../screens/category';
import YTPlayerPointerScr from '../screens/ytplayer';

//HEADER
const defaultNavOptions = {
  headerStyle: {
    backgroundColor: ColorCt.primary
    //height: 80
  },
  headerTitleStyle: {
    fontFamily: ColorCt.hdrfontFamily,
    fontSize: ColorCt.hdrfontSize
  },
  headerBackTitleStyle: {
    //fontFamily: 'open-sans-italic'
  },
  headerTintColor: ColorCt.headerTextColor
};

//SCREEN linked to Navigations
const HomeNav = createStackNavigator(
  {
    HomePage: { screen: HomePointerScr },
    CategoryPage: { screen: CategoryPointerScr },
    PlayerPage: { screen: YTPlayerPointerScr }
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

//DRAWER
const HomeDrawerNavigation = createDrawerNavigator(
  {
    Home: {
      screen: HomeNav,
      navigationOptions: {
        drawerIcon: drawerConfig => (
          <IconIonicons
            name="md-cube"
            size={23}
            color={drawerConfig.tintColor}
          />
        )
      }
    },
    Settings: {
      screen: HomeNav,
      navigationOptions: {
        drawerIcon: drawerConfig => (
          <IconIonicons
            name="md-cart"
            size={23}
            color={drawerConfig.tintColor}
          />
        )
      }
    }
  },
  {
    contentOptions: {
      activeTintColor: ColorCt.primary
    }
  }
);

//export default createAppContainer(HomeDrawerNavigation);

export default createAppContainer(HomeNav);
