import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

import cross from "./objects/cross"
import graveyard from "./objects/graveyard"
import Roof from "./objects/roof"
import Window from "./objects/window"

import textures from "./textures"

import { shouldResize } from "../utils"

import "./style.sass"

// Renderer
const canvas = document.getElementById("webgl") as HTMLCanvasElement
const renderer = new THREE.WebGLRenderer({
    canvas
})

renderer.setClearColor("#262837")
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Camera
const camera = new THREE.PerspectiveCamera(80, 2, 0.08, 1024)
camera.position.z = 16

// Scene
const scene = new THREE.Scene()

// Fog
const fog = new THREE.Fog("#262837", 4, 40)
scene.fog = fog

// Debugging
// const gui = new dat.GUI()
// const debugObject = {
//     castShadow: true,
//     colors: {
//         floor: "#a9c388",
//         walls: {
//             stone: "#ac4b1c",
//             wood: "#a0a0a0"
//         },
//         roof: "#b35f45"
//     }
// }

// Ground
const groundGeometry = new THREE.PlaneGeometry(80, 80)
const groundMaterial = new THREE.MeshPhongMaterial({
    aoMap: textures.ground.ambientOcclusion,
    color: "#a9c388",
    displacementScale: 0.1,
    map: textures.ground.map,
    normalMap: textures.ground.normal,
    side: THREE.DoubleSide
})
const ground = new THREE.Mesh(groundGeometry, groundMaterial)

ground.position.y = 0
ground.rotation.x = -Math.PI / 2

// Church
const churchContainer = new THREE.Group()

const churchConfig = {
    geometries: {
        house: {
            base: new THREE.BoxGeometry(8, 0.5, 8),
            walls: new THREE.BoxGeometry(8, 4, 8)
        },
        tower: {
            base: new THREE.BoxGeometry(2, 0.5, 2),
            door: new THREE.BoxGeometry(1, 1.25, 0.05),
            walls: new THREE.BoxGeometry(2, 9, 2)
        }
    },
    materials: {
        base: new THREE.MeshPhysicalMaterial({
            aoMap: textures.walls.stone.ambientOcclusion,
            color: "#ac4b1c",
            map: textures.walls.stone.map,
            normalMap: textures.walls.stone.normal,
            roughnessMap: textures.walls.stone.roughness,
            side: THREE.DoubleSide
        }),

        door: new THREE.MeshStandardMaterial({
            aoMap: textures.woodDoor.ambientOcclusion,
            // FIXME: Displacement map is not working
            // displacementMap: textures.woodDoor.displacement,
            // displacementScale: 0.01,
            map: textures.woodDoor.map,
            metalnessMap: textures.woodDoor.metalness,
            normalMap: textures.woodDoor.normal,
            roughnessMap: textures.woodDoor.roughness,
            transparent: true
        }),

        walls: new THREE.MeshPhysicalMaterial({
            aoMap: textures.walls.wood.ambientOcclusion,
            color: "#a0a0a0",
            displacementScale: 1,
            map: textures.walls.wood.map,
            normalMap: textures.walls.wood.normal,
            roughnessMap: textures.walls.wood.roughness,
            side: THREE.DoubleSide
        })
    }
}

const church = {
    house: {
        base: new THREE.Mesh(
            churchConfig.geometries.house.base,
            churchConfig.materials.base
        ),
        roof: new Roof().shape,
        walls: new THREE.Mesh(
            churchConfig.geometries.house.walls,
            churchConfig.materials.walls
        ),
        windows: {
            back: {
                center: new Window("square").shape,
                left: new Window("square").shape,
                right: new Window("square").shape
            },
            front: {
                left: new Window("square").shape,
                right: new Window("square").shape
            },
            left: {
                one: new Window("square").shape,
                two: new Window("square").shape,
                three: new Window("square").shape,
                four: new Window("square").shape
            },
            right: {
                one: new Window("square").shape,
                two: new Window("square").shape,
                three: new Window("square").shape,
                four: new Window("square").shape
            }
        }
    },
    tower: {
        base: new THREE.Mesh(
            churchConfig.geometries.tower.base,
            churchConfig.materials.base
        ),
        cross,
        door: new THREE.Mesh(
            churchConfig.geometries.tower.door,
            churchConfig.materials.door
        ),
        roof: new Roof().shape,
        walls: new THREE.Mesh(
            churchConfig.geometries.tower.walls,
            churchConfig.materials.walls
        ),
        window: new Window("circle").shape
    }
}

// FIXME: Fix the UVs for the geometries
// churchConfig.geometries.house.walls.setAttribute(
//     "uv2",
//     new THREE.Float32BufferAttribute(
//         church.house.walls.geometry.attributes.uv.array,
//         2
//     )
// )

// Adding objects to the church container
const churchObjects = [
    Object.values(church.house.windows.back),
    Object.values(church.house.windows.front),
    Object.values(church.house.windows.left),
    Object.values(church.house.windows.right)
]

churchObjects.forEach(churchObject => churchContainer.add(...churchObject))

churchContainer.add(
    church.house.base,
    church.house.roof,
    church.house.walls,
    church.tower.base,
    church.tower.cross,
    church.tower.door,
    church.tower.roof,
    church.tower.walls,
    church.tower.window
)

// Adding objects to the scene
scene.add(churchContainer, ground)

textures.roof.map.rotation = -Math.PI / 2
textures.roof.map.center.x = 0.5
textures.roof.map.center.y = 0.5
textures.roof.map.repeat.x = 1
textures.roof.map.repeat.y = 2
textures.roof.map.wrapS = THREE.RepeatWrapping
textures.roof.map.wrapT = THREE.RepeatWrapping
textures.roof.map.repeat.set(2, 2)
textures.roof.map.minFilter = THREE.NearestFilter
textures.roof.map.generateMipmaps = false
textures.walls.wood.map.wrapS = THREE.RepeatWrapping
textures.walls.wood.map.wrapT = THREE.RepeatWrapping
textures.walls.wood.map.repeat.set(2, 2)
textures.walls.wood.map.minFilter = THREE.NearestFilter
textures.walls.wood.map.generateMipmaps = false

// Rotate side windows
Object.values(church.house.windows.left).forEach(window => {
    window.rotation.y = Math.PI / 2
})
Object.values(church.house.windows.right).forEach(window => {
    window.rotation.y = Math.PI / 2
})

// Positioning
church.house.base.position.y =
    church.house.base.geometry.parameters.height / 2 + 0.01
church.house.base.position.z =
    -church.tower.walls.geometry.parameters.depth * 2.25
church.house.roof.position.y =
    church.house.walls.geometry.parameters.height * 1.55
church.house.roof.position.z =
    -church.tower.walls.geometry.parameters.depth * 2.25
church.house.walls.position.y =
    church.house.base.geometry.parameters.height +
    church.house.walls.geometry.parameters.height / 2
church.house.walls.position.z =
    -church.tower.walls.geometry.parameters.depth * 2.25

// Positioning windows
church.house.windows.back.center.position.set(
    0,
    church.house.base.geometry.parameters.height + 2,
    -8.5
)
church.house.windows.back.left.position.set(
    -church.tower.walls.geometry.parameters.width * 1.25,
    church.house.base.geometry.parameters.height + 2,
    -8.5
)
church.house.windows.back.right.position.set(
    church.tower.walls.geometry.parameters.width * 1.25,
    church.house.base.geometry.parameters.height + 2,
    -8.5
)

church.house.windows.front.left.position.set(
    -church.tower.walls.geometry.parameters.width * 1.25,
    church.house.base.geometry.parameters.height + 2,
    -0.5
)
church.house.windows.front.right.position.set(
    church.tower.walls.geometry.parameters.width * 1.25,
    church.house.base.geometry.parameters.height + 2,
    -0.5
)

church.house.windows.left.one.position.set(
    -church.tower.walls.position.x - 4,
    church.house.base.geometry.parameters.height + 2,
    -2.25
)
church.house.windows.left.two.position.set(
    -church.tower.walls.position.x - 4,
    church.house.base.geometry.parameters.height + 2,
    -3.75
)
church.house.windows.left.three.position.set(
    -church.tower.walls.position.x - 4,
    church.house.base.geometry.parameters.height + 2,
    -5.25
)
church.house.windows.left.four.position.set(
    -church.tower.walls.position.x - 4,
    church.house.base.geometry.parameters.height + 2,
    -6.75
)

church.house.windows.right.one.position.set(
    -church.tower.walls.position.x + 4,
    church.house.base.geometry.parameters.height + 2,
    -2.25
)
church.house.windows.right.two.position.set(
    -church.tower.walls.position.x + 4,
    church.house.base.geometry.parameters.height + 2,
    -3.75
)
church.house.windows.right.three.position.set(
    -church.tower.walls.position.x + 4,
    church.house.base.geometry.parameters.height + 2,
    -5.25
)
church.house.windows.right.four.position.set(
    -church.tower.walls.position.x + 4,
    church.house.base.geometry.parameters.height + 2,
    -6.75
)

church.tower.base.position.y = church.tower.base.position.y =
    church.tower.base.geometry.parameters.height / 2 + 0.01
church.tower.cross.position.y = church.tower.door.geometry.parameters.height + 1
church.tower.door.position.y =
    church.tower.door.geometry.parameters.height / 2 +
    church.tower.base.geometry.parameters.height
church.tower.cross.position.z = church.tower.walls.geometry.parameters.depth / 2
church.tower.door.position.z = church.tower.walls.geometry.parameters.depth / 2
church.tower.roof.position.y =
    church.tower.walls.geometry.parameters.height + 0.8
church.tower.walls.position.y =
    church.tower.walls.geometry.parameters.height / 2 +
    church.tower.base.geometry.parameters.height
church.tower.window.position.y =
    (church.tower.walls.geometry.parameters.height / 4) * 3.5
church.tower.window.position.z =
    church.tower.walls.geometry.parameters.depth / 1.99

church.tower.roof.scale.set(0.3, 0.3, 0.25)

churchContainer.position.y = 0

/*
 * Bushes
 */
const bushGeometry = new THREE.DodecahedronGeometry(0.5, 1)
const bushMaterial = new THREE.MeshStandardMaterial({
    aoMap: textures.moss.ambientOcclusion,
    color: "#89c854",
    map: textures.moss.map,
    normalMap: textures.moss.normal,
    roughnessMap: textures.moss.roughness
})
const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)

bush1.position.set(2.4, 0.4, 0)
bush2.position.set(3.2, 0.2, 0)
bush3.position.set(-2.4, 0.2, 0)
bush4.position.set(-3.2, 0.4, 0)

bush2.scale.set(0.8, 0.8, 0.8)

scene.add(bush1, bush2, bush3, bush4)

/*
 * Models
 */
const gltfLoader = new GLTFLoader()

/*
 * "Remains" (https://skfb.ly/6yoGs) by seenoise is licensed under Creative
 * Commons Attribution (http://creativecommons.org/licenses/by/4.0/)
 */
gltfLoader.load("/assets/models/remains/scene.gltf", (gltfScene: any) => {
    gltfScene.scene.scale.set(0.32, 0.32, 0.32)
    gltfScene.scene.position.set(6, 0, -3)

    scene.add(gltfScene.scene)
})

// Ghost
const ghostsGroup = new THREE.Group()
const ghosts = new Array(3).fill(0).map(() => new THREE.Group())

const ghostLights = {
    green: new THREE.PointLight("#00ff00", 2, 3),
    magenta: new THREE.PointLight("#ff00ff", 2, 3),
    red: new THREE.PointLight("#ff0000", 2, 3)
}

Object.values(ghostLights).forEach(light => {
    light.castShadow = true
})

ghosts[0].add(ghostLights.green)
ghosts[1].add(ghostLights.magenta)
ghosts[2].add(ghostLights.red)

/*
 * Boo! "Halloween2019" (https://skfb.ly/6RFQo) by Canary Games is licensed under Creative
 * Commons Attribution (http://creativecommons.org/licenses/by/4.0/)
 */
gltfLoader.load(
    "/assets/models/boo_halloween2019/scene.gltf",
    (gltfScene: any) => {
        gltfScene.scene.scale.set(2.4, 2.4, 2.4)
        gltfScene.scene.position.set(6, 1.2, -3)
        ghostLights.green.position.set(6, 1.2, -3)

        const ghost2GltfScene = gltfScene.scene.clone()
        ghost2GltfScene.position.set(-6, 1.2, -3)
        ghostLights.magenta.position.set(-6, 1.2, -3)

        const ghost3GltfScene = gltfScene.scene.clone()
        ghost3GltfScene.position.set(0, 1.2, 3)
        ghostLights.red.position.set(0, 1.2, 3)

        ghosts[0].add(gltfScene.scene)
        ghosts[1].add(ghost2GltfScene)
        ghosts[2].add(ghost3GltfScene)
    }
)

ghosts.forEach(ghost => {
    ghostsGroup.add(ghost)
})

scene.add(ghostsGroup)

/*
 * Tombstones
 */
graveyard.position.set(0, 0.6, -4)

scene.add(graveyard)

/*
 * Lights
 */
const lights = {
    ambient: new THREE.AmbientLight("#B9D5FF", 0.16),
    door: new THREE.PointLight("#ff7d46", 1, 7),
    moon: new THREE.DirectionalLight("#B9D5FF", 0.16)
}

lights.door.position.set(
    church.tower.door.position.x,
    church.tower.door.position.y + 0.5,
    church.tower.door.position.z + 1
)

Object.values(lights).forEach(light => {
    scene.add(light)
})

// Orbit controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Specify an algorithm for shadow mapping
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

ground.receiveShadow = true
church.tower.roof.castShadow = true
church.tower.roof.receiveShadow = true
church.tower.door.castShadow = true
church.tower.door.receiveShadow = true
church.tower.walls.castShadow = true
church.tower.walls.receiveShadow = true

lights.door.castShadow = true
lights.door.shadow.mapSize.width = 256
lights.door.shadow.mapSize.height = 256
lights.door.shadow.camera.far = 7

const clock = new THREE.Clock()

// Rendering
const render = () => {
    const elapsedTime = clock.getElapsedTime()
    const baseGhostPositioningAngle = elapsedTime * 0.24

    // Animate ghosts
    ghosts[0].position.x = Math.cos(baseGhostPositioningAngle) * 8
    ghosts[0].position.z = Math.sin(baseGhostPositioningAngle) * 4

    ghosts[1].position.x = Math.cos(baseGhostPositioningAngle) * -8
    ghosts[1].position.z = Math.sin(baseGhostPositioningAngle) * -4

    ghosts[2].position.x = Math.cos(baseGhostPositioningAngle) * 4
    ghosts[2].position.z = Math.sin(baseGhostPositioningAngle) * -8

    ghosts.forEach(ghost => {
        ghost.position.y = Math.sin(elapsedTime * 1.6)
    })

    ghosts.forEach(ghost => {
        ghost.lookAt(0, 0.5, 0)
    })

    controls.update()

    renderer.render(scene, camera)

    if (shouldResize(renderer)) {
        camera.aspect = canvas.clientWidth / canvas.clientHeight
        camera.updateProjectionMatrix()
    }

    requestAnimationFrame(render)
}

render()
