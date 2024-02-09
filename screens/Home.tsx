import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as LocalAuthentication from 'expo-local-authentication';

export default function Home() {
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);

  useEffect(() => {
    checkBiometricAvailability();
  }, []);

  const checkBiometricAvailability = async () => {
    const isAvailable = await LocalAuthentication.hasHardwareAsync();
    console.log(isAvailable)
    setIsBiometricAvailable(isAvailable);
  };


  return (
    <View style={styles.container}>
      <Text>Home Page is working actually</Text>
     
        <Text  style={styles.biometricText}>
           biometric authentication is {isBiometricAvailable ? 'available' : 'not available'}
        </Text>
   
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  biometricText: {
    marginTop: 20,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
