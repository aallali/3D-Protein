//@ts-ignore
import * as THREE from "three";
import { TAtom } from "./types.type";
import colors from '../../constants/colors.json'; // Assuming data.json is in the same directory


export default function createAtom(atom: TAtom) {
    const atomColor = parseInt(colors[atom.element].jmol, 16)
    let sphereGeometry = new THREE.SphereGeometry(0.4);
    let sphereMaterial = new THREE.MeshStandardMaterial({ color: atomColor });
    let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.name = atom.element
    sphere.position.set(atom.x, atom.y, atom.z)
    return sphere
}
