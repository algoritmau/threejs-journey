import * as THREE from 'three'

import './style.sass'

// HTML Element where result will be rendered to
const canvas = document.getElementById('webgl') as HTMLCanvasElement
const scene = new THREE.Scene()

// Creating a camera
const cameraSizes = {
  width: 800,
  height: 600
}
const cameraFrustumAspectRatio = cameraSizes.width / cameraSizes.height
const cameraFrustumVerticalFieldOfView = 64
const cameraFrustumNearPlane = 0.1
const cameraFrustumFarPlane = 1000

/**
 * Creates a PerspectiveCamera.
 * @param {number} FOV - The field of view: the extent of the scene that is seen on the display at any given moment. The value is in degrees.
 * @param {number} aspectRatio - The size of the view: cameraSizes.width / cameraSizes.height.
 * @param {number} near - The near clipping plane.
 * @param {number} far - The far clipping plane.
 */
const camera = new THREE.PerspectiveCamera(
  cameraFrustumVerticalFieldOfView,
  cameraFrustumAspectRatio,
  cameraFrustumNearPlane,
  cameraFrustumFarPlane
)

const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0x66ff22 })
// Changing material type so that light gets reflected on the box
const material = new THREE.MeshPhongMaterial({ color: 0x66ff22 })

// Create the cube from the geometry and the material defined above
const cube = new THREE.Mesh(geometry, material)

// Add the cube to the scene
scene.add(cube)

// Creating the renderer
/*
  Renderer - Renders the scene from the camera's pov
  Threejs draws the result in a canvas via WebGL
*/
const renderer = new THREE.WebGLRenderer({
  canvas
})

// Settting the renderer's size
renderer.setSize(cameraSizes.width, cameraSizes.height)

// Adding a light for better 3D perception
{
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.72)

  directionalLight.position.set(-1, 2, 4)

  scene.add(directionalLight)
}

// Move the camera backwards prior rendering
camera.position.x = 1
camera.position.z = 4
camera.position.z = 3

/* Axes helper */
const axesHelperGuides = new THREE.AxesHelper()

scene.add(axesHelperGuides)

/* Scaling */
// cube.scale.x = 0.8
// cube.scale.y = 1
// cube.scale.z = 0.8

// Scaling all properties at once
cube.scale.set(0.8, 1, 0.8)

camera.lookAt(cube.position)

// Rendering the scene
const animate = () => {
  requestAnimationFrame(animate)

  cube.rotation.x += 0.01
  cube.rotation.y += 0.01

  renderer.render(scene, camera)
}

animate()
