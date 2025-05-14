'use client'

import { Suspense, useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, ContactShadows, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import Link from 'next/link'

// Define model paths for different project types
const MODEL_PATHS = {
  'React': '/models/code_block.glb',      // Use code_block.glb as temporary fallback
  'Node.js': '/models/code_block.glb',
  'MongoDB': '/models/code_block.glb',
  'Python': '/models/code_block.glb',
  'TensorFlow': '/models/code_block.glb',
  'React Native': '/models/code_block.glb',
  'Firebase': '/models/code_block.glb',
  'Default': '/models/code_block.glb'
}

// Model component that renders the 3D object
function Model({ tags, isHovered }: { tags: string[], isHovered: boolean }) {
  const [mounted, setMounted] = useState(false)
  const modelRef = useRef<THREE.Mesh>(null)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  // Only render the model on the client side
  if (!mounted) {
    return null
  }

  const primaryTag = tags[0]
  const modelPath = MODEL_PATHS[primaryTag] || MODEL_PATHS.Default
  
  // Add error boundary for model loading
  try {
    const { scene } = useGLTF(modelPath)
    
    useFrame((state) => {
      if (modelRef.current) {
        modelRef.current.rotation.y += isHovered ? 0.015 : 0.005
        if (isHovered) {
          modelRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1
        }
      }
    })
    
    return <primitive object={scene.clone()} ref={modelRef} />
  } catch (error) {
    console.error('Error loading model:', error)
    return (
      <mesh ref={modelRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={isHovered ? "#646cff" : "#535bf2"} />
      </mesh>
    )
  }
}

type ProjectCard3DProps = {
  id: number
  title: string
  description: string
  tags: string[]
  imageUrl: string
  demoUrl?: string
  githubUrl?: string
  modelPath?: string
}

export default function ProjectCard3D({ 
  id, 
  title, 
  description, 
  tags, 
  imageUrl, 
  demoUrl, 
  githubUrl,
  modelPath 
}: ProjectCard3DProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div 
      className="bg-background border border-primary/20 rounded-lg overflow-hidden shadow-lg flex flex-col h-full"
      whileHover={{ 
        y: -10, 
        scale: 1.02,
        boxShadow: '0 20px 30px -10px rgba(0, 0, 0, 0.2)' 
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* 3D Model Canvas */}
      <div className="h-64 w-full bg-primary/5 relative">
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.7} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <Suspense fallback={null}>
            <Model tags={tags} isHovered={isHovered} />
            <Environment preset="city" />
          </Suspense>
          <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={5} blur={2.5} far={4} />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
        
        {/* Live Demo Button Overlay */}
        {demoUrl && (
          <motion.div 
            className="absolute bottom-4 right-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <a 
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-accent text-white rounded-full font-medium text-sm flex items-center gap-2 hover:bg-accent/90 transition-colors"
            >
              <span>Live Demo</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </motion.div>
        )}
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold font-heading mb-2 text-foreground">{title}</h3>
        <p className="text-foreground/70 mb-4 flex-grow">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="text-xs px-2 py-1 rounded-full bg-primary/10 text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex space-x-3 mt-auto">
          {githubUrl && (
            <a 
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-foreground hover:text-accent transition-colors flex items-center gap-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Preload all models
useGLTF.preload(Object.values(MODEL_PATHS))