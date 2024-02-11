

export default function zoom(camera: any, direction: 1 | -1) {
    camera.current.position.z += 2 * direction
}
