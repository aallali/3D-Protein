// utils/FileUtils.js
import * as FileSystem from 'expo-file-system';

export const readWordsFromFile = async (filePath) => {
  try {
    const fileContent = await FileSystem.readAsStringAsync(filePath);
    return fileContent.split('\n').map(word => word.trim());
  } catch (error) {
    console.error('Error reading file:', error);
    return [];
  }
};
