import { useRef, useState } from 'react'

import { Canvas, useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

import { animated, config, useSpring } from '@react-spring/three'

import './App.sass'

const cameraConfig = {
  sizes: {
    height: 600,
    width: 800
  },
  frustum: {
    // aspectRatio: this.sizes.height / this.sizes.width,
    // TODO: Debug TypeScript error from above
    aspectRatio: 600 / 800,
    verticalFov: 64,
    nearPlane: 0.1,
    farPlane: 960
  }
}

function AnimatedCube() {
  const cubeRef = useRef<Mesh>(null!)
  const [active, setActive] = useState(false)
  // Animated values
  // const springs = useSpring({ scale: active ? 1.6 : 1})
  const { scale } = useSpring({
    scale: active ? 1.6 : 1,
    config: config.wobbly
  })

  useFrame(({ clock }) => {
    cubeRef.current.rotation.x = Math.sin(clock.getElapsedTime())
    cubeRef.current.rotation.y = Math.tan(clock.getElapsedTime())
  })

  return (
    <animated.mesh
      ref={cubeRef}
      scale={scale}
      onClick={() => setActive(!active)}
    >
      <boxGeometry />
      <meshPhongMaterial color={0x66ff22} />
    </animated.mesh>
  )
}

function BasicScene() {
  return (
    <Canvas
      style={{
        width: cameraConfig.sizes.width,
        height: cameraConfig.sizes.height
      }}
      gl={{ alpha: false }}
      camera={{
        aspect: cameraConfig.frustum.aspectRatio,
        fov: cameraConfig.frustum.verticalFov,
        near: cameraConfig.frustum.nearPlane,
        far: cameraConfig.frustum.farPlane,
        position: [2, 1, 3]
      }}
    >
      <ambientLight intensity={0.1} />
      <directionalLight color="pink" position={[-1, 2, 4]} />
      <axesHelper args={[8]} />
      <AnimatedCube />
    </Canvas>
  )
}

export default BasicScene
