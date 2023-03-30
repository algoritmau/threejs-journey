import { Suspense, useRef } from 'react'

import * as THREE from 'three'
import { TextureLoader } from 'three'
import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import { handleFullscreen } from '../utils'

import './App.sass'

export default function Scene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const [
    alphaTexture,
    aoTexture,
    colorTexture,
    heightTexture,
    metalnessTexture,
    normalTexture,
    roughnessTexture,
    minecraftTexture,
    checkerboardTextureLarge,
    checkerboardTextureSmall
  ] = useLoader(TextureLoader, [
    '/assets/textures/door/alpha.jpg',
    '/assets/textures/door/ambientOcclusion.jpg',
    '/assets/textures/door/color.jpg',
    '/assets/textures/door/height.jpg',
    '/assets/textures/door/metalness.jpg',
    '/assets/textures/door/normal.jpg',
    '/assets/textures/door/roughness.jpg',
    '/assets/textures/minecraft.png',
    '/assets/textures/checkerboard-1024x1024.png',
    '/assets/textures/checkerboard-8x8.png'
  ])

  minecraftTexture.magFilter = THREE.NearestFilter
  checkerboardTextureSmall.magFilter = THREE.NearestFilter
  checkerboardTextureLarge.minFilter = THREE.NearestFilter

  // Disable mipmap generation since it uses nearest filter for minFilter
  checkerboardTextureLarge.generateMipmaps = false

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

        <mesh position={[0, 2, 0]} name="door-cube">
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            alphaMap={alphaTexture}
            aoMap={aoTexture}
            map={colorTexture}
            displacementMap={heightTexture}
            metalnessMap={metalnessTexture}
            normalMap={normalTexture}
            roughnessMap={roughnessTexture}
          />
        </mesh>

        <mesh position={[2, 2, 0]} name="minecraft-cube">
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial map={minecraftTexture} />
        </mesh>

        <mesh position={[0, 0, 0]} name="large-checkerboard-cube">
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial map={checkerboardTextureLarge} />
        </mesh>

        <mesh position={[2, 0, 0]} name="small-checkerboard-cube">
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial map={checkerboardTextureSmall} />
        </mesh>

        <OrbitControls enableDamping={true} />
      </Suspense>
    </Canvas>
  )
}
