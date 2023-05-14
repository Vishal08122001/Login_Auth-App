import React, {useState} from 'react';

import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomBtn from '../../components/CustomButton/CustomBtn';
import SocialSignInBtn from '../../components/SocialSignInBtn/SocialSignInBtn';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {Auth} from 'aws-amplify';

const ConfirmEmail = () => {
  const route = useRoute();
  const [Code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const {control, handleSubmit} = useForm({
    defaultValues: {username: route?.params?.username}, // We are getting default username from signup page
  });

  // Confirm Function
  async function OnConfirm(data) {
    const {username, code} = data;
    // To prevant multiple clicks
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      await Auth.confirmSignUp(username, code);
      navigation.navigate('SignIn');
    } catch (error) {
      Alert.alert('Oops', error.message);
    }
    setLoading(false);
  }

  // Resend code function
  async function OnResendCode(data) {
    const {username} = data;
    try {
      await Auth.resendSignUp(username);
      Alert.alert('Done', 'Code resend successful!');
    } catch (error) {
      Alert.alert('Oops', error.message);
    }
  }

  function onBackToSignIn() {
    navigation.navigate('SignIn');
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Confirm your email</Text>
        <CustomInput
          placeholder="Username"
          secureEntry={false}
          control={control}
          name={'username'}
          rules={{
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Minimum length should be 3 characters',
            },
            maxLength: {
              value: 24,
              message: 'Maximum length should be 24 characters',
            },
          }}
        />

        <CustomInput
          placeholder="Enter Confirmation Code"
          control={control}
          name={'code'}
          rules={{
            required: 'Code is required',
            minLength: {
              value: 3,
              message: 'Minimum length should be 3 characters',
            },
            maxLength: {
              value: 6,
              message: 'Maximum length should be 6 characters',
            },
          }}
          secureEntry={false}
        />

        <CustomBtn
          text={
            loading ? (
              <ActivityIndicator color={'white'} size={19} />
            ) : (
              'Confirm'
            )
          }
          onPress={handleSubmit(OnConfirm)}
        />

        <CustomBtn
          text="Resend Code"
          onPress={handleSubmit(OnResendCode)}
          fgColor="#363636"
          type="Secondary"
        />
        <CustomBtn
          text="Back to Sign in"
          onPress={onBackToSignIn}
          fgColor="#363636"
          type="Teritiary"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});

export default ConfirmEmail;
