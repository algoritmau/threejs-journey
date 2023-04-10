import * as THREE from 'three'

const textureLoader = new THREE.TextureLoader()

export const matcaps = {
  none: undefined,
  cartoon: textureLoader.load('/textures/matcaps/cartoon.png'),
  magma: textureLoader.load('/textures/matcaps/magma.png'),
  metallic: textureLoader.load('/textures/matcaps/metallic.png'),
  neon: textureLoader.load('/textures/matcaps/neon.png'),
  plastic: textureLoader.load('/textures/matcaps/plastic.png'),
  simple: textureLoader.load('/textures/matcaps/simple.png'),
  soft: textureLoader.load('/textures/matcaps/soft.png'),
  sunny: textureLoader.load('/textures/matcaps/sunny.png')
}
