import * as THREE from "three"

const cross = new THREE.Group()
const crossVerticalGeometry = new THREE.BoxGeometry(0.1, 1.5, 0.1)
const crossHorizontalGeometry = new THREE.BoxGeometry(1, 0.1, 0.1)
const crossMaterial = new THREE.MeshStandardMaterial({
    color: "#fefffe"
})
const crossVertical = new THREE.Mesh(crossVerticalGeometry, crossMaterial)
const crossHorizontal = new THREE.Mesh(crossHorizontalGeometry, crossMaterial)

crossVertical.position.y = 1.5 / 2
crossHorizontal.position.y = 1

cross.add(crossVertical, crossHorizontal)

export default cross
