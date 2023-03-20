import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import './style.sass'

const viewportSize = {
  width: window.innerWidth,
  height: window.innerHeight
}

/**
 * Setting up and creating a camera
 */
const camConfig = {
  size: {
    width: viewportSize.width,
    height: viewportSize.height
  },
  frustum: {
    verticalFov: 64,
    aspectRatio: viewportSize.width / viewportSize.height,
    nearPlane: 0.08,
    farPlane: 1024
  }
}

const camera = new THREE.PerspectiveCamera(
  camConfig.frustum.verticalFov,
  camConfig.frustum.aspectRatio,
  camConfig.frustum.nearPlane,
  camConfig.frustum.farPlane
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
//   camConfig.frustum.aspectRatio * -1,
//   camConfig.frustum.aspectRatio * 1,
//   1,
//   -1,
//   camConfig.frustum.nearPlane,
//   camConfig.frustum.farPlane
// )

/* Creating cube from geometry and material */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshPhongMaterial({ color: 0x00ef44 })
const cube = new THREE.Mesh(geometry, material)

/* Set up scene */
const scene = new THREE.Scene()

scene.add(cube)

/**
 * Creating and setting up the renderer
 */
const canvas = document.getElementById('webgl') as HTMLCanvasElement
const renderer = new THREE.WebGLRenderer({
  canvas
})

// Settting the renderer's size
renderer.setSize(camConfig.size.width, camConfig.size.height)

/**
 * Adding lights for better perception of 3D space
 */
{
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.72)
  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.72)

  directionalLight.position.set(-1, 2, 4)
  directionalLight2.position.set(1, -2, -4)

  scene.add(directionalLight)
  scene.add(directionalLight2)
}

// Move the camera backwards prior rendering
camera.position.z = 2

/**
 * Cursor positioning
 */
// const cursorCoordinates = {
//   x: 0,
//   y: 0
// }

// window.addEventListener('mousemove', (e) => {
//   cursorCoordinates.x = e.clientX / viewportSize.width - 0.5
//   cursorCoordinates.y = e.clientY / viewportSize.height - 0.5
// })

/**
 * Orbit controls
 */
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const animate = () => {
  requestAnimationFrame(animate)

  // camera.position.x = cursorCoordinates.x * 3.2
  // camera.position.y = cursorCoordinates.y * -3.2
  // const cameraAngle = cursorCoordinates.x * Math.PI * 2.3

  // camera.position.set(
  //   Math.sin(cameraAngle) * 3.2,
  //   cursorCoordinates.y * 4.8,
  //   Math.cos(cameraAngle) * 3.2
  // )

  // camera.lookAt(cube.position)

  controls.update()

  renderer.render(scene, camera)
}

animate()
