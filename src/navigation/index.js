import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import SignIn from '../screens/SigninScreen/SignIn';
import SignUp from '../screens/SignUpScreen/SignUpScreen';
import ConfirmEmail from '../screens/ConfirmEMAIL/ConfirmEmail';
import ForgotPassScreen from '../screens/ForgotScreen/ForgotPassScreen';
import NewPassScreen from '../screens/NewPassScreen/NewPassScreen';
import Home from '../screens/Home/Home';
import {Auth, Hub} from 'aws-amplify';

const Navigation = () => {
  const Stack = createStackNavigator();
  const [user, setUser] = useState(undefined);

  async function checkUser() {
    try {
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      setUser(authUser);
    } catch (error) {
      setUser(null);
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const listener = data => {
      if (data.payload.event === 'signIn' || data.payload.event === 'signOut') {
        checkUser();
      }
    };
    Hub.listen('auth', listener);
    return () => Hub.remove('auth', listener);
  }, []);

  if (user === undefined) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>
          <ActivityIndicator size={50} color={'blue'} />;
        </Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user ? (
          <Stack.Screen name="Home" component={Home} />
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} />
            <Stack.Screen name="ForgotPass" component={ForgotPassScreen} />
            <Stack.Screen name="NewPass" component={NewPassScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
