import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { shouldResize } from '../utils'

import './style.sass'

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const ambientOcclusionTexture = textureLoader.load(
  '/textures/door/ambientOcclusion.jpg'
)
const colorTexture = textureLoader.load('/textures/door/color.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
// const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
// const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const largeCheckerboardTexture = textureLoader.load(
  '/textures/checkerboard-1024x1024.png'
)
const smallCheckerboardTexture = textureLoader.load(
  '/textures/checkerboard-8x8.png'
)
const minecraftTexture = textureLoader.load('/textures/minecraft.png')

// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3

// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping
// colorTexture.wrapS = THREE.MirroredRepeatWrapping
// colorTexture.wrapT = THREE.MirroredRepeatWrapping

// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5

// colorTexture.rotation = Math.PI * 0.25

// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5

smallCheckerboardTexture.magFilter = THREE.NearestFilter
minecraftTexture.magFilter = THREE.NearestFilter

colorTexture.minFilter = THREE.NearestFilter
largeCheckerboardTexture.minFilter = THREE.NearestFilter

// Disable mipmapping when using nearest filter for minFilter
largeCheckerboardTexture.generateMipmaps = false

// Renderer
const canvas = document.getElementById('webgl') as HTMLCanvasElement
const renderer = new THREE.WebGLRenderer({
  canvas
})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Camera
const camera = new THREE.PerspectiveCamera(80, 2, 0.08, 1024)
camera.position.set(0, 0, 4)

// Scene
const scene = new THREE.Scene()

// Create 4 cubes, each with different texture
const doorCubeMaterial = new THREE.MeshPhongMaterial({
  alphaMap: alphaTexture,
  aoMap: ambientOcclusionTexture,
  displacementMap: heightTexture,
  map: colorTexture,
  normalMap: normalTexture
  // metalnessMap: metalnessTexture,
  // roughnessMap: roughnessTexture
})
const minecraftCubeMaterial = new THREE.MeshBasicMaterial({
  map: minecraftTexture
})
const largeCheckerboardCubeMaterial = new THREE.MeshBasicMaterial({
  map: largeCheckerboardTexture
})
const smallCheckerboardCubeMaterial = new THREE.MeshBasicMaterial({
  map: smallCheckerboardTexture
})

const doorCubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const minecraftCubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const largeCheckerboardCubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const smallCheckerboardCubeGeometry = new THREE.BoxGeometry(1, 1, 1)

const doorCube = new THREE.Mesh(doorCubeGeometry, doorCubeMaterial)
const minecraftCube = new THREE.Mesh(
  minecraftCubeGeometry,
  minecraftCubeMaterial
)
const largeCheckerboardCube = new THREE.Mesh(
  largeCheckerboardCubeGeometry,
  largeCheckerboardCubeMaterial
)
const smallCheckerboardCube = new THREE.Mesh(
  smallCheckerboardCubeGeometry,
  smallCheckerboardCubeMaterial
)

doorCube.position.set(-1, 1, 0)
minecraftCube.position.set(1, 1, 0)
largeCheckerboardCube.position.set(-1, -1, 0)
smallCheckerboardCube.position.set(1, -1, 0)

scene.add(doorCube)
scene.add(minecraftCube)
scene.add(largeCheckerboardCube)
scene.add(smallCheckerboardCube)

// Adding lights for better perception of 3D space
{
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.32)
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.64)

  ambientLight.position.set(-8, 8, -8)
  directionalLight.position.set(8, 8, 8)

  scene.add(ambientLight)
  scene.add(directionalLight)
}

// Orbit controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Rendering
const render = () => {
  controls.update()

  renderer.render(scene, camera)

  if (shouldResize(renderer)) {
    camera.aspect = canvas.clientWidth / canvas.clientHeight
    camera.updateProjectionMatrix()
  }

  requestAnimationFrame(render)
}

render()
