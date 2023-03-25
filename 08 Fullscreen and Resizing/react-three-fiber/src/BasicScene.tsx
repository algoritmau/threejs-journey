import { useRef, useState } from 'react'

import { Canvas, useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

import { animated, config, useSpring } from '@react-spring/three'

import { handleFullscreen } from '../utils/handleFullscreen'

import './App.sass'

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
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  return (
    <Canvas
      gl={{ alpha: false }}
      camera={{
        fov: 80,
        aspect: 2,
        near: 0.08,
        far: 1024,
        position: [2, 1, 2]
      }}
      ref={canvasRef}
      dpr={Math.min(window.devicePixelRatio, 2)}
      onDoubleClick={() =>
        handleFullscreen(canvasRef.current as HTMLCanvasElement)
      }
    >
      <ambientLight intensity={0.1} />
      <directionalLight color="pink" position={[-1, 2, 4]} />
      <axesHelper args={[8]} />
      <AnimatedCube />
    </Canvas>
  )
}

export default BasicScene
