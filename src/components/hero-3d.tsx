import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Points>(null);
  const connectionsRef = useRef<THREE.Points>(null);

  // Create nodes with increased size and spread
  const nodeCount = 40;
  const nodePositions = new Float32Array(nodeCount * 3);
  const nodeSizes = new Float32Array(nodeCount);
  
  for (let i = 0; i < nodeCount; i++) {
    nodePositions[i * 3] = (Math.random() - 0.5) * 6;
    nodePositions[i * 3 + 1] = (Math.random() - 0.5) * 6;
    nodePositions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    nodeSizes[i] = Math.random() * 0.2 + 0.1;
  }

  // Create connections with increased visibility
  const connectionPositions: number[] = [];
  const connectionColors: number[] = [];
  
  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      const distance = Math.sqrt(
        Math.pow(nodePositions[i * 3] - nodePositions[j * 3], 2) +
        Math.pow(nodePositions[i * 3 + 1] - nodePositions[j * 3 + 1], 2) +
        Math.pow(nodePositions[i * 3 + 2] - nodePositions[j * 3 + 2], 2)
      );
      
      if (distance < 4) {
        connectionPositions.push(
          nodePositions[i * 3], nodePositions[i * 3 + 1], nodePositions[i * 3 + 2],
          nodePositions[j * 3], nodePositions[j * 3 + 1], nodePositions[j * 3 + 2]
        );
        
        connectionColors.push(
          0.07, 0.89, 1,
          0.69, 0.32, 1
        );
      }
    }
  }

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
    
    if (nodesRef.current && nodesRef.current.material instanceof THREE.ShaderMaterial) {
      nodesRef.current.material.uniforms.time.value = state.clock.elapsedTime;
    }
    
    if (connectionsRef.current && connectionsRef.current.material instanceof THREE.ShaderMaterial) {
      connectionsRef.current.material.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  const nodeShader = {
    vertexShader: `
      uniform float time;
      attribute float size;
      varying vec3 vPosition;
      
      void main() {
        vPosition = position;
        vec3 pos = position;
        pos.y += sin(time * 0.3 + position.x) * 0.2;
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = size * 150.0 / -mvPosition.z;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vPosition;
      
      void main() {
        vec2 xy = gl_PointCoord.xy - vec2(0.5);
        float r = length(xy);
        if (r > 0.5) discard;
        
        vec3 color = mix(
          vec3(0.07, 0.89, 1.0),
          vec3(0.69, 0.32, 1.0),
          vPosition.y * 0.5 + 0.5
        );
        
        float alpha = 1.0 - smoothstep(0.3, 0.5, r);
        gl_FragColor = vec4(color, alpha);
      }
    `
  };

  const connectionShader = {
    vertexShader: `
      uniform float time;
      varying vec3 vColor;
      varying float vProgress;
      
      void main() {
        vColor = color;
        vec3 pos = position;
        pos.y += sin(time * 0.3 + position.x) * 0.2;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        vProgress = sin(time * 0.5 + position.x) * 0.5 + 0.5;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying float vProgress;
      
      void main() {
        float alpha = 0.5 + vProgress * 0.5;
        gl_FragColor = vec4(vColor, alpha);
      }
    `
  };

  return (
    <group ref={groupRef}>
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={nodeCount}
            array={nodePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={nodeCount}
            array={nodeSizes}
            itemSize={1}
          />
        </bufferGeometry>
        <shaderMaterial
          transparent
          depthWrite={false}
          vertexShader={nodeShader.vertexShader}
          fragmentShader={nodeShader.fragmentShader}
          uniforms={{ time: { value: 0 } }}
        />
      </points>
      
      <lineSegments ref={connectionsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={connectionPositions.length / 3}
            array={new Float32Array(connectionPositions)}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={connectionColors.length / 3}
            array={new Float32Array(connectionColors)}
            itemSize={3}
          />
        </bufferGeometry>
        <shaderMaterial
          transparent
          depthWrite={false}
          vertexColors
          vertexShader={connectionShader.vertexShader}
          fragmentShader={connectionShader.fragmentShader}
          uniforms={{ time: { value: 0 } }}
        />
      </lineSegments>
    </group>
  );
}

export function Hero3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 40 }}
        gl={{ antialias: true }}
      >
        <Environment preset="city" />
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <NeuralNetwork />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}