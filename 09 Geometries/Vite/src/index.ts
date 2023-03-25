import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { getRandomPoint, getRandomVector3, shouldResize } from '../utils'

import './style.sass'

// Renderer
const canvas = document.getElementById('webgl') as HTMLCanvasElement
const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
  canvas
})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Camera
const camera = new THREE.PerspectiveCamera(80, 2, 0.08, 1024)

// Move the camera back a bit for better view
camera.position.z = 2

// Scene
const scene = new THREE.Scene()

// Material
const material = new THREE.MeshPhongMaterial({
  color: 0x00ef44,
  wireframe: true
})
const anotherMaterial = new THREE.MeshPhongMaterial({
  color: 0xff0000,
  wireframe: true
})

// Custom geometry
const customGeometry = new THREE.BufferGeometry()

// Define vertexes and add them to customGeometry
const points = []

for (let i = 0; i < 45; i++) {
  for (let j = 0; j < 3; j++) {
    points.push(getRandomVector3())
  }
}

customGeometry.setFromPoints(points)
customGeometry.computeVertexNormals()
customGeometry.center()

// Create another custom geometry by setting the position attribute
const positions = new Float32Array(270)

for (let i = 0; i < 270; i++) {
  positions[i] = getRandomPoint()
}

const positionsAttribute = new THREE.Float32BufferAttribute(positions, 3)
const anotherCustomGeometry = new THREE.BufferGeometry()

anotherCustomGeometry.setAttribute('position', positionsAttribute)
anotherCustomGeometry.computeVertexNormals()

// Meshes
const mesh = new THREE.Mesh(customGeometry, material)
const anotherMesh = new THREE.Mesh(anotherCustomGeometry, anotherMaterial)

// Adding meshes to the scene
scene.add(mesh)
scene.add(anotherMesh)

// Adding lights for better perception of 3D space
{
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.72)
  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.72)

  directionalLight.position.set(-1, 2, 4)
  directionalLight2.position.set(1, -2, -4)

  scene.add(directionalLight)
  scene.add(directionalLight2)
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
