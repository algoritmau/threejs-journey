import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const canvas = document.querySelector('.webgl')
const viewportSizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  64,
  viewportSizes.width / viewportSizes.height,
  0.1,
  1000
)

// Loading Textures
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorAmbientOcclusionTexture = textureLoader.load(
  '/textures/door/ambient-occlusion.jpg'
)
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
// const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')
// const matcapTexture = textureLoader.load('/textures/matcaps/8.png')

const environmentMapTexture = cubeTextureLoader.load([
  '/textures/environmentMaps/0/px.jpg',
  '/textures/environmentMaps/0/nx.jpg',
  '/textures/environmentMaps/0/py.jpg',
  '/textures/environmentMaps/0/ny.jpg',
  '/textures/environmentMaps/0/pz.jpg',
  '/textures/environmentMaps/0/nz.jpg'
])

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const renderer = new THREE.WebGLRenderer({
  canvas
})
renderer.setClearColor(new THREE.Color(0x080808))
renderer.setSize(viewportSizes.width, viewportSizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const material = new THREE.MeshStandardMaterial()
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.05
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.alphaMap = doorAlphaTexture
// material.transparent = true
material.metalness = 0.8
material.roughness = 0
material.envMap = environmentMapTexture

const plane = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(1, 1, 96, 96),
  material
)
plane.geometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
)

const sphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.5, 64, 64),
  material
)
sphere.geometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
)

const torus = new THREE.Mesh(
  new THREE.TorusBufferGeometry(0.3, 0.2, 64, 128),
  material
)
torus.geometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
)

scene.add(plane, sphere, torus)
sphere.position.x = -1.5
torus.position.x = 1.5

camera.position.z = 3
camera.lookAt(plane.position)

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

const clock = new THREE.Clock()

const animate = () => {
  const elapsedTime = clock.getElapsedTime()

  requestAnimationFrame(animate)

  plane.rotation.x = 0.1 * elapsedTime
  plane.rotation.y = 0.15 * elapsedTime
  sphere.rotation.x = 0.1 * elapsedTime
  sphere.rotation.y = 0.15 * elapsedTime
  torus.rotation.x = 0.1 * elapsedTime
  torus.rotation.y = 0.15 * elapsedTime

  // Orbit Controls
  controls.update()

  renderer.render(scene, camera)
}

const handleResize = () => {
  viewportSizes.width = window.innerWidth
  viewportSizes.height = window.innerHeight

  camera.aspect = viewportSizes.width / viewportSizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(viewportSizes.width, viewportSizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

const handleDoubleClick = () => {
  if (!(document.fullscreenElement || document.webkitFullscreenElement)) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen()
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen()
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  }
}

window.addEventListener('resize', handleResize)
window.addEventListener('dblclick', handleDoubleClick)

animate()
