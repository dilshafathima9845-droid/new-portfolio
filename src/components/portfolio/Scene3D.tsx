import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import type * as THREE from "three";

// Palette mirrors the cream/mocha design tokens (three.js needs literal colors)
const MOCHA = "#7e6a55";
const SAND = "#d4c2a8";
const CREAM = "#efe9e1";

function Shapes() {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const dt = Math.min(delta, 0.05);
    const scroll = window.scrollY / window.innerHeight;
    g.rotation.y += dt * 0.08;
    g.rotation.x += (state.pointer.y * 0.3 - g.rotation.x) * (1 - Math.exp(-3 * dt));
    g.position.y = scroll * 2.5;
    g.rotation.z = scroll * 0.6;
  });
  return (
    <group ref={group} scale={0.55}>
      <Float speed={2} rotationIntensity={1.2} floatIntensity={2}>
        <mesh position={[-9, 4.5, -1]}>
          <sphereGeometry args={[0.9, 64, 64]} />
          <MeshDistortMaterial color={MOCHA} distort={0.45} speed={2} roughness={0.25} metalness={0.3} />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
        <mesh position={[9.5, -4.5, 0]}>
          <torusKnotGeometry args={[0.6, 0.22, 160, 24]} />
          <meshStandardMaterial color={SAND} roughness={0.2} metalness={0.6} />
        </mesh>
      </Float>
      <Float speed={2.5} rotationIntensity={1} floatIntensity={2.5}>
        <mesh position={[1, 5.5, -2]}>
          <torusGeometry args={[0.7, 0.18, 32, 100]} />
          <meshStandardMaterial color={CREAM} roughness={0.15} metalness={0.7} />
        </mesh>
      </Float>
      <Float speed={1.8} rotationIntensity={3} floatIntensity={1}>
        <mesh position={[-8.5, -5, 0.5]}>
          <icosahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial color={MOCHA} flatShading roughness={0.4} metalness={0.5} />
        </mesh>
      </Float>
    </group>
  );
}

export default function Scene3D() {
  return (
    <Canvas style={{ pointerEvents: "none" }} onCreated={({ gl }) => { gl.domElement.style.pointerEvents = "none"; }} dpr={[1, 1.5]} camera={{ position: [0, 0, 7], fov: 50 }} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 6, 5]} intensity={1.6} />
      <Environment resolution={128}>
        <Lightformer intensity={2} position={[0, 5, 0]} scale={[10, 10, 1]} />
        <Lightformer intensity={1} color={SAND} position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[20, 1, 1]} />
      </Environment>
      <Shapes />
    </Canvas>
  );
}
