import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './Navigators/Navigator';
import {GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';

export default function App() {
  return (
    <NavigationContainer>
      <Navigator/>
    </NavigationContainer>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
