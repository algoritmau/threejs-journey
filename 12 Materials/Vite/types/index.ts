export interface GUIConfigurables {
  color: THREE.Color
  emissive?: THREE.Color
  emissiveIntensity?: number
  envMap: THREE.CubeTexture | string
  flatShading: boolean
  map?: THREE.Texture
  matcap: THREE.Texture | string
  material: THREE.Material
  opacity: number
  side: THREE.Side
  transparent: boolean
  visible: boolean
  wireframe: boolean
  specular?: THREE.Color
  shininess?: number
  clearcoat?: number
  clearcoatRoughness?: number
  metalness?: number
  roughness?: number
}

export interface ITexture {
  alphaMap?: THREE.Texture
  aoMap: THREE.Texture
  colorMap: THREE.Texture
  displacementMap: THREE.Texture
  metalnessMap: THREE.Texture
  normalMap: THREE.Texture
  roughnessMap: THREE.Texture
  minFilter?: THREE.TextureFilter
  magFilter?: THREE.TextureFilter
  generateMipmaps?: boolean
}

export interface ITextureMap {
  alphaMap?: THREE.Texture
  aoMap: THREE.Texture
  displacementMap: THREE.Texture
  map: THREE.Texture
  metalnessMap: THREE.Texture
  normalMap: THREE.Texture
  roughnessMap: THREE.Texture
}
