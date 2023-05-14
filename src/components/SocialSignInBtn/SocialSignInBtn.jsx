import React from 'react';
import CustomBtn from '../CustomButton/CustomBtn';
import {Alert} from 'react-native';

const SocialSignInBtn = () => {
  function onSignInFace() {
    Alert.alert('Sorry', 'This function is coming soon.');
  }

  function onSignInGoog() {
    Alert.alert('Sorry', 'This function is coming soon.');
  }
  return (
    <>
      <CustomBtn
        text="Sign in with Facebook"
        onPress={onSignInFace}
        bgColor="#E7EAF4"
        fgColor="#4765A9"
      />
      <CustomBtn
        text="Sign in with Google"
        onPress={onSignInGoog}
        bgColor="#FAE9EA"
        fgColor="#DD4D44"
      />
    </>
  );
};

export default SocialSignInBtn;
