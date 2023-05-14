import {Auth} from 'aws-amplify';
import React from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';

const Home = () => {
  function OnSignout() {
    try {
      Auth.signOut();
      Alert.alert('', 'Signed out successful');
    } catch (error) {
      Alert.alert('Oops', error.message);
    }
  }

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Home</Text>
      <Text
        onPress={OnSignout}
        style={{
          width: '100%',
          textAlign: 'center',
          color: 'red',
          marginTop: 20,
          fontSize: 20,
          marginBottom: 20,
        }}>
        Sign out
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 50,
  },
});
export default Home;
