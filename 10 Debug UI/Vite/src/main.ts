import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import * as dat from 'dat.gui'
import gsap from 'gsap'

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

// Move the camera back a bit for better view
camera.position.z = 2

// Scene
const scene = new THREE.Scene()

// Debugging
const gui = new dat.GUI()
const debugObject = {
  color: 0x00ef44,
  spin: () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
  }
}

// Create mesh
const material = new THREE.MeshPhongMaterial({
  color: debugObject.color
})
const geometry = new THREE.BoxGeometry(1, 1, 1)
const mesh = new THREE.Mesh(geometry, material)

// Adding mesh to the scene
scene.add(mesh)

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

// Debugging
gui
  .add(<any>mesh.position, 'x')
  .min(-3)
  .max(3)
  .step(0.01)
  .name('X Position')
gui
  .add(<any>mesh.position, 'y')
  .min(-3)
  .max(3)
  .step(0.01)
  .name('Y Position')
gui
  .add(<any>mesh.position, 'z')
  .min(-3)
  .max(3)
  .step(0.01)
  .name('Z Position')
gui.add(<any>mesh, 'visible').name('Visible')
gui.add(<any>material, 'wireframe').name('Wireframe')
gui.addColor(debugObject, 'color').onChange(() => {
  material.color.set(debugObject.color)
})
gui.add(<any>debugObject, 'spin').name('Spin')

// Toggle debug panel with / key
document.addEventListener('keydown', (event) => {
  if (event.key === '/') {
    if (gui.closed) {
      gui.open()
    } else {
      gui.close()
    }
  }
})

// Hide/Show debug panel with h/s keys
document.addEventListener('keydown', (event) => {
  if (event.key === 'h') {
    gui.hide()
  } else if (event.key === 's') {
    gui.show()
  }
})

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
