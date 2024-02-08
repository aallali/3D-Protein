import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ligands from "../const/ligands.json"

import { TouchableOpacity, FlatList } from 'react-native';

export default function Home({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('Details', { ligand: item })}
    >
      <Text style={styles.buttonText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        key={3}
        data={ligands}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        numColumns={5} // Set the number of columns as per your requirement
        columnWrapperStyle={styles.row} // Style for each row
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    margin: 10, // Increase margin to create a gap
    width:60,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
