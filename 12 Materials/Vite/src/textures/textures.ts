import * as THREE from 'three'

// import { ITextureMap } from '../../types'

const textureLoader = new THREE.TextureLoader()

// const artDecoPatternTexture: ITextureMap = {
//   aoMap: textureLoader.load('/textures/artDecoPattern/ambientOcclusion.jpg'),
//   displacementMap: textureLoader.load(
//     '/textures/artDecoPattern/displacement.png'
//   ),
//   map: textureLoader.load('/textures/artDecoPattern/baseColor.jpg'),
//   metalnessMap: textureLoader.load('/textures/artDecoPattern/metalness.jpg'),
//   normalMap: textureLoader.load('/textures/artDecoPattern/normal.jpg'),
//   roughnessMap: textureLoader.load('/textures/artDecoPattern/roughness.jpg')
// }
//
// const doorTexture: ITextureMap = {
//   alphaMap: textureLoader.load('/textures/door/alpha.jpg'),
//   aoMap: textureLoader.load('/textures/door/ambientOcclusion.jpg'),
//   displacementMap: textureLoader.load('/textures/door/height.jpg'),
//   map: textureLoader.load('/textures/door/color.jpg'),
//   metalnessMap: textureLoader.load('/textures/door/metalness.jpg'),
//   normalMap: textureLoader.load('/textures/door/normal.jpg'),
//   roughnessMap: textureLoader.load('/textures/door/roughness.jpg')
// }

export const textures = {
  none: undefined,
  artDecoPattern: textureLoader.load('/textures/artDecoPattern/baseColor.jpg'),
  door: textureLoader.load('/textures/door/color.jpg')
}
