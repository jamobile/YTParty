import React, { useState } from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';

//import { AppLoading } from 'expo';
//import * as Font from 'expo-font';
//import * as Font from 'expo-font';

//import Loader from 'react-native-mask-loader';

import MainScreenTab from './comp/screens/mainscreen';

import Toast from './comp/components/toast';
import { ToastProvider } from './comp/components/toastcontext';

// const fetchFonts = () => {
//   return Font.loadAsync({
//     'Permanent-Marker': require('./assets/fonts/PermanentMarker-Regular.ttf'),
//     'BebasNeue-Regular': require('./assets/fonts/BebasNeue-Regular.ttf'),
//     'Teko-Light': require('./assets/fonts/Teko-Light.ttf'),
//     'Teko-SemiBold': require('./assets/fonts/Teko-SemiBold.ttf')
//   });
// };

export default function App(props) {
  const [fontLoaded, setFontLoaded] = useState(false);

  return (
    <SafeAreaProvider>
      <SafeAreaView forceInset={{ top: 'always' }} style={{ flex: 1 }}>
        <ToastProvider>
          <MainScreenTab />
          <Toast />
        </ToastProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
