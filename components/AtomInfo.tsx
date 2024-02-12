import { StyleSheet, Text, View } from "react-native";
import atomInfo from '../constants/colors.json';

interface Props {
    atom: string
}

const InfoBox = ({ atom }: Props) => {
    const info = atomInfo[atom as keyof typeof atomInfo]

    return (
        <View style={styles.infoBox}>
            <Text>Atom: {atom}</Text>
            <Text>discovered by: {info.discoverd_by}</Text>
            <Text>phase: {info.phase}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    infoBox: {
        position: 'absolute',
        top: 20,
        right: 10,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
    },
});

export default InfoBox
