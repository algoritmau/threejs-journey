import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { shouldResize } from '../utils'

import './style.sass'

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

// Textures
const textureLoader = new THREE.TextureLoader()
const doorTextures = {
  alphaMap: textureLoader.load('/textures/door/alpha.jpg'),
  ambientOcclusionMap: textureLoader.load('/textures/door/ambientOcclusion.jpg'),
  colorMap: textureLoader.load('/textures/door/color.jpg'),
  heightMap: textureLoader.load('/textures/door/height.jpg'),
  metalnessMap: textureLoader.load('/textures/door/metalness.jpg'),
  normalMap: textureLoader.load('/textures/door/normal.jpg'),
  roughnessMap: textureLoader.load('/textures/door/roughness.jpg')
}
const matcapTextures = {
  matcap1: textureLoader.load('/textures/matcaps/1.png'),
  matcap2: textureLoader.load('/textures/matcaps/2.png'),
  matcap3: textureLoader.load('/textures/matcaps/3.png'),
  matcap4: textureLoader.load('/textures/matcaps/4.png'),
  matcap5: textureLoader.load('/textures/matcaps/5.png'),
  matcap6: textureLoader.load('/textures/matcaps/6.png'),
  matcap7: textureLoader.load('/textures/matcaps/7.png'),
  matcap8: textureLoader.load('/textures/matcaps/8.png')
}
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')

// Environment map
const cubeTextureLoader = new THREE.CubeTextureLoader()
const environmentMapTexture = cubeTextureLoader.load([
  '/textures/environmentMaps/0/px.jpg',
  '/textures/environmentMaps/0/nx.jpg',
  '/textures/environmentMaps/0/py.jpg',
  '/textures/environmentMaps/0/ny.jpg',
  '/textures/environmentMaps/0/pz.jpg',
  '/textures/environmentMaps/0/nz.jpg'
])
const rotesRathausEnvMapTexture = cubeTextureLoader.load([
  '/textures/environmentMaps/rotesRathaus/px.png',
  '/textures/environmentMaps/rotesRathaus/nx.png',
  '/textures/environmentMaps/rotesRathaus/py.png',
  '/textures/environmentMaps/rotesRathaus/ny.png',
  '/textures/environmentMaps/rotesRathaus/pz.png',
  '/textures/environmentMaps/rotesRathaus/nz.png'
])

// Materials
// const baseMaterial = new THREE.MeshBasicMaterial()
// baseMaterial.color.set(0x00ff00)

// const baseMaterial = new THREE.MeshNormalMaterial()
// baseMaterial.flatShading = true

// const baseMaterial = new THREE.MeshMatcapMaterial()
// baseMaterial.matcap = matcapTextures.matcap3

// const baseMaterial = new THREE.MeshDepthMaterial()

// const baseMaterial = new THREE.MeshLambertMaterial()

// const baseMaterial = new THREE.MeshPhongMaterial()
// baseMaterial.shininess = 100
// baseMaterial.specular = new THREE.Color(0x1188ff)

// const baseMaterial = new THREE.MeshToonMaterial()
// baseMaterial.gradientMap = gradientTexture

const baseMaterial = new THREE.MeshStandardMaterial()
baseMaterial.metalness = 0.96
baseMaterial.roughness = 0.08
// baseMaterial.alphaMap = doorTextures.alphaMap
// baseMaterial.aoMap = doorTextures.ambientOcclusionMap
// baseMaterial.aoMapIntensity = 1
// baseMaterial.map = doorTextures.colorMap
// baseMaterial.displacementMap = doorTextures.heightMap
// baseMaterial.displacementScale = 0.1
// baseMaterial.metalnessMap = doorTextures.metalnessMap
// baseMaterial.normalMap = doorTextures.normalMap
// baseMaterial.roughnessMap = doorTextures.roughnessMap
// baseMaterial.transparent = true
// baseMaterial.envMap = environmentMapTexture
baseMaterial.envMap = rotesRathausEnvMapTexture

gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false

const planeGeometry = new THREE.PlaneGeometry(2, 2, 32, 32)
const plane = new THREE.Mesh(planeGeometry, baseMaterial)
plane.material.side = THREE.DoubleSide

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
const sphere = new THREE.Mesh(sphereGeometry, baseMaterial)

const torusGeometry = new THREE.TorusGeometry(1, 0.5, 32, 32)
const torus = new THREE.Mesh(torusGeometry, baseMaterial)

const objects = [plane, sphere, torus]

objects.forEach((object) => {
  object.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(object.geometry.attributes.uv.array, 2)
  )
})

sphere.position.x = -3
torus.position.x = 3

scene.add(...objects)

// Adding lights for better perception of 3D space
{
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.32)
  const pointLight = new THREE.PointLight(0xffffff, 0.48)

  ambientLight.position.set(-8, 8, -8)
  pointLight.position.set(2, 3, 4)

  scene.add(ambientLight, pointLight)
}

// Orbit controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const clock = new THREE.Clock()

// Rendering
const render = () => {
  controls.update()

  renderer.render(scene, camera)

  if (shouldResize(renderer)) {
    camera.aspect = canvas.clientWidth / canvas.clientHeight
    camera.updateProjectionMatrix()
  }

  // Animation
  const elapsedTime = clock.getElapsedTime()

  sphere.rotation.y = elapsedTime * 0.1
  plane.rotation.y = elapsedTime * 0.1
  torus.rotation.y = elapsedTime * 0.1

  sphere.rotation.x = elapsedTime * 0.16
  plane.rotation.x = -elapsedTime * 0.16
  torus.rotation.x = elapsedTime * 0.16

  requestAnimationFrame(render)
}

render()
