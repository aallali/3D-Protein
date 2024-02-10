//@ts-ignore
import * as THREE from "three";


export default function createLight() {
    // Light
    const light = new THREE.PointLight(0xffffff, 1000, 600);
    light.position.set(0, 0, 20); // Position the camera outside the scene
    light.lookAt(0,0,0); // Look at the center of the scene
    return light
}
