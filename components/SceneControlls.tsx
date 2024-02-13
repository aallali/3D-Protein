import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import Button from "../components/Button";
import {
    rotate,
    screenshotMolecule,
    zoom
} from '../utils/render_controls';
import { Colors } from '../utils/render/types.type';


interface TRefs {
    molecule: React.MutableRefObject<any>
    camera: React.MutableRefObject<any>
    glViewRef: React.MutableRefObject<any>,
    styleUpdateDispatcher: React.Dispatch<React.SetStateAction<{
        atomColorIdx: number;
        atomShapeIdx: number;
        connectorColorIdx: number;
        colorsLength: number;
        atomShapeLength: number;
    }>>
}


export default function SceneControlls({ refs }: { refs: TRefs }) {
    const { molecule, camera, glViewRef, styleUpdateDispatcher } = refs


    function getNextAtomColor() {
        styleUpdateDispatcher((prev) => {

            // This check is necessary so we have atleast a mesh (atoms or connectors) 
            // rendered in scene
            // either atom or connector, to avoid a shadering error frfom Three.js
            // The logic is as follows
            // if connector is Transparent (none) and atom is about to be Transparent
            // then reset connector to a visible state.
            if (Object.values(Colors)[prev.connectorColorIdx] === Colors.None
                && Object.values(Colors)[prev.atomColorIdx + 1] === Colors.None) {
                prev.connectorColorIdx = 0
            }
            const newAtomColorIdx = prev.atomColorIdx
                === prev.colorsLength - 1
                ? 0
                : prev.atomColorIdx + 1
            return {
                ...prev,
                atomColorIdx: newAtomColorIdx
            }
        })
    }


    function getNextConnectorColor() {
        styleUpdateDispatcher((prev) => {
            // The same reason behind the check in getNextAtomColor() 
            if (Object.values(Colors)[prev.atomColorIdx] === Colors.None
                && Object.values(Colors)[prev.connectorColorIdx + 1] === Colors.None) {
                prev.atomColorIdx = 0
            }

            const newConnectorColorIdx = prev.connectorColorIdx
                === prev.colorsLength - 1
                ? 0
                : prev.connectorColorIdx + 1;

            return {
                ...prev,
                connectorColorIdx: newConnectorColorIdx
            }
        })
    }


    function getNextAtomShape() {
        styleUpdateDispatcher((prev) => {
            return {
                ...prev,
                atomShapeIdx: prev.atomShapeIdx === prev.atomShapeLength - 1 ? 0 : prev.atomShapeIdx + 1
            }
        })
    }


    function resetProteinRender() {
        styleUpdateDispatcher((prev) => ({
            ...prev,
            atomColorIdx: 0,
            atomShapeIdx: 0,
            connectorColorIdx: 0,
        }))
    }


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
                    <Button title={"Connector Color"} onClick={() => getNextConnectorColor()} />
                    <Button title={"Atoms Color"} onClick={() => getNextAtomColor()} />
                    <Button title={"Atoms Shape"} onClick={() => getNextAtomShape()} />
                </View>
                <Text style={styles.sectionTitle}>Reet settings:</Text>
                <View style={{ flexDirection: "row", gap: 4 }}>
                    <Button title={"Reset"} onClick={() => resetProteinRender()} />
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
