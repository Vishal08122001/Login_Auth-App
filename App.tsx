// App.js
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Navigation from './src/navigation';
import {Amplify, Auth} from 'aws-amplify';
import config from './src/aws-exports';
import {withAuthenticator} from '@aws-amplify/ui-react-native';

Amplify.configure(config);
const App = () => {
  // Auth.signOut();
  return (
    <SafeAreaView style={styles.container}>
      <Navigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
});

// export default withAuthenticator(App);  // You can use AWS Inbuilt Authentication ny using this
export default App;
