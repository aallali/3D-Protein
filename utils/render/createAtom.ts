//@ts-ignore
import * as THREE from "three";
import { TAtom } from "./types.type";


export default function createAtom(atom: TAtom) {
    let sphereGeometry = new THREE.SphereGeometry(0.4);
    let sphereMaterial = new THREE.MeshStandardMaterial({ color: 'red' });
    let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(atom.x, atom.y, atom.z)
    return sphere
}
