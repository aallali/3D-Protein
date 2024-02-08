import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import Listing from './screens/Listing';
import Render from './screens/Render';
import Home from './screens/Home';
import Splash from './screens/Splash';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import React, { useState } from 'react';

const Stack = createNativeStackNavigator();

const SCREENS = ["home", "ligands", "Render"]
function NavigateButtons(props: any) {
  console.log(props)
  return (<View style={{ flexDirection: "row" }}>
    <View style={{ marginRight: 10 }}>
      <Button
        onPress={() => false}
        title="Back"
        color="#000"
      />
    </View>
    <View>
      <Button
        onPress={() => alert('This is a buttons!')}
        title="Next"
        color="#000"
      />
    </View>
  </View>)
}

export default function App() {
  const [appLoaded, isLoaded] = useState(false)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#00C4FF" hidden={false} />
      {
        !appLoaded ?
          (<Splash goHomeScreen={isLoaded} />)
          :
          (
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="ligands"
                screenOptions={{ headerShown: true }}

              >
                <Stack.Screen name="home" component={Home} />
                <Stack.Screen name="listing" component={Listing} />
                <Stack.Screen name="render" component={Render} />
              </Stack.Navigator>
            </NavigationContainer>
          )
      }
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
