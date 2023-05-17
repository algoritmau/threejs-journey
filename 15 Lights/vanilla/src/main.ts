import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'

import * as dat from 'dat.gui'

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
  lights: {
    ambient: {
      isActive: false,
      color: 0xffffff
    },
    directional: {
      isActive: true,
      color: 0x00fffc,
      position: {
        x: 0,
        y: 1,
        z: 0
      },
      targetPosition: {
        x: 0,
        y: 0,
        z: 0
      },
      showHelper: false
    },
    hemisphere: {
      isActive: false,
      colors: {
        sky: 0xff0000,
        ground: 0x0000ff
      },
      position: {
        x: 0,
        y: 1,
        z: 0
      },
      showHelper: false
    },
    point: {
      isActive: false,
      color: 0xff9000,
      position: {
        x: 0,
        y: 1,
        z: 0
      },
      showHelper: false
    },
    rectArea: {
      isActive: false,
      color: 0x4e00ff,
      width: 2,
      height: 2,
      position: {
        x: 0,
        y: 1,
        z: 0
      },
      showHelper: false
    },
    spot: {
      isActive: false,
      color: 0xff7d46,
      position: {
        x: 2,
        y: 3,
        z: -2
      },
      showHelper: false
    }
  },
  material: {
    side: THREE.DoubleSide,
    wireframe: false
  }
}

const sharedMaterial = new THREE.MeshStandardMaterial({
  wireframe: debugObject.material.wireframe,
  side: debugObject.material.side
})

// Geometries
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32)
const torusGeometry = new THREE.TorusGeometry(0.3, 0.2, 32, 64)
const planeGeometry = new THREE.PlaneGeometry(6, 6)

const cube = new THREE.Mesh(cubeGeometry, sharedMaterial)
const sphere = new THREE.Mesh(sphereGeometry, sharedMaterial)
const torus = new THREE.Mesh(torusGeometry, sharedMaterial)
const plane = new THREE.Mesh(planeGeometry, sharedMaterial)

// Place objects next to each other
sphere.position.x = -1.5
cube.position.x = 0
torus.position.x = 1.5

const objects = [cube, sphere, torus, plane]

plane.position.y = -0.6
plane.rotation.x = -Math.PI * 0.5

// Adding objects to the scene
scene.add(...objects)

// Lights
const ambientLight = new THREE.AmbientLight(
  debugObject.lights.ambient.color,
  0.8
)
const directionalLight = new THREE.DirectionalLight(
  debugObject.lights.directional.color,
  1
)
const hemisphereLight = new THREE.HemisphereLight(
  debugObject.lights.hemisphere.colors.sky,
  debugObject.lights.hemisphere.colors.ground,
  0.8
)
const pointLight = new THREE.PointLight(
  debugObject.lights.point.color,
  0.8,
  0,
  2
)
const rectAreaLight = new THREE.RectAreaLight(
  debugObject.lights.rectArea.color,
  1,
  debugObject.lights.rectArea.width,
  debugObject.lights.rectArea.height
)
const spotLight = new THREE.SpotLight(
  debugObject.lights.spot.color,
  0.8,
  10,
  Math.PI * 0.3
)

// Add initial light
scene.add(directionalLight, directionalLight.target)

// Moving and rotating a light
directionalLight.position.set(1, 0.25, 0)
pointLight.position.set(1, -0.5, 1)
rectAreaLight.position.set(-1.5, 0, 1.5)
rectAreaLight.lookAt(new THREE.Vector3())
spotLight.position.set(
  debugObject.lights.spot.position.x,
  debugObject.lights.spot.position.y,
  debugObject.lights.spot.position.z
)

// Helpers
const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight
)
const hemisphereLightHelper = new THREE.HemisphereLightHelper(
  hemisphereLight,
  0.5
)
const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.5)
const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)
const spotLightHelper = new THREE.SpotLightHelper(spotLight)

// Orbit controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Debugging
const lightsFolder = gui.addFolder('Lights')
const ambientLightFolder = lightsFolder.addFolder('Ambient Light')
const directionalLightFolder = lightsFolder.addFolder('Directional Light')
const hemisphereLightFolder = lightsFolder.addFolder('Hemisphere Light')
const pointLightFolder = lightsFolder.addFolder('Point Light')
const rectAreaLightFolder = lightsFolder.addFolder('Rect Area Light')
const spotLightFolder = lightsFolder.addFolder('Spot Light')
const globalsFolder = gui.addFolder('Globals')

lightsFolder.open()
directionalLightFolder.open()

// Check/Uncheck ambient light
ambientLightFolder
  .add(debugObject.lights.ambient, 'isActive')
  .onChange(() => {
    if (debugObject.lights.ambient.isActive) {
      scene.add(ambientLight)
    } else {
      scene.remove(ambientLight)
    }
  })
  .name('Active')

// Change ambient light color
ambientLightFolder
  .addColor(debugObject.lights.ambient, 'color')
  .onChange(() => {
    ambientLight.color.set(debugObject.lights.ambient.color)
  })
  .name('Color')

// Change ambient light intensity
ambientLightFolder
  .add(<any>ambientLight, 'intensity')
  .min(0)
  .max(1)
  .step(0.01)
  .name('Intensity')

// Check/Uncheck directional light
directionalLightFolder
  .add(debugObject.lights.directional, 'isActive')
  .onChange(() => {
    if (debugObject.lights.directional.isActive) {
      scene.add(directionalLight)
    } else {
      scene.remove(directionalLight)
    }
  })
  .name('Active')

// Change directional light color
directionalLightFolder
  .addColor(debugObject.lights.directional, 'color')
  .onChange(() => {
    directionalLight.color.set(debugObject.lights.directional.color)
  })
  .name('Color')

// Change directional light intensity
directionalLightFolder
  .add(<any>directionalLight, 'intensity')
  .min(0)
  .max(1)
  .step(0.01)
  .name('Intensity')

// Change directional light position
const directionalLightPositionFolder =
  directionalLightFolder.addFolder('Position')

directionalLightPositionFolder
  .add(debugObject.lights.directional.position, 'x')
  .min(-5)
  .max(5)
  .step(0.01)
  .onChange(() => {
    directionalLight.position.x = debugObject.lights.directional.position.x
  })
  .name('X')

directionalLightPositionFolder
  .add(debugObject.lights.directional.position, 'y')
  .min(-5)
  .max(5)
  .step(0.01)
  .onChange(() => {
    directionalLight.position.y = debugObject.lights.directional.position.y
  })
  .name('Y')

directionalLightPositionFolder
  .add(debugObject.lights.directional.position, 'z')
  .min(-5)
  .max(5)
  .step(0.01)
  .onChange(() => {
    directionalLight.position.z = debugObject.lights.directional.position.z
  })
  .name('Z')

// Change directional light target position
const directionalLightTargetFolder = directionalLightFolder.addFolder('Target')

directionalLightTargetFolder
  .add(debugObject.lights.directional.targetPosition, 'x')
  .min(-5)
  .max(5)
  .step(0.01)
  .onChange(() => {
    directionalLight.target.position.x =
      debugObject.lights.directional.targetPosition.x
  })
  .name('X')

directionalLightTargetFolder
  .add(debugObject.lights.directional.targetPosition, 'y')
  .min(-5)
  .max(5)
  .step(0.01)
  .onChange(() => {
    directionalLight.target.position.y =
      debugObject.lights.directional.targetPosition.y
  })
  .name('Y')

directionalLightTargetFolder
  .add(debugObject.lights.directional.targetPosition, 'z')
  .min(-5)
  .max(5)
  .step(0.01)
  .onChange(() => {
    directionalLight.target.position.z =
      debugObject.lights.directional.targetPosition.z
  })
  .name('Z')

// Show/Hide directional light helper
directionalLightFolder
  .add(debugObject.lights.directional, 'showHelper')
  .onChange(() => {
    if (debugObject.lights.directional.showHelper) {
      scene.add(directionalLightHelper)
    } else {
      scene.remove(directionalLightHelper)
    }
  })
  .name(`${debugObject.lights.directional.showHelper ? 'Hide' : 'Show'} Helper`)

// Check/Uncheck hemisphere light
hemisphereLightFolder
  .add(debugObject.lights.hemisphere, 'isActive')
  .onChange(() => {
    if (debugObject.lights.hemisphere.isActive) {
      scene.add(hemisphereLight)
    } else {
      scene.remove(hemisphereLight)
    }
  })
  .name('Active')

// Change hemisphere light colors
// Sky color
hemisphereLightFolder
  .addColor(debugObject.lights.hemisphere.colors, 'sky')
  .onChange(() => {
    hemisphereLight.color.set(debugObject.lights.hemisphere.colors.sky)
  })
  .name('Sky Color')

// Ground color
hemisphereLightFolder
  .addColor(debugObject.lights.hemisphere.colors, 'ground')
  .onChange(() => {
    hemisphereLight.groundColor.set(debugObject.lights.hemisphere.colors.ground)
  })
  .name('Ground Color')

// Change hemisphere light intensity
hemisphereLightFolder
  .add(<any>hemisphereLight, 'intensity')
  .min(0)
  .max(1)
  .step(0.01)
  .name('Intensity')

// Change hemisphere light position
const hemisphereLightPositionFolder =
  hemisphereLightFolder.addFolder('Position')

hemisphereLightPositionFolder
  .add(debugObject.lights.hemisphere.position, 'x')
  .min(-5)
  .max(5)
  .step(0.01)
  .onChange(() => {
    hemisphereLight.position.x = debugObject.lights.hemisphere.position.x
  })
  .name('X')

hemisphereLightPositionFolder
  .add(debugObject.lights.hemisphere.position, 'y')
  .min(-5)
  .max(5)
  .step(0.01)
  .onChange(() => {
    hemisphereLight.position.y = debugObject.lights.hemisphere.position.y
  })
  .name('Y')

hemisphereLightPositionFolder
  .add(debugObject.lights.hemisphere.position, 'z')
  .min(-5)
  .max(5)
  .step(0.01)
  .onChange(() => {
    hemisphereLight.position.z = debugObject.lights.hemisphere.position.z
  })
  .name('Z')

// Show/Hide hemisphere light helper
hemisphereLightFolder
  .add(debugObject.lights.hemisphere, 'showHelper')
  .onChange(() => {
    if (debugObject.lights.hemisphere.showHelper) {
      scene.add(hemisphereLightHelper)
    } else {
      scene.remove(hemisphereLightHelper)
    }
  })
  .name(`${debugObject.lights.hemisphere.showHelper ? 'Hide' : 'Show'} Helper`)

// Check/Uncheck point light
pointLightFolder
  .add(debugObject.lights.point, 'isActive')
  .onChange(() => {
    if (debugObject.lights.point.isActive) {
      scene.add(pointLight)
    } else {
      scene.remove(pointLight)
    }
  })
  .name('Active')

// Change point light color
pointLightFolder
  .addColor(debugObject.lights.point, 'color')
  .onChange(() => {
    pointLight.color.set(debugObject.lights.point.color)
  })
  .name('Color')

// Change point light intensity
pointLightFolder
  .add(<any>pointLight, 'intensity')
  .min(0)
  .max(1)
  .step(0.01)
  .name('Intensity')

// Change point light distance
pointLightFolder
  .add(<any>pointLight, 'distance')
  .min(0)
  .max(10)
  .step(0.01)
  .name('Distance')

// Change point light decay
pointLightFolder
  .add(<any>pointLight, 'decay')
  .min(0)
  .max(10)
  .step(0.01)
  .name('Decay')

// Change point light position
const pointLightPositionFolder = pointLightFolder.addFolder('Position')

pointLightPositionFolder
  .add(debugObject.lights.point.position, 'x')
  .min(-5)
  .max(5)
  .step(0.01)
  .onChange(() => {
    pointLight.position.x = debugObject.lights.point.position.x
  })
  .name('X')

pointLightPositionFolder
  .add(debugObject.lights.point.position, 'y')
  .min(-5)
  .max(5)
  .step(0.01)
  .onChange(() => {
    pointLight.position.y = debugObject.lights.point.position.y
  })
  .name('Y')

pointLightPositionFolder
  .add(debugObject.lights.point.position, 'z')
  .min(-5)
  .max(5)
  .step(0.01)
  .onChange(() => {
    pointLight.position.z = debugObject.lights.point.position.z
  })
  .name('Z')

// Show/Hide point light helper
pointLightFolder
  .add(debugObject.lights.point, 'showHelper')
  .onChange(() => {
    if (debugObject.lights.point.showHelper) {
      scene.add(pointLightHelper)
    } else {
      scene.remove(pointLightHelper)
    }
  })
  .name(`${debugObject.lights.point.showHelper ? 'Hide' : 'Show'} Helper`)

// Check/Uncheck rect area light
rectAreaLightFolder
  .add(debugObject.lights.rectArea, 'isActive')
  .onChange(() => {
    if (debugObject.lights.rectArea.isActive) {
      scene.add(rectAreaLight)
    } else {
      scene.remove(rectAreaLight)
    }
  })
  .name('Active')

// Change rect area light color
rectAreaLightFolder
  .addColor(debugObject.lights.rectArea, 'color')
  .onChange(() => {
    rectAreaLight.color.set(debugObject.lights.rectArea.color)
  })
  .name('Color')

// Change rect area light Intensity
rectAreaLightFolder
  .add(<any>rectAreaLight, 'intensity')
  .min(0)
  .max(1)
  .step(0.01)
  .name('Intensity')

// Change rect area light width
rectAreaLightFolder
  .add(<any>rectAreaLight, 'width')
  .min(1)
  .max(10)
  .step(0.1)
  .name('Width')

// Change rect area light height
rectAreaLightFolder
  .add(<any>rectAreaLight, 'height')
  .min(1)
  .max(10)
  .step(0.1)
  .name('Height')

// Change rect area light position
const rectAreaLightPositionFolder = rectAreaLightFolder.addFolder('Position')

rectAreaLightPositionFolder
  .add(debugObject.lights.rectArea.position, 'x')
  .min(-5)
  .max(5)
  .step(0.01)
  .onChange(() => {
    rectAreaLight.position.x = debugObject.lights.rectArea.position.x
  })
  .name('X')

rectAreaLightPositionFolder
  .add(debugObject.lights.rectArea.position, 'y')
  .min(-5)
  .max(5)
  .step(0.01)
  .onChange(() => {
    rectAreaLight.position.y = debugObject.lights.rectArea.position.y
  })
  .name('Y')

rectAreaLightPositionFolder
  .add(debugObject.lights.rectArea.position, 'z')
  .min(-5)
  .max(5)
  .step(0.01)
  .onChange(() => {
    rectAreaLight.position.z = debugObject.lights.rectArea.position.z
  })
  .name('Z')

// Show/Hide rect area light helper
rectAreaLightFolder
  .add(debugObject.lights.rectArea, 'showHelper')
  .onChange(() => {
    if (debugObject.lights.rectArea.showHelper) {
      scene.add(rectAreaLightHelper)
    } else {
      scene.remove(rectAreaLightHelper)
    }
  })
  .name(`${debugObject.lights.rectArea.showHelper ? 'Hide' : 'Show'} Helper`)

// Check/Uncheck spot light
spotLightFolder
  .add(debugObject.lights.spot, 'isActive')
  .onChange(() => {
    if (debugObject.lights.spot.isActive) {
      scene.add(spotLight)
    } else {
      scene.remove(spotLight)
    }
  })
  .name('Active')

// Change spot light color
spotLightFolder
  .addColor(debugObject.lights.spot, 'color')
  .onChange(() => {
    spotLight.color.set(debugObject.lights.spot.color)
  })
  .name('Color')

// Change spot light Intensity
spotLightFolder
  .add(<any>spotLight, 'intensity')
  .min(0)
  .max(1)
  .step(0.01)
  .name('Intensity')

// Change spot light distance
spotLightFolder
  .add(<any>spotLight, 'distance')
  .min(0)
  .max(10)
  .step(0.01)
  .name('Distance')

// Change spot light angle
spotLightFolder
  .add(<any>spotLight, 'angle')
  .min(0)
  .max(Math.PI / 2)
  .step(0.01)
  .name('Angle')

// Change spot light penumbra
spotLightFolder
  .add(<any>spotLight, 'penumbra')
  .min(0)
  .max(1)
  .step(0.01)
  .name('Penumbra')

// Change spot light decay
spotLightFolder
  .add(<any>spotLight, 'decay')
  .min(0)
  .max(10)
  .step(0.01)
  .name('Decay')

// Change spot light position
const spotLightPositionFolder = spotLightFolder.addFolder('Position')

spotLightPositionFolder
  .add(debugObject.lights.spot.position, 'x')
  .min(-5)
  .max(5)
  .step(0.01)
  .name('X')
  .onChange(() => {
    spotLight.position.x = debugObject.lights.spot.position.x
  })

spotLightPositionFolder
  .add(debugObject.lights.spot.position, 'y')
  .min(-5)
  .max(5)
  .step(0.01)
  .name('Y')
  .onChange(() => {
    spotLight.position.y = debugObject.lights.spot.position.y
  })

spotLightPositionFolder
  .add(debugObject.lights.spot.position, 'z')
  .min(-5)
  .max(5)
  .step(0.01)
  .name('Z')
  .onChange(() => {
    spotLight.position.z = debugObject.lights.spot.position.z
  })

// Show/Hide spot light helper
spotLightFolder
  .add(debugObject.lights.spot, 'showHelper')
  .onChange(() => {
    if (debugObject.lights.spot.showHelper) {
      scene.add(spotLightHelper)
    } else {
      scene.remove(spotLightHelper)
    }
  })
  .name(`${debugObject.lights.spot.showHelper ? 'Hide' : 'Show'} Helper`)

// Global settings
globalsFolder.add(<any>sharedMaterial, 'wireframe').name('Wireframe')

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
