//@ts-ignore
import * as THREE from "three";
import createAtom from "./createAtom";
import { TAtoms, TConnectors } from "./types.type";
import createConnector from "./createCylinder";

// Function to calculate the center of the group of spheres
function calculateGroupCenter(atoms: TAtoms) {
    // Initialize variables to hold the sum of x, y, and z coordinates
    let sumX = 0;
    let sumY = 0;
    let sumZ = 0;

    // Iterate over all spheres to sum up their positions
    for (const sphere of atoms) {
        sumX += sphere.x;
        sumY += sphere.y;
        sumZ += sphere.z;
    }

    // Calculate the average position
    const numSpheres = atoms.length;
    const centerX = sumX / numSpheres;
    const centerY = sumY / numSpheres;
    const centerZ = sumZ / numSpheres;

    return new THREE.Vector3(centerX, centerY, centerZ);
}


export default function createMolecule(atoms: TAtoms, connectors: TConnectors) {
    const molecule = new THREE.Group();
    // Calculate the center of the group of spheres
    const groupCenter = calculateGroupCenter(atoms);

    atoms.forEach((ato) => {
        const atom = createAtom(ato)
        atom.position.sub(groupCenter);
        molecule.add(atom);
    })

    connectors.forEach(c => {
        let atomAPos = new THREE.Vector3(
            atoms[c[0] - 1].x,
            atoms[c[0] - 1].y,
            atoms[c[0] - 1].z
        )
        for (let i = 1; i < c.length; i++) {
            let atomBPos = new THREE.Vector3(
                atoms[c[i] - 1].x,
                atoms[c[i] - 1].y,
                atoms[c[i] - 1].z
            )
            const connector = createConnector(atomAPos, atomBPos, 'white')
            connector.position.sub(groupCenter);
            molecule.add(connector)
        }
    })
    return molecule
}
