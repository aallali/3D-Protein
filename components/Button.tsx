import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Button({ title, onClick }: { title: string, onClick: () => void }) {
    return (
        <TouchableOpacity onPress={onClick} style={[styles.button, styles.shadowProp]}>
            <Text style={styles.buttonTitle}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonTitle: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
    },
    button: {
        padding: 5,
        backgroundColor: "gray",
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
    },
    shadowProp: {
        elevation: 1,
    }
})
