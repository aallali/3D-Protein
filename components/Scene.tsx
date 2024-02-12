import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
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



export default function ProtScene({ data }: any) {

    const camera = useRef();
    const scene = useRef();
    const molecule = useRef();
    // the width and height of the WebGL canvas
    const [glWidth, setGLWidth] = useState(0);
    const [glHeight, setGLHeight] = useState(0);
    const [selectedObject, setSelectedObject] = useState<string | null>(null);

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

    // InfoBox component for displaying object information
    const InfoBox = ({ objectType }) => (
        <View style={styles.infoBox}>
            <Text>Object: {objectType}</Text>
        </View>
    );

    const handleTouch = (event: any) => {
        const { pageX, pageY } = event.nativeEvent;
        const x = pageX / glWidth * 2 - 1;
        const y = -(pageY / glHeight) * 2 + 1;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera({ x, y }, camera.current);

        console.log('scene ', glWidth, glHeight)

        const intersects = raycaster.intersectObjects(scene.current.children, true);
        console.log('intersects', intersects)

        // Check if any objects were intersected
        if (intersects.length > 0) {
            const intersectedObject = intersects[0].object;
            // Handle click on intersected object
            setSelectedObject('Sphere');

            console.log('Object clicked:', intersectedObject);
        }
        console.log('hi', x, y)
    }

    return (
        <View style={{ flex: 1, paddingTop: 10 }}>

            <TouchableWithoutFeedback onPress={handleTouch}>
                <GLView
                    style={{ width: '100%', aspectRatio: 1, backgroundColor: "black" }}

                    onContextCreate={onContextCreate}
                />
            </TouchableWithoutFeedback>
            {selectedObject && <InfoBox objectType={selectedObject} />}

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
