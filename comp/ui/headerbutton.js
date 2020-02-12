import React from 'react';
//import { SafeAreaView, Platform, StatusBar } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';

import IconIonicons from 'react-native-vector-icons/Ionicons';
import ColorCt from '../constants/color';

const HeaderButtonUI = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={IconIonicons}
      iconSize={27}
      color={ColorCt.headerbuttoncolor}
      paddingTop={24}
    />
  );
};
export default HeaderButtonUI;
