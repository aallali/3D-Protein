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


    // ISSUE:
    // a connector is represented as array of numbers 
    // each number represent index of atom
    // the first index represent the atom that making connection with other
    // [1 2 4] : atom#1 connected with Atom@2 && Atom#4
    // sometimes the list contain an index out of range of original list of atoms
    // we have.
    // eg: we have 23 atoms, and one of the connectors is [1 2 25]
    // so atom#1 trying to connect with Atm#2 && Atm#25, where the latter doesnt 
    // exists.

    // SOLUTION:
    // check if the the Atom(connector) exists
    // then loop through atoms(target) and create connection with valid ones

    connectors.forEach((c, i) => {
        const atom = atoms[c[0] - 1]
        if (atom) {
            let atomAPos = new THREE.Vector3(
                atoms[c[0] - 1].x,
                atoms[c[0] - 1].y,
                atoms[c[0] - 1].z
            )
            for (let i = 1; i < c.length; i++) {
                const atom = atoms[c[i] - 1]
                if (atom) {
                    let atomBPos = new THREE.Vector3(
                        atom.x,
                        atom.y,
                        atom.z
                    )

                    const connector = createConnector(atomAPos, atomBPos, 'white')
                    connector.position.sub(groupCenter);
                    molecule.add(connector)
                }
            }
        }
    })

    return molecule
}
