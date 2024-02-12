import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { GLView, ExpoWebGLRenderingContext } from 'expo-gl';
import { Renderer } from 'expo-three';
import { Dimensions } from 'react-native';
//@ts-ignore
import * as THREE from "three";
import { createMolecule, createCamera, createLight } from "../utils/render"
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
import InfoBox from './AtomInfo';
import Vif from './Vif';


export default function ProtScene({ data }: any) {

    // init ThreeJs instances
    const camera = useRef<THREE.camera>();
    const scene = useRef<THREE.scene>();
    const molecule = useRef<THREE.Group>();

    // the width and height of the WebGL canvas
    const [glWidth, setGLWidth] = useState(0);
    const [glHeight, setGLHeight] = useState(0);
    const [selectedObject, setSelectedObject] = useState<string | null>(null);
    // mobile screen size
    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

    const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
        scene.current = new THREE.Scene();

        // set width and height of the WebGL canvas
        setGLWidth(gl.drawingBufferWidth);
        setGLHeight(gl.drawingBufferHeight);

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
        const renderer: THREE.WebGLRenderer = new Renderer({ gl });
        renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene.current, camera.current);
            // rotate horizontally
            gl.endFrameEXP();
        }
        animate();
    }


    const handleTouch = (event: any) => {
        // offset of the mouse click position relative to the actual scene, not the entire screen
        const { offsetX, offsetY } = event.nativeEvent;

        // Map touch event coordinates to WebGL canvas size
        const canvasX = (offsetX / screenWidth) * glWidth;
        const canvasY = (offsetY / screenWidth) * glHeight;

        // Normalize the mapped coordinates
        const x = (canvasX / glWidth) * 2 - 1;
        const y = -(canvasY / glHeight) * 2 + 1;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera({ x, y }, camera.current);

        const intersects = raycaster.intersectObjects(scene.current.children, true);

        // Check if any objects were intersected
        if (
            intersects.length > 0 &&
            intersects[0].object &&
            intersects[0].object.name
        ) {
            setSelectedObject(intersects[0].object.name);
        } else {
            setSelectedObject(null);
        }
    };

    return (
        <View style={{ flex: 1, paddingTop: 10 }}>

            <TouchableWithoutFeedback onPress={handleTouch}>
                <GLView
                    style={{ width: '100%', aspectRatio: 1, backgroundColor: "black" }}
                    onContextCreate={onContextCreate}
                />
            </TouchableWithoutFeedback>
            <Vif c={!!selectedObject}>
                <InfoBox atom={selectedObject as string} />
            </Vif>

            <ScrollView>
                <View style={{ margin: 10 }}>
                    <Text style={styles.sectionTitle}>Rotate the molecule (Horizontal/Vertical):</Text>
                    <View style={{ flexDirection: "row", marginBottom: 5, gap: 4 }}>
                        <Button onClick={() => rotate(molecule, "H", 1)} title="H+" />
                        <Button onClick={() => rotate(molecule, "H", -1)} title="H-" />
                        <Button onClick={() => rotate(molecule, "V", 1)} title="V+" />
                        <Button onClick={() => rotate(molecule, "V", -1)} title="V-" />
                    </View>

                    <Text style={styles.sectionTitle}>Zoom In and Out:</Text>
                    <View style={{ flexDirection: "row", marginBottom: 5, gap: 4 }}>
                        <Button onClick={() => zoom(camera, -1)} title="Zoom +" />
                        <Button onClick={() => zoom(camera, 1)} title="Zoom -" />
                    </View>
                    <Text style={styles.sectionTitle}>Take a screenshot and share it:</Text>
                    <View style={{ flexDirection: "row", marginBottom: 5, gap: 4 }}>
                        <Button onClick={() => screenshotMolecule()} title="Share" />
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
