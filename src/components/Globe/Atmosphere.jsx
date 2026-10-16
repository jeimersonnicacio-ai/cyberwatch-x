import * as THREE from "three";

export default function Atmosphere() {
  return (
    <mesh scale={1.03}>
      <sphereGeometry args={[2.08, 64, 64]} />
      <meshBasicMaterial
        color="#00d9ff"
        transparent
        opacity={0.08}
        side={THREE.BackSide}
      />
    </mesh>
  );
}