import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import ligands from '../const/ligands.json';

export default function Home({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLigands, setFilteredLigands] = useState([]);

  useEffect(() => {
    // Update the filtered ligands whenever the searchQuery changes
    const filtered = ligands.filter((ligand) =>
      ligand.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredLigands(filtered);
  }, [searchQuery]);

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
      <TextInput
        style={styles.searchInput}
        placeholder="Search Ligands"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      <FlatList
        data={filteredLigands}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        numColumns={5}
        columnWrapperStyle={styles.row}
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
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
    width: '80%',
    
  },
  row: {
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    margin: 10,
    width: 60,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
