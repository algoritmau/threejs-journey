import * as THREE from 'three'

const cubeTextureLoader = new THREE.CubeTextureLoader()

const downtownEnvMap = cubeTextureLoader.load([
  '/textures/envMaps/downtown/px.jpg',
  '/textures/envMaps/downtown/nx.jpg',
  '/textures/envMaps/downtown/py.jpg',
  '/textures/envMaps/downtown/ny.jpg',
  '/textures/envMaps/downtown/pz.jpg',
  '/textures/envMaps/downtown/nz.jpg'
])

const farmEnvMap = cubeTextureLoader.load([
  '/textures/envMaps/farm/px.jpg',
  '/textures/envMaps/farm/nx.jpg',
  '/textures/envMaps/farm/py.jpg',
  '/textures/envMaps/farm/ny.jpg',
  '/textures/envMaps/farm/pz.jpg',
  '/textures/envMaps/farm/nz.jpg'
])

const neighborhoodEnvMap = cubeTextureLoader.load([
  '/textures/envMaps/neighborhood/px.jpg',
  '/textures/envMaps/neighborhood/nx.jpg',
  '/textures/envMaps/neighborhood/py.jpg',
  '/textures/envMaps/neighborhood/ny.jpg',
  '/textures/envMaps/neighborhood/pz.jpg',
  '/textures/envMaps/neighborhood/nz.jpg'
])

const plazaEnvMap = cubeTextureLoader.load([
  '/textures/envMaps/plaza/px.jpg',
  '/textures/envMaps/plaza/nx.jpg',
  '/textures/envMaps/plaza/py.jpg',
  '/textures/envMaps/plaza/ny.jpg',
  '/textures/envMaps/plaza/pz.jpg',
  '/textures/envMaps/plaza/nz.jpg'
])

const rotesRathausEnvMap = cubeTextureLoader.load([
  '/textures/envMaps/rotesRathaus/px.png',
  '/textures/envMaps/rotesRathaus/nx.png',
  '/textures/envMaps/rotesRathaus/py.png',
  '/textures/envMaps/rotesRathaus/ny.png',
  '/textures/envMaps/rotesRathaus/pz.png',
  '/textures/envMaps/rotesRathaus/nz.png'
])

export const envMaps = {
  none: undefined,
  downtown: downtownEnvMap,
  farm: farmEnvMap,
  neighborhood: neighborhoodEnvMap,
  plaza: plazaEnvMap,
  rotesRathaus: rotesRathausEnvMap
}
