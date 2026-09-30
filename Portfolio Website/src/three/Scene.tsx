import { Canvas } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import { HeroObject } from './HeroObject';
export default function Scene({ progress, onFailure, active }: { active: boolean; progress: React.RefObject<number>; onFailure: () => void }) {
  return <Canvas frameloop={active ? 'always' : 'never'} dpr={[1, 1.5]} camera={{ position: [0, 0, 4.7], fov: 38 }} gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }} onCreated={({ gl }) => { gl.domElement.addEventListener('webglcontextlost', onFailure, { once: true }); }}>
    <ambientLight intensity={0.8} /><directionalLight position={[3, 5, 5]} intensity={3} /><directionalLight position={[-4, 1, 3]} color="#d7bc94" intensity={2} />
    <Environment resolution={128}><Lightformer intensity={3} position={[0, 4, 2]} scale={[8, 3, 1]} /><Lightformer intensity={2} position={[-4, 0, 1]} rotation={[0, Math.PI / 2, 0]} scale={[3, 8, 1]} /><Lightformer intensity={2} position={[0, -3, 2]} scale={[6, 1, 1]} /></Environment>
    <HeroObject progress={progress} />
  </Canvas>;
}
