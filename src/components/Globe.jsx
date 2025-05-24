import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, Text } from '@react-three/drei';
import * as THREE from 'three';

const Globe = () => {
  return (
    <Canvas className="!absolute inset-0" camera={{ position: [0, 0, 12], fov: 45 }}>
      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 10, 5]} intensity={0.3} />
      <pointLight position={[-10, -10, -5]} intensity={0.2} color="#58a6ff" />
      <pointLight position={[10, -10, 5]} intensity={0.2} color="#00ffcc" />
      
      <GlobeObject />
      <TextRing />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        rotateSpeed={0.1} 
        autoRotate 
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
};

const GlobeObject = () => {
  const globeRef = useRef();
  const texture = new THREE.TextureLoader().load(
    'https://images.pexels.com/photos/4407688/pexels-photo-4407688.jpeg?auto=compress&cs=tinysrgb&w=1600'
  );

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <Sphere ref={globeRef} args={[3, 64, 64]}>
      <meshStandardMaterial 
        map={texture}
        emissive="#58a6ff"
        emissiveIntensity={0.1}
        metalness={0.8}
        roughness={0.7}
      />
    </Sphere>
  );
};

const TextRing = () => {
  const textRingRef = useRef();
  const { size } = useThree();
  const radius = size.width < 768 ? 3.8 : 4.5;
  
  useFrame(() => {
    if (textRingRef.current) {
      textRingRef.current.rotation.z -= 0.001;
    }
  });

  const letters = "TECHNICAL HUB".split('');
  const angleStep = (Math.PI * 2) / letters.length;

  return (
    <group ref={textRingRef}>
      {letters.map((letter, i) => {
        const angle = i * angleStep;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        
        return (
          <group key={i} position={[x, y, 0]} rotation={[0, 0, angle + Math.PI / 2]}>
            <Text
              color="#ffffff"
              fontSize={0.3}
              anchorX="center"
              anchorY="middle"
            >
              {letter}
            </Text>
          </group>
        );
      })}
    </group>
  );
};

export default Globe;