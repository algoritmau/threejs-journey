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

const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/8.png')

const addDonuts = (amount) => {
  const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45)
  const donutMaterial = new THREE.MeshMatcapMaterial({
    matcap: matcapTexture
  })

  for (let i = 0; i < amount; i++) {
    const donut = new THREE.Mesh(donutGeometry, donutMaterial)

    donut.position.x = (Math.random() - 0.5) * 10
    donut.position.y = (Math.random() - 0.5) * 10
    donut.position.z = (Math.random() - 0.5) * 10

    donut.rotation.x = Math.random() * Math.PI
    donut.rotation.y = Math.random() * Math.PI

    const scale = Math.random()
    donut.scale.set(scale, scale, scale)

    scene.add(donut)
  }
}

const fontLoader = new THREE.FontLoader()
const createText = (font) => {
  const textGeometry = new THREE.TextBufferGeometry('Mauricio Paternina', {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4
  })

  // Center text
  // textGeometry.computeBoundingBox()
  // textGeometry.translate(
  //   (textGeometry.boundingBox.max.x - 0.02) * -0.5,
  //   (textGeometry.boundingBox.max.y - 0.02) * -0.5,
  //   (textGeometry.boundingBox.max.z - 0.03) * -0.5
  // )
  textGeometry.center()

  const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
  const text = new THREE.Mesh(textGeometry, textMaterial)
  scene.add(text)

  addDonuts(100)
}
fontLoader.load('/fonts/helvetiker_regular.typeface.json', createText)

// Axis Helper
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

camera.position.z = 3

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
