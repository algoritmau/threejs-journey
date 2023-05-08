import { Suspense, useLayoutEffect, useMemo, useRef } from 'react'

import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { Canvas, extend, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import type { Vector3 } from '@react-three/fiber'

import { handleFullscreen } from '../utils'

import './App.sass'

extend({ TextGeometry })

const Donut = ({
  material,
  geometry
}: {
  material: JSX.Element
  geometry: JSX.Element
}) => {
  const position: Vector3 = useMemo(
    () => [
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10
    ],
    []
  )

  const rotation: Vector3 = useMemo(
    () => [Math.random() * Math.PI, Math.random() * Math.PI, 0],
    []
  )

  const scale: Vector3 = useMemo(() => {
    const randomScale = Math.random() * 0.4

    return [randomScale, randomScale, randomScale]
  }, [])

  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      {material}
      {geometry}
    </mesh>
  )
}

export default function Scene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const materialRef = useRef<THREE.Material | null>(null)

  const donutGeometry = <torusGeometry args={[0.3, 0.2, 20, 45]} />
  const baseMaterial = <meshNormalMaterial />

  const Text: React.FC = () => {
    const font = useLoader(
      FontLoader,
      '/assets/fonts/nb_architekt_neue_normal.json'
    )
    const fontConfig = useMemo(
      () => ({
        font,
        size: 0.64,
        height: 0.8,
        curveSegments: 4,
        bevelEnabled: true,
        bevelThickness: 0.04,
        bevelSize: 0.04,
        bevelOffset: 0,
        bevelSegments: 2
      }),
      [font]
    )

    const text = 'Mauricio\nPaternina'
    const textRef = useRef<THREE.Mesh | null>(null)

    useLayoutEffect(() => {
      if (textRef.current) {
        textRef.current.geometry.center()
      }
    }, [text])

    return (
      <mesh ref={textRef} position={[0, 0, 0]}>
        {baseMaterial}
        <textGeometry args={[text, fontConfig]} />
      </mesh>
    )
  }

  return (
    <Canvas
      ref={canvasRef}
      camera={{
        fov: 96,
        aspect: 2,
        near: 0.08,
        far: 800,
        position: [0, 1, 4]
      }}
      dpr={Math.min(window.devicePixelRatio, 2)}
      onDoubleClick={() =>
        handleFullscreen(canvasRef.current as HTMLCanvasElement)
      }
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight color={0xffffff} position={[8, 8, 8]} />

        <Text />

        {Array.from({ length: 256 }, (_, i) => (
          <Donut key={i} material={baseMaterial} geometry={donutGeometry} />
        ))}

        <OrbitControls enableDamping={true} />
      </Suspense>
    </Canvas>
  )
}
