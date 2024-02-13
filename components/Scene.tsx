import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { GLView, ExpoWebGLRenderingContext } from 'expo-gl';
import { Renderer } from 'expo-three';
import { Dimensions } from 'react-native';
//@ts-ignore
import * as THREE from "three";
import { createMolecule, createCamera, createLight } from "../utils/render"
import InfoBox from './AtomInfo';
import Vif from './Vif';
import ViewShot, { CaptureOptions } from "react-native-view-shot";
import { AtomShape, Colors, TPDB } from '../utils/render/types.type';
import SceneControlls from './SceneControlls';


interface Props {
    data: TPDB;
    ligand: string
}


export default function ProtScene({ data, ligand }: Props) {

    // init ThreeJs instances
    const camera = useRef<THREE.camera>();
    const scene = useRef<THREE.scene>();
    const molecule = useRef<THREE.Group>();
    const [glViewKey, updateGlVKey] = useState<number>(0);
    const glViewRef = useRef<any>(null);

    // the width and height of the WebGL canvas
    const [glWidth, setGLWidth] = useState(0);
    const [glHeight, setGLHeight] = useState(0);
    const [selectedObject, setSelectedObject] = useState<string | null>(null);

    // Shapes && colors updater
    const [styleOptions, updateStyleOptions] = useState({
        atomColorIdx: 0,
        atomShapeIdx: 0,
        connectorColorIdx: 0,
        colorsLength: Object.values(Colors).length,
        atomShapeLength: Object.values(AtomShape).length,
    })

    // Track if the component mounted or not
    const isMountingRef = useRef(false);

    // mobile screen size
    const { width: SCREEN_WIDTH } = Dimensions.get('window');

    // set options for view shot component
    const viewShotOptions: CaptureOptions = {
        fileName: `protein_${ligand}_`,
        format: "jpg",
        quality: 0.9
    }


    useEffect(() => {
        // avoid ThreeJs rendering upon the first component render
        if (isMountingRef.current) {
            updateGlVKey(prev => prev + 1)
        } else {
            isMountingRef.current = true
        }
    }, [
        styleOptions,
    ])


    const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
        scene.current = new THREE.Scene();

        // set width and height of the WebGL canvas
        setGLWidth(gl.drawingBufferWidth);
        setGLHeight(gl.drawingBufferHeight);

        // Molecule
        molecule.current = createMolecule(data.atoms, data.connectors, {
            atomColor: Object.values(Colors)[styleOptions.atomColorIdx],
            atomShape: Object.values(AtomShape)[styleOptions.atomShapeIdx],
            connectorColor: Object.values(Colors)[styleOptions.connectorColorIdx],
        })
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


        const animate = async () => {
            requestAnimationFrame(animate);
            renderer.render(scene.current, camera.current);
            // rotate horizontally
            gl.endFrameEXP();

        }

        animate();
    }


    const handleTouch = (event: any) => {
        // offset of the mouse click position relative to the actual scene, not the entire screen
        const { locationX, locationY } = event.nativeEvent;

        // Map touch event coordinates to WebGL canvas size
        // NOTE: both divided by screenWidth for aspect ratio 1:1
        const canvasX = (locationX / SCREEN_WIDTH) * glWidth;
        const canvasY = (locationY / SCREEN_WIDTH) * glHeight;

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
        <View style={{ flex: 1 }}>
            <ViewShot
                ref={glViewRef}
                options={viewShotOptions}
                style={{
                    backgroundColor: '#264348'
                }}>
                <Text style={styles.title}>Ligand: {ligand}</Text>
                <Vif c={!!selectedObject}>
                    <InfoBox atom={selectedObject as string} />
                </Vif>
                <TouchableWithoutFeedback onPress={handleTouch}>
                    <GLView
                        style={styles.GLView}
                        onContextCreate={onContextCreate}
                        key={glViewKey}
                    />
                </TouchableWithoutFeedback>
            </ViewShot>

            <SceneControlls refs={{ molecule, camera, glViewRef, styleUpdateDispatcher: updateStyleOptions }} />
        </View>
    );
}

const styles = StyleSheet.create({
    sectionTitle: {
        fontWeight: "bold",
        fontSize: 15
    },
    container: {
        flex: 1,
    },
    title: {
        alignSelf: 'center',
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    glContainer: {
        flex: 1,
    },
    touchContainer: {
        ...StyleSheet.absoluteFillObject,
    },
    GLView: {
        width: '100%',
        aspectRatio: 1,
        backgroundColor: "#264348",
    }
});
