import { StyleSheet, Text, View } from "react-native";
import atomInfo from '../constants/colors.json';
import atomName from '../constants/atoms.json'
import { normalizeAtomSymbole } from "../utils/atomSymboleNormalizer";


interface Props {
    atom: string
}

const InfoBox = ({ atom }: Props) => {
    const atomSymbole = normalizeAtomSymbole(atom) as keyof typeof atomInfo
    const info = atomInfo[atomSymbole]

    return (
        <View style={styles.infoBox}>
            <Text>Atom: ( {atomSymbole} ) {atomName[atomSymbole]}</Text>
            <Text>discovered by: {info.discoverd_by}</Text>
            <Text>phase: {info.phase}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    infoBox: {
        position: 'absolute',
        top: 34,
        right: 10,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
        zIndex: 999
    },
});

export default InfoBox
