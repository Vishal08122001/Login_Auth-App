import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import logo from '../../../assets/images/Logo_4.png';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomBtn from '../../components/CustomButton/CustomBtn';
import {Amplify, Auth} from 'aws-amplify';
import {useNavigation} from '@react-navigation/native';
import SocialSignInBtn from '../../components/SocialSignInBtn/SocialSignInBtn';
import {useForm} from 'react-hook-form';

const SignIn = props => {
  const {height} = useWindowDimensions();
  const navigate = useNavigation();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  async function onSignIn(data) {
    if (loading) {
      return;
    }

    setLoading(true);
    // Validate User
    try {
      await Auth.signIn(data.username, data.password);
    } catch (error) {
      Alert.alert('Oops', error.message);
    }
    setLoading(false);
  }

  function onForgotPass() {
    navigate.navigate('ForgotPass');
  }

  function onSignUp() {
    navigate.navigate('SignUp');
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={logo}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />
        <CustomInput
          placeholder="Username"
          control={control}
          name={'username'}
          secureEntry={false}
          rules={{
            required: 'Username is required',
          }}
        />
        <CustomInput
          placeholder="Password"
          control={control}
          name={'password'}
          secureEntry={true}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 3,
              message: 'Password should be atleast of 6 characters',
            },
          }}
        />

        <CustomBtn
          text={
            loading ? <ActivityIndicator size={19} color={'white'} /> : 'SignIn'
          }
          onPress={handleSubmit(onSignIn)}
        />
        <CustomBtn
          text="Forgot Password"
          onPress={onForgotPass}
          type="Teritiary"
        />

        <SocialSignInBtn />

        <CustomBtn
          text="Don't have an account? Create One"
          onPress={onSignUp}
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
  logo: {
    width: '70%',
    maxWidth: 300,
    height: 100,
  },
});

export default SignIn;
