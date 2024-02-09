import React from 'react';
import { View } from 'react-native';
import { GLView, ExpoWebGLRenderingContext } from 'expo-gl';
import { Renderer } from 'expo-three';
import * as THREE from "three";

export default function ProtScene() {
    const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
        const scene = new THREE.Scene();

        // Sphere
        let sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
        let sphereMaterial = new THREE.MeshStandardMaterial({ color: 'red' });
        let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(0, 5, 1)
        scene.add(sphere);
        // #############################################################

        // Sphere2
        sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
        sphereMaterial = new THREE.MeshStandardMaterial({ color: 'red' });
        sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(0, 1, 1)
        scene.add(sphere);
        // #############################################################

        // Light
        const light = new THREE.PointLight(0xffffff, 400, 600);
        light.position.set(5, 10, 10)
        scene.add(light);

        // Camera
        const aspect = gl.drawingBufferWidth / gl.drawingBufferHeight
        const camera = new THREE.PerspectiveCamera(45, aspect);
        camera.position.z = 20; // Move the camera further from the cube
        scene.add(camera)
        // #############################################################

        const renderer = new Renderer({ gl });
        renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            gl.endFrameEXP();
        }
        animate();
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <GLView style={{ width: 370, height: 600, backgroundColor:"gray" }} onContextCreate={onContextCreate} />
        </View>
    );
}
