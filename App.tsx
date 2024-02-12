import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import Listing from './screens/Listing';
import Render from './screens/Render';
import Home from './screens/Home';
import Splash from './screens/Splash';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Vif from './components/Vif';

const Stack = createNativeStackNavigator();


export default function App() {
  const [appLoaded, isLoaded] = useState(false)
  const [bioMetricSupport, setBiometricSupport] = useState(false)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#00C4FF" hidden={false} />

      <Vif c={appLoaded}>
        <Splash setBiometricSupport={setBiometricSupport} goHomeScreen={isLoaded} />
      </Vif>

      <Vif c={!appLoaded}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={`${bioMetricSupport ? 'home' : 'listing'}`}
            screenOptions={{ headerShown: true }}
          >
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="listing" component={Listing} />
            <Stack.Screen name="render" component={Render} />
          </Stack.Navigator>
        </NavigationContainer>
      </Vif>

    </SafeAreaView>
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
