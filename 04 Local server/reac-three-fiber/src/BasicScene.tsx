import { useRef } from 'react'

import { Canvas, useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

import './App.sass'

const camSizes = {
  height: 600,
  width: 800
}
const camFrustumAspectRatio = camSizes.width / camSizes.height
const camFrustumVerticalFOV = 64
const camFrustumNearPlane = 0.1
const camFrustumFarPlane = 1000

function Cube() {
  const cubeRef = useRef<Mesh>(null!)

  useFrame(({ clock }) => {
    // cubeRef.current.rotation.x += 0.01
    // cubeRef.current.rotation.y += 0.01
    // cubeRef.current.rotation.x = clock.getElapsedTime()
    // cubeRef.current.rotation.y = clock.getElapsedTime()
    cubeRef.current.rotation.x = Math.sin(clock.getElapsedTime())
    cubeRef.current.rotation.y = Math.tan(clock.getElapsedTime())
  })

  return (
    <mesh ref={cubeRef}>
      <boxGeometry />
      <meshPhongMaterial color={0x66ff22} />
    </mesh>
  )
}

function BasicScene() {
  return (
    <Canvas
      style={{ width: camSizes.width, height: camSizes.height }}
      gl={{ alpha: false }}
      camera={{
        aspect: camFrustumAspectRatio,
        fov: camFrustumVerticalFOV,
        near: camFrustumNearPlane,
        far: camFrustumFarPlane,
        position: [0, 0, 3]
      }}
    >
      <ambientLight intensity={0.1} />
      <directionalLight color="pink" position={[-1, 2, 4]} />
      <Cube />
    </Canvas>
  )
}

export default BasicScene
