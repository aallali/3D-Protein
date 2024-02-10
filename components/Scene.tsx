import React from 'react';
import { View } from 'react-native';
import { GLView, ExpoWebGLRenderingContext } from 'expo-gl';
import { Renderer } from 'expo-three';
//@ts-ignore
import * as THREE from "three";
import createMolecule from '../utils/render/createMolecule';
import createCamera from '../utils/render/createCamera';
import createLight from '../utils/render/createLight';
import onAtomClick from '../utils/render/showInfo';


export default function ProtScene({ data }: any) {
    if (!data)
        return
    // data.connectors.forEach(el => console.log(el))
    const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
        const scene = new THREE.Scene();

        // Molecule
        const molecule = createMolecule(data.atoms, data.connectors)
        scene.add(molecule);

        // Camera
        const camera = createCamera(gl)
        scene.add(camera)

        // Light
        const light = createLight()
        scene.add(light);

        //  Y Axis : cylinder to represent Y Axis
        // const geometry = new THREE.CylinderGeometry(.1, .1, 32);
        // const material = new THREE.MeshStandardMaterial({ color: 0xffff00 });
        // const cylinder = new THREE.Mesh(geometry, material); scene.add(cylinder);
        // cylinder.position.set(0, 0, 0)
        // scene.add(cylinder)

        // Renderer
        const renderer = new Renderer({ gl });
        renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
        // Click Event

        document.addEventListener('click', (e) => onAtomClick(e, camera, scene), false);
   
        renderer.render(scene, camera);

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            // rotate horizontally
            molecule.rotation.y += 0

            gl.endFrameEXP();
        }
        // animate();
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <GLView key={Math.random()} style={{ width: 370, height: 600, backgroundColor: "gray" }} onContextCreate={onContextCreate} />
        </View>
    );
}
