import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const colorTextureImageSourcePath = '/textures/door/color.jpg'
// const colorTextureImageSourcePath = '/textures/minecraft.png'

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

const loadingManager = new THREE.LoadingManager()

loadingManager.onStart = (url, itemsLoaded, itemsTotal) =>
  console.log(
    `Started loading file: ${url}.\nLoaded ${itemsLoaded} of ${itemsTotal} files.`
  )

loadingManager.onLoad = () => console.log('Loading complete!')

loadingManager.onProgress = (url, itemsLoaded, itemsTotal) =>
  console.log(
    `Loaded file: ${url}.\nLoaded ${itemsLoaded} of ${itemsTotal} files.`
  )

loadingManager.onError = (url) =>
  console.log(`There was an error loading ${url}`)

// const colorTextureImage = new Image()
// const colorTexture = new THREE.Texture(colorTextureImage)

// colorTextureImage.addEventListener('load', () => {
//   colorTexture.needsUpdate = true
// })

// colorTextureImage.src = colorTextureImageSourcePath

const colorTextureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = colorTextureLoader.load(colorTextureImageSourcePath)

// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// colorTexture.wrapS = THREE.MirroredRepeatWrapping
// colorTexture.wrapT = THREE.MirroredRepeatWrapping
// colorTexture.magFilter = THREE.NearestFilter

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const renderer = new THREE.WebGLRenderer({
  canvas
})
renderer.setClearColor(new THREE.Color(0x080808))
renderer.setSize(viewportSizes.width, viewportSizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ map: colorTexture })
const cube = new THREE.Mesh(geometry, material)

scene.add(cube)

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
