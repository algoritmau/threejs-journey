import * as THREE from "three"

const textureLoader = new THREE.TextureLoader()
const textures = {
    ground: {
        ambientOcclusion: textureLoader.load(
            "/assets/textures/ground/ambient-occlusion.jpg"
        ),
        displacement: textureLoader.load(
            "/assets/textures/ground/displacement.jpg"
        ),
        map: textureLoader.load("/assets/textures/ground/color.jpg"),
        normal: textureLoader.load("/assets/textures/ground/normal.jpg"),
        roughness: textureLoader.load("/assets/textures/ground/roughness.jpg")
    },

    moss: {
        ambientOcclusion: textureLoader.load(
            "/assets/textures/moss/ambientOcclusion.jpg"
        ),
        displacement: textureLoader.load(
            "/assets/textures/moss/displacement.jpg"
        ),
        map: textureLoader.load("/assets/textures/moss/map.jpg"),
        normal: textureLoader.load("/assets/textures/moss/normal.jpg"),
        roughness: textureLoader.load("/assets/textures/moss/roughness.jpg")
    },

    roof: {
        ambientOcclusion: textureLoader.load(
            "/assets/textures/roof/ambient-occlusion.jpg"
        ),
        displacement: textureLoader.load(
            "/assets/textures/roof/displacement.png"
        ),
        map: textureLoader.load("/assets/textures/roof/map.jpg"),
        normal: textureLoader.load("/assets/textures/roof/normal.jpg"),
        roughness: textureLoader.load("/assets/textures/roof/roughness.jpg")
    },

    woodWindow: {
        ambientOcclusion: textureLoader.load(
            "/assets/textures/wood-window/ambient-occlusion.jpg"
        ),
        displacement: textureLoader.load(
            "/assets/textures/wood-window/displacement.png"
        ),
        map: textureLoader.load("/assets/textures/wood-window/map.jpg"),
        metalness: textureLoader.load(
            "/assets/textures/wood-window/metalness.jpg"
        ),
        normal: textureLoader.load("/assets/textures/wood-window/normal.jpg"),
        opacity: textureLoader.load("/assets/textures/wood-window/opacity.jpg"),
        roughness: textureLoader.load(
            "/assets/textures/wood-window/roughness.jpg"
        )
    },

    walls: {
        stone: {
            ambientOcclusion: textureLoader.load(
                "/assets/textures/walls/stone/ambient-occlusion.jpg"
            ),
            displacement: textureLoader.load(
                "/assets/textures/walls/stone/displacement.png"
            ),
            map: textureLoader.load("/assets/textures/walls/stone/color.jpg"),
            normal: textureLoader.load(
                "/assets/textures/walls/stone/normal.jpg"
            ),
            roughness: textureLoader.load(
                "/assets/textures/walls/stone/roughness.jpg"
            )
        },

        wood: {
            ambientOcclusion: textureLoader.load(
                "/assets/textures/walls/wood/ambient-occlusion.jpg"
            ),
            displacement: textureLoader.load(
                "/assets/textures/walls/wood/displacement.jpg"
            ),
            map: textureLoader.load("/assets/textures/walls/wood/color.jpg"),
            metalness: textureLoader.load(
                "/assets/textures/walls/wood/metalness.jpg"
            ),
            normal: textureLoader.load(
                "/assets/textures/walls/wood/normal.jpg"
            ),
            roughness: textureLoader.load(
                "/assets/textures/walls/wood/roughness.jpg"
            )
        }
    },

    woodDoor: {
        ambientOcclusion: textureLoader.load(
            "/assets/textures/wood-door/ambient-occlusion.jpg"
        ),
        displacement: textureLoader.load(
            "/assets/textures/wood-door/displacement.png"
        ),
        map: textureLoader.load("/assets/textures/wood-door/color.jpg"),
        metalness: textureLoader.load(
            "/assets/textures/wood-door/metalness.jpg"
        ),
        normal: textureLoader.load("/assets/textures/wood-door/normal.jpg"),
        roughness: textureLoader.load(
            "/assets/textures/wood-door/roughness.jpg"
        )
    }
}

// Repeat each ground texture 8 times
Object.values(textures.ground).forEach(texture => {
    texture.repeat.set(24, 24)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
})

export default textures
