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
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {Auth} from 'aws-amplify';

const SignUp = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm();

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const pass = watch('password');
  let password_regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/;
  async function Register(data) {
    const {username, password, email, name} = data;
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {email, name},
      });
      navigation.navigate('ConfirmEmail', {username});
    } catch (error) {
      Alert.alert('Oops', error.message);
    }

    setLoading(false);
  }

  function onForgotPass() {
    navigation.navigate('ForgotPass');
  }

  function OnPrivacyPolicy() {}

  function OnTermsofUse() {}

  function onSignIn() {
    navigation.navigate('SignIn');
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>

        <CustomInput
          placeholder="Full Name"
          secureEntry={false}
          control={control}
          name={'name'}
          rules={{
            required: 'Name is required',
            minLength: {
              value: 2,
              message: 'Minimum length should be 3 characters',
            },
            maxLength: {
              value: 24,
              message: 'Maximum length should be 24 characters',
            },
          }}
        />

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
          placeholder="Email"
          control={control}
          name={'email'}
          rules={{
            required: 'Email is required',
            pattern: {
              value: emailRegex,
              message: 'Please enter valid email',
            },
          }}
          secureEntry={false}
        />

        <CustomInput
          placeholder="Password"
          control={control}
          name={'password'}
          secureEntry={true}
          rules={{
            required: 'Password is required',
            pattern: {
              value: password_regex,
              message:
                'Password must contain Uppercase, lowercase and special character',
            },
          }}
        />

        <CustomInput
          placeholder="Confirm Password"
          control={control}
          name={'confirmpassword'}
          rules={{
            validate: value => value === pass || 'Password not matching',
          }}
          secureEntry={true}
        />

        <CustomBtn
          text={
            loading ? (
              <ActivityIndicator size={19} color={'white'} />
            ) : (
              'Register'
            )
          }
          onPress={handleSubmit(Register)}
        />

        <Text style={styles.text}>
          By registering, you confirm that you accept out
          <Text style={styles.link} onPress={OnTermsofUse}>
            Terms of Use{' '}
          </Text>{' '}
          and{' '}
          <Text style={styles.link} onPress={OnPrivacyPolicy}>
            Privacy Policy
          </Text>
        </Text>

        <CustomBtn
          text="Forgot Password"
          onPress={onForgotPass}
          type="Teritiary"
        />
        <SocialSignInBtn />
        <CustomBtn
          text="Have an account? Login"
          onPress={onSignIn}
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

export default SignUp;
