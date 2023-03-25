import * as THREE from 'three'

import { getRandomPoint } from './getRandomPoint'

export const getRandomVector3 = () =>
  new THREE.Vector3(getRandomPoint(), getRandomPoint(), getRandomPoint())
