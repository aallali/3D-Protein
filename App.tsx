import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Listing from './screens/Listing';
import Render from './screens/Render';
import Home from './screens/Home';
import Splash from './screens/Splash';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>3D Protein</Text>
      <Home />
      <Splash />
      <Listing />
      <Render />
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
});
