import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const SplashScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>SplashScreen</Text>
  </View>
);

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
  },
});
