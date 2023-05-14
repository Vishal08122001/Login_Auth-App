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
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {Auth} from 'aws-amplify';

const ForgotPassScreen = () => {
  const [username, setusername] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  async function OnSend(data) {
    const {username} = data;
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      await Auth.forgotPassword(username);
      navigation.navigate('NewPass', {username});
    } catch (error) {
      Alert.alert('Oops', error.message);
    }
    setLoading(false);
  }

  function onBackToSignIn() {
    navigation.navigate('SignIn');
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Reset your Password</Text>
        <CustomInput
          placeholder="Username"
          name={'username'}
          control={control}
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
          secureEntry={false}
        />

        <CustomBtn
          text={
            loading ? <ActivityIndicator size={19} color={'white'} /> : 'Send'
          }
          onPress={handleSubmit(OnSend)}
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

export default ForgotPassScreen;
