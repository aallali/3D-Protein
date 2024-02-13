//@ts-ignore
import * as THREE from "three";
import { Colors } from "./types.type";


export default function createConnector(atomA: any, atomB: any, color: Colors) {

    const height = atomA.distanceTo(atomB);
    const centerPosition = new THREE.Vector3(
        (atomA.x + atomB.x) / 2,
        (atomA.y + atomB.y) / 2,
        (atomA.z + atomB.z) / 2
    );

    const direction = new THREE.Vector3().subVectors(atomA, atomB).normalize();

    return createCylinder(height, color, centerPosition, direction)
}

function createCylinder(height: number, color: Colors, centerPosition: any, direction: any): THREE.Mesh {

    if (color === Colors.Default)
        color = Colors.White

    const radius = .1;
    const geometry = new THREE.CylinderGeometry(radius, radius, height, 32);

    const material = new THREE.MeshStandardMaterial({ color });

    const cylinder = new THREE.Mesh(geometry, material);

    cylinder.position.copy(centerPosition);

    cylinder.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
    return cylinder
}
