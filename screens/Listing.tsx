import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ligands from "../const/ligands.json"

export default function Listing() {
  return (
    <View style={styles.container}>
      <Text>Ligands List Page</Text>
      <Text>Total Ligands we have : {ligands.length}</Text>
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
