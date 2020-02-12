import React, { useContext, useEffect, useRef } from 'react';
import { ToastContext } from './toastcontext';
import {
  Text,
  Animated,
  Easing,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import ColorCt from '../constants/color';

export const Toast = () => {
  const { toast, hide } = useContext(ToastContext);
  const translateYRef = useRef(new Animated.Value(-100));

  useEffect(() => {
    if (toast.visible) {
      Animated.timing(translateYRef.current, {
        duration: 300,
        easing: Easing.ease,
        toValue: 100,
        useNativeDriver: true
      }).start();
    } else {
      Animated.timing(translateYRef.current, {
        duration: 450,
        easing: Easing.ease,
        toValue: -100,
        useNativeDriver: true
      }).start();
    }
  }, [toast]);

  return (
    <Animated.View
      style={[
        styles.toast,
        { transform: [{ translateY: translateYRef.current }] }
      ]}
    >
      <TouchableOpacity onPress={hide} style={styles.content}>
        <Text style={styles.toastMessage}> {toast.message}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Toast;

const styles = StyleSheet.create({
  toast: {
    borderRadius: 4,
    marginHorizontal: 1,
    padding: 4,
    position: 'absolute',
    top: 0,
    zIndex: 2,
    right: 0,
    left: 0,
    backgroundColor: ColorCt.primary
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: 32,
    width: '100%'
  },
  toastMessage: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 25,
    letterSpacing: 0.26,
    marginHorizontal: 10
  }
});
