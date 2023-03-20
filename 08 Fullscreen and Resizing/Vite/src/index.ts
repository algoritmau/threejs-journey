import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import './style.sass'

const viewportSizes = {
  width: window.innerWidth,
  height: window.innerHeight,
  ratio: window.innerWidth / window.innerHeight
}

/**
 * Listening for window resizing
 */
window.addEventListener('resize', () => {
  viewportSizes.width = window.innerWidth
  viewportSizes.height = window.innerHeight

  camera.aspect = viewportSizes.width / viewportSizes.height
  camera.updateProjectionMatrix()

  renderer.setSize(viewportSizes.width, viewportSizes.height)
})

/**
 * Setting up and creating a camera
 */
const camConfig = {
  size: {
    width: viewportSizes.width,
    height: viewportSizes.height
  },
  frustum: {
    verticalFov: 64,
    aspectRatio: viewportSizes.ratio,
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

// Setting the renderer's size
renderer.setSize(camConfig.size.width, camConfig.size.height)

// Setting the renderer's pixel ratio
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

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
 * Orbit controls
 */
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const animate = () => {
  requestAnimationFrame(animate)

  controls.update()

  renderer.render(scene, camera)
}

animate()

window.addEventListener('dblclick', () => {
  // Casting to <any> before accessing props and methods that might not exist on document
  const fullscreenElement =
    document.fullscreenElement || (<any>document).webkitFullscreenElement

  if (fullscreenElement === null) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen()
    } else if ((<any>canvas).webkitRequestFullscreen) {
      ;(<any>canvas).webkitRequestFullscreen()
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if ((<any>document).webkitExitFullscreen) {
      ;(<any>document).webkitExitFullscreen()
    }
  }
})
