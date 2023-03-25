import { useMemo, useRef } from 'react'

import { Canvas } from '@react-three/fiber'
import { BufferAttribute } from 'three'

import { OrbitControls } from '@react-three/drei'

import { getRandomPoint, handleFullscreen } from '../utils'

import './App.sass'

const BufferPoints = ({ count = 1000 }) => {
  const positions = useMemo(() => {
    const points = new Array(count).fill(0).map((_) => getRandomPoint())

    return new BufferAttribute(new Float32Array(points), 3, false)
  }, [count])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" {...positions} />
      </bufferGeometry>
      <pointsMaterial size={0.1} color={0xe380fa} sizeAttenuation={true} />
    </points>
  )
}

function Geometry() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  return (
    <Canvas
      ref={canvasRef}
      camera={{
        fov: 80,
        aspect: 2,
        near: 0.08,
        far: 800,
        position: [2, 1, 2]
      }}
      color="black"
      dpr={Math.min(window.devicePixelRatio, 2)}
      onDoubleClick={() =>
        handleFullscreen(canvasRef.current as HTMLCanvasElement)
      }
    >
      <ambientLight intensity={0.1} />
      <directionalLight color="royalblue" position={[-1, 2, 4]} />

      <BufferPoints />

      <OrbitControls enableDamping={true} />
    </Canvas>
  )
}

export default Geometry

// FIXME: Computed radius is NaN
// FIXME: Background color changes when fullscreen in Safari
