import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import IsReadyPDB from '../components/IsPdbReady';
import { fetchProteinModel } from '../utils/api';


export default function Render() {
  const route = useRoute();
  const [loading, setLoader] = useState(true);
  const [pdb, setPDB] = useState<{ atoms: [], connectors: [] }>()
  const [loadError, setError] = useState(undefined)

  const { item: ligand } = route.params as { item: string };

  useEffect(() => {
    setLoader(true);

    fetchProteinModel(ligand).finally(() => {
      setTimeout(() => {
        setLoader(false);
      }, 1000)
    }).then((data: any) => {
      setPDB(data)
    }).catch((err: any) => {
      setError(err.message || err)
    })

  }, [])

  return (
    <View style={styles.container}>
      <IsReadyPDB ligand={ligand} loader={loading} loadError={loadError}>
        <Text>Render Page</Text>
        <Text>Receive {ligand}</Text>
      </IsReadyPDB>
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
