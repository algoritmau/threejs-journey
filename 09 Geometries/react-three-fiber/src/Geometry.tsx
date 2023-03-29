import { useMemo, useRef } from 'react'

import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'

import { OrbitControls, PointMaterial } from '@react-three/drei'

import { getRandomPoint, handleFullscreen } from '../utils'

import './App.sass'

const Particles = ({ count = 1000 }) => {
  const colorOrange = new THREE.Color(0xffa500)
  const [positions, colors] = useMemo(() => {
    const positions = [...new Array(count * 3)].map(() => getRandomPoint())
    const colors = [...new Array(count)].flatMap(() => colorOrange.toArray())

    return [new Float32Array(positions), new Float32Array(colors)]
  }, [count])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          usage={THREE.DynamicDrawUsage}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          usage={THREE.DynamicDrawUsage}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        vertexColors
        size={8}
        sizeAttenuation={false}
        depthWrite={false}
      />
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

      <Particles />

      <OrbitControls enableDamping={true} />
    </Canvas>
  )
}

export default Geometry

// FIXME: Background color changes when fullscreen in Safari
// FIXME: OrbitControls doesn't work in fullscreen mode
