import * as THREE from 'three'

const textureLoader = new THREE.TextureLoader()

const triToneGradientTexture = textureLoader.load(
  '/textures/gradients/tri-tone.jpg'
)
const pentaToneGradientTexture = textureLoader.load(
  '/textures/gradients/penta-tone.jpg'
)

export const gradients = {
  none: undefined,
  TriTone: triToneGradientTexture,
  PentaTone: pentaToneGradientTexture
}
