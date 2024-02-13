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
        paddingHorizontal: 10,
        paddingVertical: 7,
        backgroundColor: "#264348",
        borderRadius: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    shadowProp: {
        elevation: 1,
    }
})
