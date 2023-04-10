import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { shouldResize } from '../utils'

import GUI from 'lil-gui'

import { envMaps } from './textures/envMaps'
import { gradients } from './textures/gradients'
import { matcaps } from './textures/matcaps'
import { textures } from './textures/textures'

import { GUIConfigurables, ITexture } from '../types'

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

// Materials
const basicMaterial = new THREE.MeshBasicMaterial()
const normalMaterial = new THREE.MeshNormalMaterial()
const matcapMaterial = new THREE.MeshMatcapMaterial()
const depthMaterial = new THREE.MeshDepthMaterial()
const lambertMaterial = new THREE.MeshLambertMaterial()
const phongMaterial = new THREE.MeshPhongMaterial({
  shininess: 48,
  specular: new THREE.Color(0x111111)
})
const toonMaterial = new THREE.MeshToonMaterial()
const physicalMaterial = new THREE.MeshPhysicalMaterial()

const materials = {
  MeshBasicMaterial: basicMaterial,
  MeshNormalMaterial: normalMaterial,
  MeshMatcapMaterial: matcapMaterial,
  MeshDepthMaterial: depthMaterial,
  MeshLambertMaterial: lambertMaterial,
  MeshPhongMaterial: phongMaterial,
  MeshToonMaterial: toonMaterial,
  MeshPhysicalMaterial: physicalMaterial
}

const sides = {
  FrontSide: THREE.FrontSide,
  BackSide: THREE.BackSide,
  DoubleSide: THREE.DoubleSide
}

// GUI Controls object
const guiConfigurables: GUIConfigurables = {
  color: new THREE.Color(0xffffff),
  opacity: 1,
  side: sides.FrontSide,
  transparent: false,
  visible: true,
  material: materials.MeshBasicMaterial,
  wireframe: false,
  flatShading: false,
  map: undefined,
  envMap: 'none',
  matcap: 'none',
  emissive: new THREE.Color(0x000000),
  emissiveIntensity: 1,
  specular: new THREE.Color(0x111111),
  shininess: 30,
  clearcoat: 0,
  clearcoatRoughness: 0,
  metalness: 0,
  roughness: 0
}

// Material
let material: any = materials.MeshBasicMaterial

material.color.set(guiConfigurables.color)
material.transparent = guiConfigurables.transparent
material.opacity = guiConfigurables.opacity
material.side = guiConfigurables.side

const planeGeometry = new THREE.PlaneGeometry(2, 2, 32, 32)
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
const torusGeometry = new THREE.TorusGeometry(1, 0.5, 32, 32)

const plane = new THREE.Mesh(planeGeometry, material)
const sphere = new THREE.Mesh(sphereGeometry, material)
const torus = new THREE.Mesh(torusGeometry, material)

const meshes = [plane, sphere, torus]

sphere.position.x = -3
torus.position.x = 3

scene.add(...meshes)

// Adding lights for better perception of 3D space
{
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.32)
  const pointLight = new THREE.PointLight(0xffffff, 0.48)

  ambientLight.position.set(-8, 8, -8)
  pointLight.position.set(2, 3, 4)

  scene.add(ambientLight, pointLight)
}

/**
 * GUI Controller
 */
const gui = new GUI({ title: 'Three.js Materials', closeFolders: true })

const guiMaterialPickerFolder = gui.addFolder('Material Picker')
const guiMaterialFolder = gui.addFolder('THREE.Material')
const guiBasicMaterialFolder = gui.addFolder('THREE.MeshBasicMaterial')
const guiNormalMaterialFolder = gui.addFolder('THREE.MeshNormalMaterial')
const guiMatcapMaterialFolder = gui.addFolder('THREE.MeshMatcapMaterial')
const guiDepthMaterialFolder = gui.addFolder('THREE.MeshDepthMaterial')
const guiLambertMaterialFolder = gui.addFolder('THREE.MeshLambertMaterial')
const guiPhongMaterialFolder = gui.addFolder('THREE.MeshPhongMaterial')
const guiToonMaterialFolder = gui.addFolder('THREE.MeshToonMaterial')
const guiPhysicalMaterialFolder = gui.addFolder('THREE.MeshPhysicalMaterial')

const guiMaterialFolders = [
  guiBasicMaterialFolder,
  guiNormalMaterialFolder,
  guiMatcapMaterialFolder,
  guiDepthMaterialFolder,
  guiLambertMaterialFolder,
  guiPhongMaterialFolder,
  guiToonMaterialFolder,
  guiPhysicalMaterialFolder
]

const addGUIController = (guiFolder: GUI, property: string) => {
  switch (property) {
    case 'color':
    case 'emissive':
    case 'specular':
      guiFolder
        .addColor(guiConfigurables, property)
        .onChange((value: THREE.Color) => {
          meshes.forEach((mesh) => {
            mesh.material[property].set(value)
          })
        })

      break

    case 'wireframe':
    case 'transparent':
    case 'visible':
      guiFolder.add(guiConfigurables, property).onChange((value: boolean) => {
        meshes.forEach((mesh) => {
          mesh.material[property] = value
        })
      })

      break

    case 'flatShading':
      guiFolder.add(guiConfigurables, property).onChange((value: boolean) => {
        meshes.forEach((mesh) => {
          mesh.material.flatShading = value
          mesh.material.needsUpdate = true
        })
      })

      break

    case 'clearcoat':
    case 'clearcoatRoughness':
    case 'emissiveIntensity':
    case 'metalness':
    case 'opacity':
    case 'roughness':
      guiFolder
        .add(guiConfigurables, property, 0, 1, 0.01)
        .onChange((value: number) => {
          meshes.forEach((mesh) => {
            mesh.material[property] = value
          })
        })

      break

    case 'shininess':
      guiFolder
        .add(guiConfigurables, property, 0, 100, 1)
        .onChange((value: number) => {
          meshes.forEach((mesh) => {
            mesh.material[property] = value
          })
        })

      break

    case 'side':
      guiFolder
        .add(guiConfigurables, property, sides)
        .onChange((value: THREE.Side) => {
          meshes.forEach((mesh) => {
            mesh.material.side = value
            mesh.material.needsUpdate = true
          })
        })

      break

    case 'envMap':
      guiFolder
        .add(guiConfigurables, property, envMaps)
        .onChange((value: ITexture) => {
          meshes.forEach((mesh) => {
            mesh.material.envMap = value
            mesh.material.needsUpdate = true
          })
        })

      break

    case 'map':
      guiFolder
        .add(guiConfigurables, property, textures)
        .onChange((value: THREE.Texture) => {
          meshes.forEach((mesh) => {
            mesh.material.map = value
            mesh.material.needsUpdate = true
          })
        })

      break

    case 'matcap':
      guiFolder
        .add(guiConfigurables, property, matcaps)
        .onChange((value: ITexture) => {
          meshes.forEach((mesh) => {
            mesh.material.matcap = value
            mesh.material.needsUpdate = true
          })
        })

      break

    case 'gradientMap':
      guiFolder
        .add(guiConfigurables, property, gradients)
        .onChange((value: ITexture) => {
          meshes.forEach((mesh) => {
            mesh.material.gradientMap = value
            mesh.material.needsUpdate = true
            value.minFilter = THREE.NearestFilter
            value.magFilter = THREE.NearestFilter
            value.generateMipmaps = false
          })
        })

      break

    default:
      console.warn(`Property ${property} not found`)
      break
  }
}

const addGUIControllers = (guiFolder: GUI, properties: string[]) => {
  properties.forEach((property) => {
    addGUIController(guiFolder, property)
  })
}

// Set up THREE.Material properties
addGUIControllers(guiMaterialFolder, [
  'visible',
  'transparent',
  'opacity',
  'side'
])

// Set up MeshBasicMaterial properties
addGUIControllers(guiBasicMaterialFolder, [
  'wireframe',
  'color',
  'map',
  'envMap'
])

// Set up MeshNormalMaterial properties
addGUIControllers(guiNormalMaterialFolder, ['flatShading', 'wireframe'])

// Set up MeshMatcapMaterial properties
addGUIControllers(guiMatcapMaterialFolder, ['color', 'flatShading', 'matcap'])

// Set up MeshDepthMaterial properties
addGUIControllers(guiDepthMaterialFolder, ['wireframe'])

// Set up MeshLambertMaterial properties
addGUIControllers(guiLambertMaterialFolder, [
  'color',
  'emissive',
  'emissiveIntensity',
  'flatShading',
  'wireframe'
])

// Set up MeshPhongMaterial properties
addGUIControllers(guiPhongMaterialFolder, [
  'color',
  'emissive',
  'emissiveIntensity',
  'flatShading',
  'wireframe',
  'specular',
  'shininess',
  'map',
  'envMap'
])

// Set up MeshToonMaterial properties
addGUIControllers(guiToonMaterialFolder, [
  'color',
  'wireframe',
  'gradientMap',
  'map'
])

// Set up MeshPhysicalMaterial properties
addGUIControllers(guiPhysicalMaterialFolder, [
  'color',
  'emissive',
  'emissiveIntensity',
  'roughness',
  'metalness',
  'reflectivity',
  'clearcoat',
  'clearcoatRoughness',
  'wireframe',
  'flatShading',
  'map',
  'envMap'
])

/**
 * Closes and hide all gui folders but the one passed as argument
 * @param {string} folderName - Name of the folder to be shown and opened
 */
const showOpenGUIFolder = (folderName: string) => {
  guiMaterialFolders.forEach((folder) => {
    if (folder._title === folderName) {
      folder.show()
      folder.open()
    } else {
      folder.hide()
    }
  })
}

// GUI starts with the material picker and the basic material folders open
guiMaterialFolders.forEach((folder) => folder.hide())
guiMaterialPickerFolder.open()
guiBasicMaterialFolder.show()
guiBasicMaterialFolder.open()

// Material picker
guiMaterialPickerFolder
  .add(guiConfigurables, 'material', materials)
  .name('Material')
  .onChange((value: THREE.Material) => {
    switch (value.type) {
      case 'MeshBasicMaterial':
        showOpenGUIFolder('THREE.MeshBasicMaterial')

        meshes.forEach((mesh) => {
          mesh.material = value
          mesh.material.color.set(guiConfigurables.color)
        })

        break

      case 'MeshNormalMaterial':
        showOpenGUIFolder('THREE.MeshNormalMaterial')

        material = value

        meshes.forEach((mesh) => {
          mesh.material = value
        })

        break

      case 'MeshMatcapMaterial':
        showOpenGUIFolder('THREE.MeshMatcapMaterial')

        meshes.forEach((mesh) => {
          mesh.material = value
          mesh.material.color.set(guiConfigurables.color)
        })

        break

      case 'MeshDepthMaterial':
        showOpenGUIFolder('THREE.MeshDepthMaterial')

        meshes.forEach((mesh) => {
          mesh.material = value
        })

        break

      case 'MeshLambertMaterial':
        showOpenGUIFolder('THREE.MeshLambertMaterial')

        meshes.forEach((mesh) => {
          mesh.material = value
          mesh.material.color.set(guiConfigurables.color)
          mesh.material.emissive.set(guiConfigurables.emissive)
          mesh.material.emissiveIntensity = guiConfigurables.emissiveIntensity
        })

        break

      case 'MeshPhongMaterial':
        showOpenGUIFolder('THREE.MeshPhongMaterial')

        meshes.forEach((mesh) => {
          mesh.material = value
          mesh.material.color.set(guiConfigurables.color)
          mesh.material.emissive.set(guiConfigurables.emissive)
          mesh.material.emissiveIntensity = guiConfigurables.emissiveIntensity
        })

        break

      case 'MeshToonMaterial':
        showOpenGUIFolder('THREE.MeshToonMaterial')

        meshes.forEach((mesh) => {
          mesh.material = value
          mesh.material.color.set(guiConfigurables.color)
        })

        break

      case 'MeshPhysicalMaterial':
        showOpenGUIFolder('THREE.MeshPhysicalMaterial')

        meshes.forEach((mesh) => {
          mesh.material = value
          mesh.material.color.set(guiConfigurables.color)
          mesh.material.emissive.set(guiConfigurables.emissive)
          mesh.material.emissiveIntensity = guiConfigurables.emissiveIntensity
        })

        break

      default:
        console.warn('Material not supported')
        break
    }

    meshes.forEach((mesh) => {
      mesh.material.transparent = guiConfigurables.transparent
      mesh.material.opacity = guiConfigurables.opacity
    })
  })

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

  // Animate each object
  meshes.forEach((object) => {
    object.rotation.x += 0.008
    object.rotation.y += 0.004
    object.rotation.z += 0.002
  })

  requestAnimationFrame(render)
}

render()
