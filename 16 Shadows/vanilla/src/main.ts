import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

import * as dat from "dat.gui"

import { shouldResize } from "../utils"

import "./style.sass"

// Renderer
const canvas = document.getElementById("webgl") as HTMLCanvasElement
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
    color: 0xfafafa
}

// Create sphere
const material = new THREE.MeshPhongMaterial({
    color: debugObject.color
})
const geometry = new THREE.SphereGeometry(1, 64, 64)
const sphere = new THREE.Mesh(geometry, material)
const sphere2 = new THREE.Mesh(geometry, material)

// Create plane to debug shadows
const planeMaterial = new THREE.MeshPhongMaterial({
    color: 0xfafafa,
    side: THREE.DoubleSide
})
const planeGeometry = new THREE.PlaneGeometry(10, 10)
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
const sphere2Shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(3, 3),
    new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        alphaMap: new THREE.TextureLoader().load("/textures/simpleShadow.jpg"),
        opacity: 0.5
    })
)

plane.position.y = -1.6
plane.rotation.x = -Math.PI * 0.5

sphere2Shadow.rotation.x = -Math.PI * 0.5
sphere2Shadow.position.x = -3.25
sphere2Shadow.position.y = plane.position.y + 0.01

sphere2.position.x = -3

// Adding objects to the scene
scene.add(plane, sphere, sphere2, sphere2Shadow)

/*
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
const pointLight = new THREE.PointLight(0xffffff, 0.3)
const spotLight = new THREE.SpotLight(0xffffff, 0.4, 10, Math.PI * 0.3)

directionalLight.castShadow = true
pointLight.castShadow = true
spotLight.castShadow = true

directionalLight.position.set(2, 2, -1)
pointLight.position.set(-1, 1, 2)
spotLight.position.set(0, 2, 2)

// Set shadows' map size
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024
pointLight.shadow.mapSize.width = 1024
pointLight.shadow.mapSize.height = 1024
spotLight.shadow.mapSize.width = 1024
spotLight.shadow.mapSize.height = 1024

directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 8
pointLight.shadow.camera.near = 1
pointLight.shadow.camera.far = 6
spotLight.shadow.camera.near = 1
spotLight.shadow.camera.far = 6

spotLight.shadow.camera.fov = 30

// Adjust shadow's camera's frustum
directionalLight.shadow.camera.top = 4
directionalLight.shadow.camera.right = 4
directionalLight.shadow.camera.bottom = -4
directionalLight.shadow.camera.left = -4

// Adjust spot light's shadow's camera's frustum

// Camera helpers
const directionalLightCameraHelper = new THREE.CameraHelper(
    directionalLight.shadow.camera
)
const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera)
const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera)

// Blur
// directionalLight.shadow.radius = 16

scene.add(
    ambientLight,
    directionalLight,
    directionalLightCameraHelper,
    pointLight,
    pointLightCameraHelper,
    spotLight,
    spotLight.target,
    spotLightCameraHelper
)

// Shadows
renderer.shadowMap.enabled = true
sphere.castShadow = true
sphere2.castShadow = false
plane.receiveShadow = true

// Orbit controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/*
 * Debugging
 */
let guiSphereFolder = gui.addFolder("Sphere")
let guiDirectionalLightFolder = gui.addFolder("Directional Light")
let guiPointLightFolder = gui.addFolder("Point Light")
let guiSpotLightFolder = gui.addFolder("Spot Light")

guiDirectionalLightFolder.open()
guiPointLightFolder.open()

guiSphereFolder
    .add(<any>sphere.position, "x")
    .min(-3)
    .max(3)
    .step(0.01)
    .name("X Position")
guiSphereFolder
    .add(<any>sphere.position, "y")
    .min(-3)
    .max(3)
    .step(0.01)
    .name("Y Position")
guiSphereFolder
    .add(<any>sphere.position, "z")
    .min(-3)
    .max(3)
    .step(0.01)
    .name("Z Position")

guiSphereFolder.add(<any>material, "wireframe").name("Wireframe")

guiSphereFolder.addColor(debugObject, "color").onChange(() => {
    material.color.set(debugObject.color)
})

guiSphereFolder
    .add(<any>debugObject, "castShadow")
    .onChange(() => {
        sphere.castShadow = debugObject.castShadow
    })
    .name("Cast Shadow")

guiDirectionalLightFolder.add(<any>directionalLight, "visible").name("Visible")
guiDirectionalLightFolder
    .add(<any>directionalLight, "intensity")
    .min(0)
    .max(1)
    .step(0.01)
    .name("Intensity")
guiDirectionalLightFolder
    .add(<any>directionalLight.position, "x")
    .min(-10)
    .max(10)
    .step(0.01)
    .name("X Position")
guiDirectionalLightFolder
    .add(<any>directionalLight.position, "y")
    .min(-10)
    .max(10)
    .step(0.01)
    .name("Y Position")
guiDirectionalLightFolder
    .add(<any>directionalLight.position, "z")
    .min(-10)
    .max(10)
    .step(0.01)
    .name("Z Position")
guiDirectionalLightFolder
    .add(<any>directionalLightCameraHelper, "visible")
    .name("Show Camera")

guiPointLightFolder
    .add(<any>pointLight, "visible")
    .name("Visible")
    .onChange(() => {
        if (pointLightCameraHelper.visible) {
            pointLightCameraHelper.visible = false
        }
    })
guiPointLightFolder
    .add(<any>pointLight, "distance")
    .name("Distance")
    .min(0)
    .max(10)
    .step(0.01)
guiPointLightFolder
    .add(<any>pointLight, "intensity")
    .min(0)
    .max(1)
    .step(0.01)
    .name("Intensity")
guiPointLightFolder
    .add(<any>pointLight.position, "x")
    .min(-10)
    .max(10)
    .step(0.01)
    .name("X Position")
guiPointLightFolder
    .add(<any>pointLight.position, "y")
    .min(-10)
    .max(10)
    .step(0.01)
    .name("Y Position")
guiPointLightFolder
    .add(<any>pointLight.position, "z")
    .min(-10)
    .max(10)
    .step(0.01)
    .name("Z Position")
guiPointLightFolder
    .add(<any>pointLightCameraHelper, "visible")
    .name("Show Camera")

guiSpotLightFolder
    .add(<any>spotLight, "visible")
    .name("Visible")
    .onChange(() => {
        if (spotLightCameraHelper.visible) {
            spotLightCameraHelper.visible = false
        }
    })
guiSpotLightFolder
    .add(<any>spotLight, "distance")
    .name("Distance")
    .min(0)
    .max(10)
    .step(0.01)
guiSpotLightFolder
    .add(<any>spotLight, "intensity")
    .min(0)
    .max(1)
    .step(0.01)
    .name("Intensity")
guiSpotLightFolder
    .add(<any>spotLight.position, "x")
    .min(-10)
    .max(10)
    .step(0.01)
    .name("X Position")
guiSpotLightFolder
    .add(<any>spotLight.position, "y")
    .min(-10)
    .max(10)
    .step(0.01)
    .name("Y Position")
guiSpotLightFolder
    .add(<any>spotLight.position, "z")
    .min(-10)
    .max(10)
    .step(0.01)
    .name("Z Position")
guiSpotLightFolder
    .add(<any>spotLightCameraHelper, "visible")
    .name("Show Camera")

// Specify an algorithm for shadow mapping
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Toggle debug panel with / key
document.addEventListener("keydown", event => {
    if (event.key === "/") {
        if (gui.closed) {
            gui.open()
        } else {
            gui.close()
        }
    }
})

// Hide/Show debug panel with h/s keys
document.addEventListener("keydown", event => {
    if (event.key === "h") {
        gui.hide()
    } else if (event.key === "s") {
        gui.show()
    }
})

// Clock
const clock = new THREE.Clock()

// Rendering
const render = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update sphere2 Position
    sphere2.position.x = Math.cos(elapsedTime) * 3
    sphere2.position.y = Math.abs(Math.sin(elapsedTime) * 3)
    sphere2.position.z = Math.sin(elapsedTime) * 3

    // Update sphere2Shadow position
    sphere2Shadow.position.x = sphere2.position.x
    sphere2Shadow.position.z = sphere2.position.z
    sphere2Shadow.material.opacity = (1 - sphere2.position.y) * 0.8

    controls.update()

    renderer.render(scene, camera)

    if (shouldResize(renderer)) {
        camera.aspect = canvas.clientWidth / canvas.clientHeight
        camera.updateProjectionMatrix()
    }

    requestAnimationFrame(render)
}

render()
