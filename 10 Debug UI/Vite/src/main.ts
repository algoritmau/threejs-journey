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
camera.position.z = 5

// Scene
const scene = new THREE.Scene()

// Debugging
const gui = new dat.GUI()
const debugObject = {
  castShadow: true,
  color: 0x00ef44,
  scale: 1,
  spin: () => {
    gsap.to(cube.rotation, { duration: 1, y: cube.rotation.y + Math.PI * 2 })
  }
}

// Create cube
const material = new THREE.MeshPhongMaterial({
  color: debugObject.color
})
const geometry = new THREE.BoxGeometry(1, 1, 1)
const cube = new THREE.Mesh(geometry, material)

// Create plane to debug shadows
const planeMaterial = new THREE.MeshPhongMaterial({
  color: 0xfafffb,
  side: THREE.DoubleSide
})
const planeGeometry = new THREE.PlaneGeometry(4, 4)
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.position.y = -0.6
plane.rotation.x = -Math.PI * 0.5

// Adding objects to the scene
scene.add(cube)
scene.add(plane)

// Adding lights for better perception of 3D space
{
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.72)

  directionalLight.position.set(-1, 2, 4)

  directionalLight.castShadow = true

  scene.add(directionalLight)
}

// Shadows
renderer.shadowMap.enabled = true
cube.castShadow = true
plane.receiveShadow = true

// Orbit controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Debugging
gui
  .add(<any>cube.position, 'x')
  .min(-3)
  .max(3)
  .step(0.01)
  .name('X Position')
gui
  .add(<any>cube.position, 'y')
  .min(-3)
  .max(3)
  .step(0.01)
  .name('Y Position')
gui
  .add(<any>cube.position, 'z')
  .min(-3)
  .max(3)
  .step(0.01)
  .name('Z Position')

// Boolean values
gui.add(<any>cube, 'visible').name('Visible')
gui.add(<any>material, 'wireframe').name('Wireframe')

// Pre-defined values
gui
  .add(<any>debugObject, 'scale', {
    small: 0.5,
    medium: 1,
    large: 2
  })
  .onChange(() => {
    cube.scale.set(debugObject.scale, debugObject.scale, debugObject.scale)
  })
  .name('Scale')

gui.addColor(debugObject, 'color').onChange(() => {
  material.color.set(debugObject.color)
})

gui
  .add(<any>debugObject, 'castShadow')
  .onChange(() => {
    cube.castShadow = debugObject.castShadow
  })
  .name('Cast Shadow')

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
