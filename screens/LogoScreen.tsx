// LogoScreen.tsx

import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const LogoScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/proteinLogo.png')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200, // Adjust the width as needed
    height: 200, // Adjust the height as needed
  },
});

export default LogoScreen;
