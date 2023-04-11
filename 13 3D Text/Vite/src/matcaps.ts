import * as THREE from 'three'

const textureLoader = new THREE.TextureLoader()

  // Matcaps obtained from https://github.com/nidorx/matcaps
const matcaps = {
  antique: textureLoader.load('/matcaps/antique.png'),
  bitone: textureLoader.load('/matcaps/bitone.png'),
  bright: textureLoader.load('/matcaps/bright.png'),
  cool: textureLoader.load('/matcaps/cool.png'),
  crystal: textureLoader.load('/matcaps/crystal.png'),
  glass: textureLoader.load('/matcaps/glass.png'),
  gold: textureLoader.load('/matcaps/gold.png'),
  green: textureLoader.load('/matcaps/green.png'),
  metallic: textureLoader.load('/matcaps/metallic.png'),
  polished: textureLoader.load('/matcaps/polished.png')
}

export default matcaps