import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const canvas = document.querySelector('.webgl')
const viewportSizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  64,
  viewportSizes.width / viewportSizes.height,
  0.1,
  1000,
)

/**
 * Creates a OrtographicCamera.
 * @param {number} left - The field of view: the extent of the scene that is seen on the display at any given moment. The value is in degrees.
 * @param {number} right - The size of the view: sizes.width / sizes.height.
 * @param {number} top - The field of view: the extent of the scene that is seen on the display at any given moment. The value is in degrees.
 * @param {number} bottom - The size of the view: sizes.width / sizes.height.
 * @param {number} near - The near clipping plane.
 * @param {number} far - The far clipping plane.
 */
// function THREE.PerspectiveCamera(left, right, top, bottom, near, far) {}
// const aspectRatio = viewportSizes.width / viewportSizes.height
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   100,
// )

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const renderer = new THREE.WebGLRenderer({
  canvas,
})
renderer.setClearColor(new THREE.Color(0x080808))
renderer.setSize(viewportSizes.width, viewportSizes.height)

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshPhongMaterial({ color: 0x66ff22 })
const cube = new THREE.Mesh(geometry, material)

scene.add(cube)

{
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.72)
  directionalLight.position.set(-1, 2, 4)
  scene.add(directionalLight)
}

camera.position.z = 3
camera.lookAt(cube.position)

const animate = () => {
  requestAnimationFrame(animate)

  // camera.position.x = cursorPosition.x * 4
  // camera.position.y = cursorPosition.y * 4
  // const angle = cursorPosition.x * Math.PI * 2
  // camera.position.x = Math.sin(angle) * 3
  // camera.position.z = Math.cos(angle) * 3
  // camera.position.y = cursorPosition.y * 4

  // Have the camera looking at the center, thus giving rotation effect
  // camera.lookAt(new THREE.Vector3())

  // Orbit Controls
  controls.update()

  renderer.render(scene, camera)
}

// Cursor
// const cursorPosition = {
//   x: 0,
//   y: 0,
// }

// const handleMouseMove = (event) => {
//   cursorPosition.x = (event.clientX / viewportSizes.width - 0.5) * -1
//   cursorPosition.y = event.clientY / viewportSizes.height - 0.5
// }

// window.addEventListener('mousemove', handleMouseMove)

animate()
