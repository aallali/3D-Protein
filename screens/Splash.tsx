import React, { useEffect, useState } from 'react';

import { View, Image, StyleSheet } from 'react-native';

const Splash = ({ navigation }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      // Redirect to the home screen
      navigation.replace('Home'); // Make sure 'Home' is the correct screen name
    }, 3000); // 3000 milliseconds = 3 seconds

    return () => clearTimeout(timer); // Clear the timer when the component unmounts
  }, [navigation]);

  return (
    <View style={styles.container}>
      {  <Image source={require('../assets/proteinLogo.png')} style={styles.logo} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200, // Adjust the width as needed
    height: 200, // Adjust the height as needed
  },
});

export default Splash;
