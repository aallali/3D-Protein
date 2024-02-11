import React, { useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GLView, ExpoWebGLRenderingContext } from 'expo-gl';
import { Renderer } from 'expo-three';
//@ts-ignore
import * as THREE from "three";
import createMolecule from '../utils/render/createMolecule';
import createCamera from '../utils/render/createCamera';
import createLight from '../utils/render/createLight';
import Button from "../components/Button";
import {
    reset_settings,
    rotate,
    unify_color,
    update_atom_color,
    update_atom_shape,
    update_cylinder_color,
    update_cylinder_shape,
    zoom
} from '../utils/render_controls';


let molecule = null


export default function ProtScene({ data }: any) {

    const camera = useRef();
    const scene = useRef();
    const molecule = useRef();

    const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
        scene.current = new THREE.Scene();

        // Molecule
        molecule.current = createMolecule(data.atoms, data.connectors)
        scene.current.add(molecule.current);

        // Camera
        camera.current = createCamera(gl)
        scene.current.add(camera.current)

        // Light
        const light = createLight()
        scene.current.add(light);

        // Renderer
        const renderer = new Renderer({ gl });
        renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene.current, camera.current);
            // rotate horizontally


            gl.endFrameEXP();
        }
        animate();
    }

    return (
        <View style={{ flex: 1, paddingTop: 10 }}>
            <GLView
                style={{ width: '100%', aspectRatio: 1, backgroundColor: "black" }}
                onContextCreate={onContextCreate}
            />
            <View style={{ margin: 10 }}>
                <Text style={styles.sectionTitle}>Rotate the molecule (Horizontal/Vertical):</Text>
                <View style={{ flexDirection: "row", marginBottom: 5, gap: 4 }}>
                    <Button onClick={() => rotate(molecule, "H", 1)} title="H-Axis +" />
                    <Button onClick={() => rotate(molecule, "H", -1)} title="H-Axis -" />
                    <Button onClick={() => rotate(molecule, "V", 1)} title="V-Axis +" />
                    <Button onClick={() => rotate(molecule, "V", -1)} title="V-Axis -" />
                </View>

                <Text style={styles.sectionTitle}>Zoom In and Out:</Text>
                <View style={{ flexDirection: "row", marginBottom: 5, gap: 4 }}>
                    <Button onClick={() => zoom(camera, -1)} title="Zoom +" />
                    <Button onClick={() => zoom(camera, 1)} title="Zoom -" />
                </View>

                <Text style={styles.sectionTitle}>Customize Visualization Model:</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 5, gap: 4 }}>
                    <Button title={"Cylinder Color"} onClick={() => update_cylinder_color()} />
                    <Button title={"Cylinder Shape"} onClick={() => update_cylinder_shape()} />
                    <Button title={"unify Color"} onClick={() => unify_color()} />
                    <Button title={"Atoms Color"} onClick={() => update_atom_color()} />
                    <Button title={"Atoms Shape"} onClick={() => update_atom_shape()} />
                </View>
                <Text style={styles.sectionTitle}>Reet settings:</Text>
                <View style={{ flexDirection: "row", gap: 4 }}>
                    <Button title={"Reset"} onClick={() => reset_settings()} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    sectionTitle: {
        fontWeight: "bold"
    },
    container: {
        flex: 1,
    },
    glContainer: {
        flex: 1,
    },
    touchContainer: {
        ...StyleSheet.absoluteFillObject,
    },
});
