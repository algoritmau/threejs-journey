import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'

import matcaps from './matcaps'

import GUI from 'lil-gui'

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

// Font loader
const fontLoader = new FontLoader()
const FONT_URL = 'fonts/nb_architekt_neue_normal.json'

fontLoader.load(FONT_URL, (font) => {
  const fontSettings = {
    font,
    size: 0.8,
    height: 0.2,
    curveSegments: 2,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 2
  }

  // A material shared for text and donut objects
  const sharedMaterial = new THREE.MeshMatcapMaterial({
    matcap: matcaps.crystal
  })

  const textGeometry = new TextGeometry('Threejs\nJourney', fontSettings)
  const textMesh = new THREE.Mesh(textGeometry, sharedMaterial)

  // Compute bounding box
  textGeometry.computeBoundingBox()

  // textGeometry.translate(
  //   -(textGeometry.boundingBox.max.x - 0.02) * 0.5,
  //   -(textGeometry.boundingBox.max.y - 0.02) * 0.5,
  //   -(textGeometry.boundingBox.max.z - 0.03) * 0.5
  // )

  textGeometry.center()

  scene.add(textMesh)

  // Add multiple donut-shaped objects to the scene
  const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
  const donutCount = 256
  const donutMeshes = Array(donutCount)
    .fill(null)
    .map(() => new THREE.Mesh(donutGeometry, sharedMaterial))

  // Modify each donut object
  donutMeshes.forEach((donutMesh) => {
    // Randomize positions
    donutMesh.position.set(
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 12
    )

    // Randomize rotation
    donutMesh.rotateX(Math.random() * Math.PI)
    donutMesh.rotateY(Math.random() * Math.PI)

    // Randomize scale
    const randomScale = Math.random()
    donutMesh.scale.set(randomScale, randomScale, randomScale)
  })

  scene.add(...donutMeshes)

  // GUI Controls
  const gui = new GUI()
  const guiSettings = {
    matcap: matcaps.crystal
  }

  gui.add(guiSettings, 'matcap', matcaps).onChange((value: THREE.Texture) => {
    textMesh.material.matcap = value

    // donutMeshes.forEach((donutMesh: THREE.Mesh) => {
    //   donutMesh.material.matcap = value
    // })
  })
})

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
