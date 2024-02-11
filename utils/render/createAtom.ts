//@ts-ignore
import * as THREE from "three";
import { TAtom } from "./types.type";
import colors from '../../constants/colors.json';


export default function createAtom(atom: TAtom) {
    const jmol = colors[atom.element as keyof typeof colors].jmol
    const atomColor = parseInt(jmol, 16);

    const sphereGeometry = new THREE.SphereGeometry(0.4);
    const sphereMaterial = new THREE.MeshStandardMaterial({ color: atomColor });
    const sphere = new THREE.Mesh(
        sphereGeometry,
        sphereMaterial
    );

    sphere.name = atom.element
    sphere.position.set(atom.x, atom.y, atom.z)
    return sphere
}
