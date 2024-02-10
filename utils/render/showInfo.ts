//@ts-ignore
import * as THREE from "three";
import { TAtom } from "./types.type";
import colors from '../../constants/colors.json'; // Assuming data.json is in the same directory


export default  function onAtomClick(event:any, camera:any, scene: any) {
    // Calculate mouse coordinates relative to the renderer
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    // Perform raycasting
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    // Define an array to store intersected objects
    console.log('mouse click')
    const intersects = raycaster.intersectObjects(scene.children, true);
    // Check if any objects were intersected
    if (intersects.length > 0) {
        // Get the first intersected object (closest to the camera)
        const clickedObject = intersects[0].object;

        // Check if the clicked object is a sphere
        if (clickedObject.name) {
            // Handle the click on the sphere
            const info = colors[clickedObject.name]
            console.log('atom clicked!', info);
        }
    }
}