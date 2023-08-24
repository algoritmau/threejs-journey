import * as THREE from "three"

import textures from "../textures"

class Window {
    #geometries = {
        circle: new THREE.CircleGeometry(0.5, 32),
        square: new THREE.BoxGeometry(1, 1.5, 0.1)
    }

    #material = new THREE.MeshStandardMaterial({
        aoMap: textures.woodWindow.ambientOcclusion,
        map: textures.woodWindow.map,
        metalnessMap: textures.woodWindow.metalness,
        normalMap: textures.woodWindow.normal,
        roughnessMap: textures.woodWindow.roughness,
        metalness: 0.1,
        roughness: 0.1
    })

    shape: THREE.Mesh

    constructor(type: "circle" | "square") {
        if (type === "circle") {
            this.shape = new THREE.Mesh(this.#geometries.circle, this.#material)
        } else {
            this.shape = new THREE.Mesh(this.#geometries.square, this.#material)
        }
    }
}

export default Window
