
export default function rotate(molecule: any, axis: "V" | "H", direction: 1 | -1) {
    if (axis === "V") {
        molecule.current.rotation.x += 0.3 * direction
    } else {
        molecule.current.rotation.z += 0.3 * direction
    }
}
