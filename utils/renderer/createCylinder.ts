import * as THREE from "three";

const createCylinder = (atomA: any, atomB: any, color: any) => {


    const height = atomA.distanceTo(atomB);
    const centerPosition = new THREE.Vector3(
        (atomA.x + atomB.x) / 2,
        (atomA.y + atomB.y) / 2,
        (atomA.z + atomB.z) / 2
    );

    const direction = new THREE.Vector3().subVectors(atomA, atomB).normalize();

    const radius = .2;
    const geometry = new THREE.CylinderGeometry(radius, radius, height, 32);

    const material = new THREE.MeshStandardMaterial({ color: color });

    const cylinder = new THREE.Mesh(geometry, material);

    cylinder.position.copy(centerPosition);

    cylinder.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
    return cylinder
}

export default createCylinder