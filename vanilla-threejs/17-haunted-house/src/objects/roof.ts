import * as THREE from "three"

import textures from "../textures"

class Roof {
    shape: THREE.Group

    // Triangle between planks
    #gablesVertices = [
        0,
        2,
        0, // top
        0.2,
        0,
        0, // right
        -0.2,
        0,
        0 // left
    ]

    #gablesFaces = [
        // 0, 1, 2 // only one face
        2, 1, 0
    ]

    #geometries = {
        deck: new THREE.BoxGeometry(7, 0.1, 9),
        gable: new THREE.PolyhedronGeometry(
            this.#gablesVertices,
            this.#gablesFaces,
            4.4,
            0
        )
    }

    #materials = {
        deck: new THREE.MeshStandardMaterial({
            color: 0x8b4513,
            aoMap: textures.roof.ambientOcclusion,
            map: textures.roof.map,
            normalMap: textures.roof.normal,
            roughnessMap: textures.roof.roughness
        }),
        gable: new THREE.MeshPhysicalMaterial({
            aoMap: textures.walls.wood.ambientOcclusion,
            color: "#a0a0a0",
            displacementScale: 1,
            map: textures.walls.wood.map,
            normalMap: textures.walls.wood.normal,
            roughnessMap: textures.walls.wood.roughness,
            side: THREE.DoubleSide
        })
    }

    #leftDeck: THREE.Mesh
    #rightDeck: THREE.Mesh
    #decks: THREE.Group

    #backGable: THREE.Mesh
    #frontGable: THREE.Mesh
    #gables: THREE.Group

    constructor() {
        this.#leftDeck = new THREE.Mesh(
            this.#geometries.deck,
            this.#materials.deck
        )

        this.#rightDeck = new THREE.Mesh(
            this.#geometries.deck,
            this.#materials.deck
        )

        this.#backGable = new THREE.Mesh(
            this.#geometries.gable,
            this.#materials.gable
        )

        this.#frontGable = new THREE.Mesh(
            this.#geometries.gable,
            this.#materials.gable
        )

        this.#decks = new THREE.Group()
        this.#gables = new THREE.Group()

        this.#decks.add(this.#leftDeck, this.#rightDeck)
        this.#gables.add(this.#backGable, this.#frontGable)

        this.shape = new THREE.Group()
        this.shape.add(this.#decks, this.#gables)

        this.#leftDeck.rotateZ(Math.PI / 4)
        this.#rightDeck.rotateZ(-Math.PI / 4)

        this.#backGable.position.y = -2
        this.#backGable.position.z = -4.01
        this.#frontGable.position.y = -2
        this.#frontGable.position.z = 4.01
        this.#leftDeck.position.x = -2.4
        this.#rightDeck.position.x = 2.4

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
    }
}

export default Roof
