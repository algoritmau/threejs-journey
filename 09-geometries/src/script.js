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

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const renderer = new THREE.WebGLRenderer({
  canvas
})
renderer.setClearColor(new THREE.Color(0x080808))
renderer.setSize(viewportSizes.width, viewportSizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const geometry = new THREE.BufferGeometry()

// create a simple square shape. We duplicate the top left and bottom right
// vertices because each vertex needs to appear once per triangle.
const vertices = new Float32Array([
  -1, -1, 1, 1, -1, 1, 1, 1, 1, 1, 1, 1, -1, 1, 1, -1, -1, 1
])

// itemSize = 3 because there are 3 values (components) per vertex
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
console.log(geometry)
const material = new THREE.MeshPhongMaterial({
  color: 0x66ff22,
  wireframe: true
})
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
