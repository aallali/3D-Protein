//@ts-ignore
import * as THREE from "three";


export default function createCamera(gl: any) {
    // Camera
    const aspect = gl.drawingBufferWidth / gl.drawingBufferHeight
    const camera = new THREE.PerspectiveCamera(30, aspect);
    // camera.position.x = 10;
    // updateCameraPosition(camera, spheres);
    camera.position.set(0, 0, 50); // Position the camera outside the scene
    camera.lookAt(0,0,0); // Look at the center of the scene
    return camera
}
