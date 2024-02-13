import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Button from "../components/Button";
import {
    reset_settings,
    rotate,
    screenshotMolecule,
    update_atom_color,
    update_atom_shape,
    update_cylinder_color,
    update_cylinder_shape,
    zoom
} from '../utils/render_controls';


interface TRefs {
    molecule: React.MutableRefObject<any>
    camera: React.MutableRefObject<any>
    glViewRef: React.MutableRefObject<any>
}
export default function SceneControlls({ refs }: any) {
    const { molecule, camera, glViewRef } = refs
    return (
        <ScrollView>
            <View style={{ margin: 10 }}>
                <Text style={styles.sectionTitle}>Rotate/Zoom the molecule (Horizontal/Vertical):</Text>
                <View style={{ flexDirection: "row", marginBottom: 5, gap: 4 }}>
                    <Button onClick={() => rotate(molecule, "H", 1)} title="H+" />
                    <Button onClick={() => rotate(molecule, "H", -1)} title="H-" />
                    <Button onClick={() => rotate(molecule, "V", 1)} title="V+" />
                    <Button onClick={() => rotate(molecule, "V", -1)} title="V-" />
                    <Button onClick={() => zoom(camera, -1)} title="Zoom +" />
                    <Button onClick={() => zoom(camera, 1)} title="Zoom -" />
                </View>
                <Text style={styles.sectionTitle}>Take a snapshot and share it:</Text>
                <View style={{ flexDirection: "row", marginBottom: 5, gap: 4 }}>
                    <Button onClick={() => screenshotMolecule(glViewRef)} title="Share" />
                </View>
                <Text style={styles.sectionTitle}>Customize Visualization Model:</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 5, gap: 4 }}>
                    <Button title={"Connector Color"} onClick={() => update_cylinder_color()} />
                    <Button title={"Connector Shape"} onClick={() => update_cylinder_shape()} />
                    <Button title={"Atoms Color"} onClick={() => update_atom_color()} />
                    <Button title={"Atoms Shape"} onClick={() => update_atom_shape()} />
                </View>
                <Text style={styles.sectionTitle}>Reet settings:</Text>
                <View style={{ flexDirection: "row", gap: 4 }}>
                    <Button title={"Reset"} onClick={() => reset_settings()} />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    sectionTitle: {
        fontWeight: "bold",
        fontSize: 15
    }
});
