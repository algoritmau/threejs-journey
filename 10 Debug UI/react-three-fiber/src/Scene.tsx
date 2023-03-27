import { useEffect, useRef } from 'react'

import { Mesh } from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import gsap from 'gsap'

import * as dat from 'dat.gui'

import { handleFullscreen } from '../utils'

import './App.sass'

export default function Scene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const meshRef = useRef<Mesh>(null)

  const debugObject = {
    color: 0xff0000,
    visible: true,
    wireframe: false,
    position: {
      x: 0,
      y: 0,
      z: 0
    },
    spin: () => {
      gsap.to(meshRef.current?.rotation as any, {
        duration: 1,
        y: meshRef.current?.rotation.y! + Math.PI * 2
      })
    }
  }

  useEffect(() => {
    const gui = new dat.GUI({ width: 360 })

    gui
      .add(debugObject.position as any, 'x')
      .name('Position X')
      .min(-3)
      .max(3)
      .step(0.01)
      .onChange(() => {
        meshRef.current?.position.setX(debugObject.position.x)
      })
    gui
      .add(debugObject.position as any, 'y')
      .name('Position Y')
      .min(-3)
      .max(3)
      .step(0.01)
      .onChange(() => {
        meshRef.current?.position.setY(debugObject.position.y)
      })
    gui
      .add(debugObject.position as any, 'z')
      .name('Position Z')
      .min(-3)
      .max(3)
      .step(0.01)
      .onChange(() => {
        meshRef.current?.position.setZ(debugObject.position.z)
      })

    // Color picker
    gui
      .addColor(debugObject, 'color')
      .name('Color')
      .onChange(() => {
        // @ts-ignore
        meshRef.current?.material.color.set(debugObject.color)
      })

    // Spin button
    gui.add(debugObject, 'spin').name('Spin')

    // Toggle visibility
    gui
      .add(debugObject, 'visible')
      .name('Visible')
      .onChange(() => {
        meshRef.current!.visible = debugObject.visible
      })

    // Toggle wireframe
    gui
      .add(debugObject, 'wireframe')
      .name('Wireframe')
      .onChange(() => {
        // @ts-ignore
        meshRef.current!.material.wireframe = debugObject.wireframe
      })

    // Open/Close controls with / key
    document.addEventListener('keydown', (e) => {
      if (e.key === '/') {
        gui.closed = !gui.closed
      }
    })

    // Hide/Show GUI with h/s keys
    document.addEventListener('keydown', (e) => {
      if (e.key === 'h') {
        gui.hide()
      } else if (e.key === 's') {
        gui.show()
      }
    })

    // Cleanup: Return a function to destroy the GUI
    return () => {
      gui.destroy()
    }
  }, [])

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
      dpr={Math.min(window.devicePixelRatio, 2)}
      onDoubleClick={() =>
        handleFullscreen(canvasRef.current as HTMLCanvasElement)
      }
    >
      <ambientLight intensity={0.4} />
      <directionalLight color={0xffffff} position={[-1, 2, 4]} />

      <mesh ref={meshRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={debugObject.color} />
      </mesh>

      <OrbitControls enableDamping={true} />
    </Canvas>
  )
}
