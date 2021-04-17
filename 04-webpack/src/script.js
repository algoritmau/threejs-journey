import './style.css'
import * as THREE from 'three'

const canvas = document.querySelector('.webgl')
const viewportSizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const scene = new THREE.Scene()

/**
 * Creates a PerspectiveCamera.
 * @param {number} FOV - The field of view: the extent of the scene that is seen on the display at any given moment. The value is in degrees.
 * @param {number} aspectRatio - The size of the view: sizes.width / sizes.height.
 * @param {number} near - The near clipping plane.
 * @param {number} far - The far clipping plane.
 */
// function THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far) {}
const camera = new THREE.PerspectiveCamera(
  64,
  viewportSizes.width / viewportSizes.height,
  0.1,
  1000,
)

const renderer = new THREE.WebGLRenderer({
  canvas,
})
renderer.setClearColor(new THREE.Color(0x080808))
renderer.setSize(viewportSizes.width, viewportSizes.height)

// ~ RED CUBE ~
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0x66ff22 })
const cube = new THREE.Mesh(geometry, material)

scene.add(cube)

camera.position.z = 3

const animate = () => {
  requestAnimationFrame(animate)

  cube.rotation.x += 0.01
  cube.rotation.y += 0.01

  renderer.render(scene, camera)
}

animate()
