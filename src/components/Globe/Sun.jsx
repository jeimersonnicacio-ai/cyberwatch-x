import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Sun() {
  const sunRef = useRef();

  useFrame((_, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group position={[8.5, 4.5, -6]}>
      <mesh ref={sunRef}>
        <sphereGeometry args={[0.72, 48, 48]} />
        <meshBasicMaterial color="#ffd15c" toneMapped={false} />
      </mesh>

      <mesh scale={1.45}>
        <sphereGeometry args={[0.72, 32, 32]} />
        <meshBasicMaterial
          color="#ff9d00"
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      </mesh>

      <pointLight intensity={95} distance={28} color="#fff1c2" />
    </group>
  );
}
