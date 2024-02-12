import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { GLView, ExpoWebGLRenderingContext } from 'expo-gl';
import { Renderer } from 'expo-three';
import { Dimensions } from 'react-native';

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
import InfoBox from './AtomInfo';



export default function ProtScene({ data }: any) {

    const camera = useRef();
    const scene = useRef();
    const molecule = useRef();
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
        const renderer = new Renderer({ gl });
        renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
        console.log('renderer', renderer.domElement)
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


        // console.log('screen               ', screenWidth, screenWidth)

        // console.log('gl                   ', glWidth, glHeight)
        // console.log('page click           ', offsetX, offsetY)
        // console.log('mobile click mapped  ', canvasX, canvasY)

        // console.log('normalized           ', x, y)
        // console.log( event.nativeEvent)
        // Check if any objects were intersected
        if (intersects.length > 0) {
            const intersectedObject = intersects[0].object;
            if (intersectedObject.name)
                setSelectedObject(intersectedObject.name);
            console.log(intersectedObject.name)
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
            {selectedObject && <InfoBox atom={selectedObject} />}

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
