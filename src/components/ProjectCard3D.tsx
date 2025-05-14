'use client'

import { Suspense, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, ContactShadows, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { Github, ExternalLink } from 'lucide-react'

// Model component that renders the 3D object
function Model({ isHovered }: { tags: string[], isHovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += isHovered ? 0.015 : 0.005
      if (isHovered) {
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05
      } else {
        meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, 0, 0.1)
      }
    }
  })

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      <meshStandardMaterial 
        color={isHovered ? '#00ffae' : '#00b37f'}
        roughness={0.4}
        metalness={0.6}
        emissive={isHovered ? '#00ffae' : '#000000'}
        emissiveIntensity={isHovered ? 0.3 : 0}
      />
    </mesh>
  )
}

type ProjectCard3DProps = {
  // id: number
  title: string
  description: string
  tags: string[]
  imageUrl?: string
  demoUrl?: string
  githubUrl?: string
  modelPath?: string
}

export default function ProjectCard3D({ 
  title, 
  description, 
  tags, 
  demoUrl, 
  githubUrl,
  // modelPath,
}: ProjectCard3DProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div 
      className={`group bg-[#27272a] border border-accent rounded-lg overflow-hidden flex flex-col h-full transition-all duration-300 font-mono shadow-neon`}
      whileHover={{ 
        y: -10, 
        scale: 1.03,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* 3D Model Canvas */}
      <div className="h-60 w-full bg-[#1c1c1e] relative cursor-grab active:cursor-grabbing">
        <Canvas shadows camera={{ position: [0, 0.5, 4], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[8, 8, 8]} angle={0.2} penumbra={1} intensity={0.8} castShadow />
          <directionalLight position={[-5, 5, 5]} intensity={0.3} castShadow />
          <Suspense fallback={null}>
            <Model tags={tags} isHovered={isHovered} />
            <Environment preset="night" />
          </Suspense>
          <ContactShadows position={[0, -0.7, 0]} opacity={0.6} scale={5} blur={3} far={2} color="#00ffae" />
          <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 2.5} />
        </Canvas>
        
        {/* Live Demo Button Overlay */}
        {demoUrl && (
          <motion.div 
            className="absolute bottom-4 right-4 z-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
          >
            <a 
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-[#18181b] rounded-md font-semibold text-sm hover:bg-accent/90 transition-colors shadow-md"
            >
              <ExternalLink size={16} />
              <span>Live Demo</span>
            </a>
          </motion.div>
        )}
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold mb-3 text-gray-100 group-hover:text-accent transition-colors">{title}</h3>
        <p className="text-gray-400 text-sm mb-4 flex-grow">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="px-3 py-1 text-xs bg-accent/10 text-accent rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex gap-4 mt-auto">
          {githubUrl && (
            <a 
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-accent/50 text-gray-300 rounded-md hover:border-accent hover:text-accent transition-colors font-semibold"
            >
              <Github size={16} /> GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}