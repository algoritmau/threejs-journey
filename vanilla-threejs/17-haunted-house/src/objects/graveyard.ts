import * as THREE from "three"

const graveyard = new THREE.Group()
const tombstoneGeometry = new THREE.BoxGeometry(1, 1.6, 0.2)
const tombstoneMaterial = new THREE.MeshStandardMaterial({
    color: "#b2b6b1"
})

for (let i = 0; i < 50; i++) {
    const ANGLE = Math.PI * 2 * Math.random()
    const RADIUS = Math.random() * 6 + 8
    const coordinates = {
        x: Math.sin(ANGLE) * RADIUS,
        y: 0,
        z: Math.cos(ANGLE) * RADIUS
    }
    const tombstone = new THREE.Mesh(tombstoneGeometry, tombstoneMaterial)

    tombstone.position.set(coordinates.x, coordinates.y, coordinates.z)

    tombstone.rotation.y = (Math.random() - 0.5) * 0.48
    tombstone.rotation.z = (Math.random() - 0.5) * 0.56

    tombstone.castShadow = true
    tombstone.receiveShadow = true

    graveyard.add(tombstone)
}

export default graveyard
