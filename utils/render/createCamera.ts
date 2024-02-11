//@ts-ignore
import * as THREE from "three";


export default function createCamera(gl: any) {
    // Camera
    const aspect = gl.drawingBufferWidth / gl.drawingBufferHeight
    const camera = new THREE.PerspectiveCamera(20, aspect);

    camera.position.set(0, 0, 60); // Position the camera outside the scene
    camera.lookAt(0,0,0); // Look at the center of the scene
    return camera
}
