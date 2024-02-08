import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, FlatList } from 'react-native';
import { readWordsFromFile } from '../utils/FileUtils';
import * as FileSystem from 'expo-file-system';
import RNFS from "react-native-fs";
export default function ListMolecules() {
  const [words, setWords] = useState([]);

  useEffect(() => {
    const loadFileContent = async () => {
      const directoryPath = FileSystem.documentDirectory + 'utils/';
      const filePath = directoryPath + 'ligands.txt';
      // const rootPath = RNFS.DocumentDirectoryPath;
      
      try {
        // Read the file content
        // const result = await FileSystem.readAsStringAsync(filePath);
        // Split the content into an array of lines
        // const lines = result.split('\n').map(line => line.trim());
        // setFileContent(lines);
      } catch (error) {
        console.error('Error reading file:', error);
      }
    };

    loadFileContent();
  }, []); // Empty dependency array to run the effect only once


  return (
    <View style={styles.container}>
      <Text>List of Words:</Text>
      {/* <FlatList
        data={words}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item}</Text>}
      /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
