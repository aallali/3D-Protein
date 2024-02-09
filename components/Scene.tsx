import React from 'react';
import { View } from 'react-native';
import { GLView, ExpoWebGLRenderingContext } from 'expo-gl';
import { Renderer } from 'expo-three';
import * as THREE from "three";


// Calculate the center of all sphere positions
function calculateCenterOfSpheres(spheres: any[]) {
    let centerX = 0;
    let centerY = 0;
    let centerZ = 0;

    for (let sphere of spheres) {
        centerX += sphere.position.x;
        centerY += sphere.position.y;
        centerZ += sphere.position.z;
    }

    const numSpheres = spheres.length;
    centerX /= numSpheres;
    centerY /= numSpheres;
    centerZ /= numSpheres;

    return new THREE.Vector3(centerX, centerY, centerZ);
}


export default function ProtScene({ data }: any) {
    const spheresGroup = new THREE.Group();
    if (!data)
        return

    const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
        let spheres: any = []
        const scene = new THREE.Scene();
        data.atoms.forEach((el: any[]) => {
            let sphereGeometry = new THREE.SphereGeometry(0.5);
            let sphereMaterial = new THREE.MeshStandardMaterial({ color: 'red' });
            let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            sphere.position.set(el.x, el.y, el.z)
            spheresGroup.add(sphere);
            spheres.push(sphere); // Add sphere to array
        })

        // // #############################################################
        // Calculate the center of the group
        const rotationCenterSphereIndex = parseInt((data.atoms.length / 2) + ""); // Index of the sphere to use as rotation center

        // Find the rotation center sphere
        const rotationCenterSphere = spheresGroup.children[rotationCenterSphereIndex];
        console.log(rotationCenterSphere.position)
        // Calculate the offset between the rotation center sphere and the group's center
        const groupBoundingBox = new THREE.Box3().setFromObject(spheresGroup);
        const groupCenter = groupBoundingBox.getCenter(new THREE.Vector3());
        const offset = new THREE.Vector3().subVectors(groupCenter, rotationCenterSphere.position);

        // Set the group's position relative to the offset
        spheresGroup.position.sub(offset);


        scene.add(spheresGroup);


        // Light
        const light = new THREE.PointLight(0xffffff, 400, 600);
        light.position.set(5, 10, 30)
        scene.add(light);

        // Camera
        const aspect = gl.drawingBufferWidth / gl.drawingBufferHeight
        const camera = new THREE.PerspectiveCamera(55, aspect);
        // camera.position.x = 10;
        // updateCameraPosition(camera, spheres);
        camera.position.set(0, 0, 90); // Position the camera outside the scene
        camera.lookAt(rotationCenterSphere.position.x, rotationCenterSphere.position.y, rotationCenterSphere.position.z); // Look at the center of the scene
        scene.add(camera)
        // #############################################################

        const renderer = new Renderer({ gl });
        renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

        const animate = () => {
            requestAnimationFrame(animate);
            // spheresGroup.rotation.y += 0.1;
            // spheresGroup.rotation.x += 0.1;
            // spheresGroup.rotation.z += 0.001;
            renderer.render(scene, camera);
            gl.endFrameEXP();
        }
        animate();
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <GLView style={{ width: 370, height: 600, backgroundColor: "gray" }} onContextCreate={onContextCreate} />
        </View>
    );
}
