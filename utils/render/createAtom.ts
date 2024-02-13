//@ts-ignore
import * as THREE from "three";
import { Colors, TAtom, AtomShape } from "./types.type";
import colors from '../../constants/colors.json';
import { normalizeAtomSymbole } from "../atomSymboleNormalizer";


export default function createAtom(atom: TAtom, shape: AtomShape, color: Colors): THREE.Mesh {

    const shapes: { [key: string]: THREE.geometry } = {
        "box": () => new THREE.BoxGeometry(0.4, 0.4, 0.4),
        "sphere": () => new THREE.SphereGeometry(0.4),
        "icosahedron": () => new THREE.IcosahedronGeometry(0.4),
        "dodecahedron": () => new THREE.DodecahedronGeometry(0.4)
    }
    const atomSymbole = normalizeAtomSymbole(atom.element)
    const jmol = colors[atomSymbole as keyof typeof colors].jmol
    const atomColor = color === Colors.Default ? parseInt(jmol, 16) : color;
 
    const shapeGeometry = shapes[shape]()
    const sphereMaterial = new THREE.MeshStandardMaterial({ color: atomColor });
    const sphere = new THREE.Mesh(
        shapeGeometry,
        sphereMaterial
    );

    sphere.name = atom.element
    sphere.position.set(atom.x, atom.y, atom.z)
    return sphere
}
