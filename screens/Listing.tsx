import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import ligands from "../const/ligands.json"
import { useEffect, useState } from 'react';

export default function Listing(props: any) {
  const [data, setData] = useState(ligands);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search == "") return
    else {
      const targetLigands = ligands.filter((element) =>
        element.includes(search.toUpperCase())
      );
      setData(targetLigands);
    }
  }, [search]);
  return (
    <View style={styles.container}>
      {/* <Text>Ligands List Page</Text> */}
      {/* <NavigateButtons go={props?.navigation?.navigate} t={"listing"} /> */}
      <FlatList
        style={styles.ligandsList}
        ListHeaderComponent={
          <>
            <View style={styles.searchComponent}>
              <View style={styles.searchContainer}>
                <Image
                  style={styles.imageStyle}
                  source={require("../assets/search.png")}
                />
                <TextInput
                  style={styles.searchInputStyle}
                  value={search}
                  onChangeText={setSearch}
                  placeholder="Search by ligand..."
                  placeholderTextColor="#555"
                />
              </View>
              <Text style={{ fontSize: 15 }}>Total Ligands we have : {data.length}</Text>
            </View>

          </>
        }
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.ligandItem, styles.shadowProp]}
            onPress={() => props.navigation.navigate('render', { item })}
          >
            <Text style={styles.ligandItemText}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  ligandsList: {
    // marginTop: 20,
  },
  ligandItem: {
    height: 45,
    margin: 5,

    width: "97%",
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,

    borderRadius: 10,
    borderColor: "black",
    backgroundColor: "#fff",
  },
  shadowProp: {
    elevation: 2,
  },
  ligandItemText: {
    width: "100%",
    marginLeft: 10,
    color: "black",
    fontSize: 20,
    textAlign: "center",
  },
  searchComponent: {
    height: 100,
    backgroundColor: "#ededed",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  searchContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
    height: 40,
    width: "100%",
    borderRadius: 10,

    borderWidth: 1,
    borderColor: "#777",
    marginBottom: 40
  },
  searchInputStyle: {
    // backgroundColor: "#fff",
    height: "100%",
    width: "90%",
    paddingLeft: 10,
    color: "gray",
  },
  imageStyle: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});
