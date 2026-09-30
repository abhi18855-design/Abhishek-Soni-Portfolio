import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MathUtils, Group } from 'three';
/** Procedural exploded optical assembly. R3F owns and disposes all geometry/materials. */
export function HeroObject({ progress }: { progress: React.RefObject<number> }) {
  const group = useRef<Group>(null);
  useFrame(({ pointer, clock }, delta) => {
    if (!group.current) return;
    const g = group.current;
    const t = clock.elapsedTime;
    g.rotation.x = MathUtils.damp(g.rotation.x, 0.24 + pointer.y * 0.18 + progress.current * 0.5, 3, delta);
    g.rotation.y = MathUtils.damp(g.rotation.y, -0.38 + pointer.x * 0.3 + progress.current * 0.8, 3, delta);
    g.rotation.z = MathUtils.damp(g.rotation.z, -0.22 + Math.sin(t * 0.15) * 0.04, 3, delta);
    g.position.y = MathUtils.damp(g.position.y, Math.sin(t * 0.45) * 0.055 + pointer.y * 0.04 - progress.current * 0.3, 3, delta);
    g.position.x = MathUtils.damp(g.position.x, pointer.x * 0.07 + progress.current * 0.22, 3, delta);
    g.scale.setScalar(MathUtils.damp(g.scale.x, 1 - progress.current * 0.22, 3, delta));
  });
  return <group ref={group}>
    {[-0.40, -0.22, -0.10, 0.02, 0.38].map((z, i) => <mesh key={z} position={[0, 0, z]}><torusGeometry args={[1.13 - i * 0.025, i === 4 ? 0.055 : 0.09, 16, 100]} /><meshStandardMaterial color={i === 1 ? '#ae3f25' : i === 4 ? '#bcb8af' : '#343533'} metalness={0.9} roughness={0.28} /></mesh>)}
    {Array.from({ length: 64 }, (_, i) => { const a = i / 64 * Math.PI * 2; return <mesh key={i} position={[Math.cos(a) * 1.14, Math.sin(a) * 1.14, -0.25]} rotation={[0, 0, a]}><boxGeometry args={[0.025, 0.033, 0.24]} /><meshStandardMaterial color="#7a7973" metalness={0.8} roughness={0.4} /></mesh>; })}
    {Array.from({ length: 9 }, (_, i) => <group key={i} rotation={[0, 0, i / 9 * Math.PI * 2]}><mesh position={[0.48, 0.22, 0.1 + i * 0.004]} rotation={[0, 0, -0.5]}><boxGeometry args={[0.77, 0.34, 0.025]} /><meshStandardMaterial color={i % 2 ? '#85867f' : '#5b5e58'} metalness={0.95} roughness={0.31} /></mesh></group>)}
    <mesh position={[0, 0, -0.05]}><circleGeometry args={[0.85, 80]} /><meshPhysicalMaterial color="#152322" metalness={0.7} roughness={0.12} clearcoat={1} /></mesh>
    <mesh position={[0, 0, 0.45]}><torusGeometry args={[0.9, 0.013, 8, 90]} /><meshStandardMaterial color="#b6b9b1" metalness={0.9} roughness={0.2} /></mesh>
    <mesh position={[0, 0, -0.42]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[1.13, 1.02, 0.18, 80, 1, true]} /><meshStandardMaterial color="#32332f" metalness={0.85} roughness={0.3} /></mesh>
  </group>;
}
