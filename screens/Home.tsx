import { StatusBar } from 'expo-status-bar';
import { ReactPropTypes } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavigateButtons from '../components/NavigateButtons';

export default function Home(props: any) {
    console.log(props)
    return (
        <View style={styles.container}>
            <Text>Home Page</Text>
            <NavigateButtons go={props.navigation.navigate} t={"home"}/>
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
